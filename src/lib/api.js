const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message ?? `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function normalizePodcastForUi(podcast) {
  return {
    id: podcast.id,
    title: podcast.title,
    description: podcast.description,
    image:
      podcast.effectiveCoverImageUrl ?? podcast.coverImageUrl ?? podcast.fallbackThumbnailUrl ?? '',
    date: podcast.publishedAt,
    speaker: podcast.speakerName,
    slug: String(podcast.id),
  };
}

function normalizeArticleForUi(article) {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.description,
    date: article.publishedAt ?? article.createdAt,
    category: article.authorName,
    slug: String(article.id),
  };
}

async function fetchPodcasts() {
  const podcasts = await apiRequest('/podcasts');
  return podcasts.map(normalizePodcastForUi);
}

async function fetchArticles() {
  const articles = await apiRequest('/articles');
  return articles.map(normalizeArticleForUi);
}

async function loginAdmin({ email, password }) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export { API_BASE_URL, fetchPodcasts, fetchArticles, loginAdmin };
