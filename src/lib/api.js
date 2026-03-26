import { getAdminToken } from './auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api';

async function apiRequest(path, options = {}) {
  const { auth = false, ...fetchOptions } = options;
  const token = auth ? getAdminToken() : null;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(fetchOptions.headers ?? {}),
    },
    ...fetchOptions,
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
    series: podcast.series ?? null,
    youtubeUrl: podcast.youtubeUrl ?? '',
    youtubeVideoId: podcast.youtubeVideoId ?? '',
    embedUrl: podcast.embedUrl ?? '',
    slug: String(podcast.id),
  };
}

function normalizeArticleForUi(article) {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    date: article.publishedAt ?? article.createdAt,
    category: article.category ?? null,
    categoryId: article.categoryId ?? null,
    readTime: article.readTime ?? undefined,
    authorName: article.authorName,
    contentRaw: article.contentRaw,
    contentParagraphs: article.contentParagraphs ?? [],
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

async function fetchArticleById(articleId) {
  const article = await apiRequest(`/articles/${articleId}`);
  return normalizeArticleForUi(article);
}

async function loginAdmin({ email, password }) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

async function createPodcast(payload) {
  return apiRequest('/podcasts', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function updatePodcast(podcastId, payload) {
  return apiRequest(`/podcasts/${podcastId}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function deletePodcast(podcastId) {
  return apiRequest(`/podcasts/${podcastId}`, {
    method: 'DELETE',
    auth: true,
  });
}

async function fetchPodcastById(podcastId) {
  const podcast = await apiRequest(`/podcasts/${podcastId}`);
  return normalizePodcastForUi(podcast);
}

async function fetchSeries() {
  return apiRequest('/series');
}

async function createSeries(payload) {
  return apiRequest('/series', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function updateSeries(seriesId, payload) {
  return apiRequest(`/series/${seriesId}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function deleteSeries(seriesId) {
  return apiRequest(`/series/${seriesId}`, {
    method: 'DELETE',
    auth: true,
  });
}

async function createArticle(payload) {
  return apiRequest('/articles', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function fetchArticleCategories() {
  return apiRequest('/article-categories');
}

async function createArticleCategory(payload) {
  return apiRequest('/article-categories', {
    method: 'POST',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function updateArticleCategory(categoryId, payload) {
  return apiRequest(`/article-categories/${categoryId}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function deleteArticleCategory(categoryId) {
  return apiRequest(`/article-categories/${categoryId}`, {
    method: 'DELETE',
    auth: true,
  });
}

async function submitInterviewRequest(payload) {
  return apiRequest('/interview-requests', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function submitSpeakerRequest(payload) {
  return apiRequest('/speaker-requests', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

async function fetchInterviewRequests() {
  return apiRequest('/interview-requests', { auth: true });
}

async function fetchSpeakerRequests() {
  return apiRequest('/speaker-requests', { auth: true });
}

async function updateInterviewRequestStatus(requestId, payload) {
  return apiRequest(`/interview-requests/${requestId}/status`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function updateSpeakerRequestStatus(requestId, payload) {
  return apiRequest(`/speaker-requests/${requestId}/status`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function updateArticle(articleId, payload) {
  return apiRequest(`/articles/${articleId}`, {
    method: 'PATCH',
    auth: true,
    body: JSON.stringify(payload),
  });
}

async function deleteArticle(articleId) {
  return apiRequest(`/articles/${articleId}`, {
    method: 'DELETE',
    auth: true,
  });
}

async function uploadPodcastCoverImage(file) {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}/uploads/podcast-cover`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.message ?? 'Image upload failed.');
  }
  return payload;
}

export {
  API_BASE_URL,
  fetchPodcasts,
  fetchArticles,
  fetchArticleById,
  loginAdmin,
  createPodcast,
  updatePodcast,
  deletePodcast,
  fetchPodcastById,
  fetchSeries,
  createSeries,
  updateSeries,
  deleteSeries,
  createArticle,
  updateArticle,
  deleteArticle,
  fetchArticleCategories,
  createArticleCategory,
  updateArticleCategory,
  deleteArticleCategory,
  submitInterviewRequest,
  submitSpeakerRequest,
  fetchInterviewRequests,
  fetchSpeakerRequests,
  updateInterviewRequestStatus,
  updateSpeakerRequestStatus,
  uploadPodcastCoverImage,
};
