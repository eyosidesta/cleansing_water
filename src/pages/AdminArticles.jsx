import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import {
  createArticleCategory,
  deleteArticle,
  deleteArticleCategory,
  fetchArticleCategories,
  fetchArticles,
  updateArticle,
  updateArticleCategory,
} from '../lib/api';

const AdminArticles = () => {
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ title: '', description: '' });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editCategoryForm, setEditCategoryForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  const loadArticles = async () => {
    try {
      const [articleItems, categoryItems] = await Promise.all([
        fetchArticles(),
        fetchArticleCategories(),
      ]);
      setArticles(articleItems);
      setCategories(categoryItems);
      if (!selectedCategoryId && categoryItems.length > 0) {
        setSelectedCategoryId(categoryItems[0].id);
      } else if (
        selectedCategoryId &&
        !categoryItems.some((item) => item.id === selectedCategoryId)
      ) {
        setSelectedCategoryId(categoryItems[0]?.id ?? null);
      }
      setError('');
    } catch (_error) {
      setError('Unable to load articles.');
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (articleId) => {
    const confirmed = window.confirm('Delete this article permanently?');
    if (!confirmed) return;
    try {
      await deleteArticle(articleId);
      await loadArticles();
    } catch (deleteError) {
      setError(deleteError.message || 'Unable to delete article.');
    }
  };

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    setIsSavingCategory(true);
    setError('');
    try {
      await createArticleCategory({
        title: newCategory.title.trim(),
        description: newCategory.description.trim(),
      });
      setNewCategory({ title: '', description: '' });
      await loadArticles();
    } catch (categoryError) {
      setError(categoryError.message || 'Unable to create category.');
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmed = window.confirm('Delete this category? Articles will remain and lose category assignment.');
    if (!confirmed) return;
    try {
      await deleteArticleCategory(categoryId);
      if (selectedCategoryId === categoryId) {
        setSelectedCategoryId(null);
      }
      await loadArticles();
    } catch (categoryError) {
      setError(categoryError.message || 'Unable to delete category.');
    }
  };

  const handleStartEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setEditCategoryForm({
      title: category.title,
      description: category.description,
    });
  };

  const handleSaveCategoryEdit = async () => {
    if (!editingCategoryId) return;
    try {
      await updateArticleCategory(editingCategoryId, {
        title: editCategoryForm.title.trim(),
        description: editCategoryForm.description.trim(),
      });
      setEditingCategoryId(null);
      await loadArticles();
    } catch (categoryError) {
      setError(categoryError.message || 'Unable to update category.');
    }
  };

  const handleMoveArticleCategory = async (articleId, nextCategoryId) => {
    try {
      await updateArticle(articleId, {
        categoryId: nextCategoryId ? Number(nextCategoryId) : null,
      });
      await loadArticles();
    } catch (articleError) {
      setError(articleError.message || 'Unable to update article category.');
    }
  };

  const selectedCategory =
    categories.find((category) => category.id === selectedCategoryId) ?? null;
  const selectedCategoryArticles = articles.filter(
    (article) => article.categoryId === selectedCategoryId,
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>Articles</h2>
        <Button to="/admin/articles/new" variant="primary">
          + New Article
        </Button>
      </div>
      <div className="admin-tab-row mb-6">
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>
      {error && <p className="text-muted mb-4">{error}</p>}
      {activeTab === 'articles' ? (
        <div className="glass-card admin-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.category || 'No category'}</td>
                  <td>{article.date ? new Date(article.date).toLocaleDateString() : 'Not set'}</td>
                  <td>{article.authorName || 'Cleansing Water Ministry'}</td>
                  <td>
                    <div className="admin-actions">
                      <Link to={`/admin/articles/${article.id}/edit`}>Edit</Link>
                      <button type="button" onClick={() => handleDelete(article.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-subsection">
          <form className="admin-inline-form glass-card admin-card" onSubmit={handleCreateCategory}>
            <div className="form-group">
              <label htmlFor="categoryTitle">Category Title</label>
              <input
                id="categoryTitle"
                type="text"
                value={newCategory.title}
                onChange={(event) =>
                  setNewCategory((prev) => ({ ...prev, title: event.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryDescription">Category Description</label>
              <textarea
                id="categoryDescription"
                rows={3}
                value={newCategory.description}
                onChange={(event) =>
                  setNewCategory((prev) => ({ ...prev, description: event.target.value }))
                }
                required
              />
            </div>
            <Button type="submit" variant="primary" loading={isSavingCategory}>
              Create Category
            </Button>
          </form>

          <div className="glass-card admin-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Articles</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <button
                        type="button"
                        onClick={() => setSelectedCategoryId(category.id)}
                      >
                        {category.title}
                      </button>
                    </td>
                    <td>{category._count?.articles ?? 0}</td>
                    <td>{category.description}</td>
                    <td>
                      <div className="admin-actions">
                        <button type="button" onClick={() => handleStartEditCategory(category)}>
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDeleteCategory(category.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingCategoryId && (
            <div className="glass-card admin-card admin-subsection">
              <h3>Edit Category</h3>
              <div className="form-group">
                <label htmlFor="editCategoryTitle">Title</label>
                <input
                  id="editCategoryTitle"
                  type="text"
                  value={editCategoryForm.title}
                  onChange={(event) =>
                    setEditCategoryForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="editCategoryDescription">Description</label>
                <textarea
                  id="editCategoryDescription"
                  rows={4}
                  value={editCategoryForm.description}
                  onChange={(event) =>
                    setEditCategoryForm((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                />
              </div>
              <div className="admin-actions">
                <Button type="button" variant="primary" onClick={handleSaveCategoryEdit}>
                  Save
                </Button>
                <Button type="button" variant="ghost" onClick={() => setEditingCategoryId(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="glass-card admin-card admin-subsection">
            <h3>
              {selectedCategory
                ? `Articles in "${selectedCategory.title}"`
                : 'Select a category to manage articles'}
            </h3>
            {selectedCategory ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Author</th>
                    <th>Move / Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategoryArticles.map((article) => (
                    <tr key={article.id}>
                      <td>{article.title}</td>
                      <td>
                        {article.date
                          ? new Date(article.date).toLocaleDateString()
                          : 'Not set'}
                      </td>
                      <td>{article.authorName || 'Cleansing Water Ministry'}</td>
                      <td>
                        <select
                          value={article.categoryId ?? ''}
                          onChange={(event) =>
                            handleMoveArticleCategory(article.id, event.target.value)
                          }
                        >
                          <option value="">No category</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {selectedCategoryArticles.length === 0 && (
                    <tr>
                      <td colSpan={4}>No articles in this category yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">Choose a category above to manage its articles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticles;
