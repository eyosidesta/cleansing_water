import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  createArticleCategory,
  fetchArticleById,
  fetchArticleCategories,
  updateArticle,
} from '../lib/api';
import './FormPage.css';
import './AdminPodcastCreate.css';

const DEFAULT_AUTHOR_NAME = 'Cleansing Water Ministry';

const AdminArticleEdit = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    excerpt: '',
    contentRaw: '',
    authorName: '',
    publishedAt: '',
  });
  const [categories, setCategories] = useState([]);
  const [creatingInlineCategory, setCreatingInlineCategory] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState({
    title: '',
    description: '',
  });
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    let isMounted = true;
    const loadArticle = async () => {
      try {
        const [article, categoryItems] = await Promise.all([
          fetchArticleById(articleId),
          fetchArticleCategories(),
        ]);
        if (!isMounted) return;
        setCategories(categoryItems);
        setFormData({
          title: article.title ?? '',
          categoryId: article.categoryId ? String(article.categoryId) : '',
          excerpt: article.excerpt ?? '',
          contentRaw: article.contentRaw ?? '',
          authorName: article.authorName ?? '',
          publishedAt: article.date ? String(article.date).slice(0, 10) : '',
        });
      } catch (_error) {
        if (isMounted) setError('Unable to load article.');
      }
    };
    loadArticle();
    return () => {
      isMounted = false;
    };
  }, [articleId]);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCategoryInputChange = (event) => {
    setCategoryFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCreateInlineCategory = async () => {
    setIsSavingCategory(true);
    setError('');
    try {
      const created = await createArticleCategory({
        title: categoryFormData.title.trim(),
        description: categoryFormData.description.trim(),
      });
      setCategories((prev) => [created, ...prev]);
      setFormData((prev) => ({ ...prev, categoryId: String(created.id) }));
      setCategoryFormData({ title: '', description: '' });
      setCreatingInlineCategory(false);
    } catch (categoryError) {
      setError(categoryError.message || 'Unable to create article category.');
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSubmitMessage('');
    try {
      await updateArticle(articleId, {
        title: formData.title.trim(),
        categoryId: formData.categoryId ? Number(formData.categoryId) : null,
        excerpt: formData.excerpt.trim(),
        contentRaw: formData.contentRaw,
        authorName: formData.authorName.trim() || DEFAULT_AUTHOR_NAME,
        publishedAt: formData.publishedAt || null,
      });
      setSubmitMessage('Article updated successfully.');
    } catch (submitError) {
      setError(submitError.message || 'Unable to update article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-card glass-card form-centered">
      <div className="flex items-center justify-between mb-6">
        <h2>Edit Article</h2>
        <Button variant="ghost" onClick={() => navigate('/admin/articles')}>
          Back to list
        </Button>
      </div>
      {error && <p className="form-note">{error}</p>}
      {submitMessage && <p className="form-note">{submitMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Category (Optional)</label>
          <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange}>
            <option value="">No category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        {!creatingInlineCategory ? (
          <Button type="button" variant="ghost" onClick={() => setCreatingInlineCategory(true)}>
            + Create New Category Inline
          </Button>
        ) : (
          <div className="inline-series-card">
            <h4>Create New Category</h4>
            <div className="form-group">
              <label htmlFor="categoryTitle">Category Title</label>
              <input
                id="categoryTitle"
                name="title"
                type="text"
                value={categoryFormData.title}
                onChange={handleCategoryInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryDescription">Category Description</label>
              <textarea
                id="categoryDescription"
                name="description"
                rows={4}
                value={categoryFormData.description}
                onChange={handleCategoryInputChange}
                required
              />
            </div>
            <div className="inline-series-actions">
              <Button
                type="button"
                variant="primary"
                loading={isSavingCategory}
                onClick={handleCreateInlineCategory}
              >
                Save Category
              </Button>
              <Button type="button" variant="ghost" onClick={() => setCreatingInlineCategory(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea id="excerpt" name="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="contentRaw">Article Content</label>
          <textarea id="contentRaw" name="contentRaw" rows={10} value={formData.contentRaw} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="authorName">Author Name</label>
            <input id="authorName" name="authorName" type="text" value={formData.authorName} onChange={handleChange} placeholder={DEFAULT_AUTHOR_NAME} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="publishedAt">Publish Date (Optional)</label>
          <input id="publishedAt" name="publishedAt" type="date" value={formData.publishedAt} onChange={handleChange} />
        </div>
        <Button type="submit" variant="primary" size="lg" fullWidth loading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default AdminArticleEdit;
