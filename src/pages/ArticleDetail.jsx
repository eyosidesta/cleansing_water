import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchArticleById } from '../lib/api';
import './ContentPage.css';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadArticle = async () => {
      try {
        const item = await fetchArticleById(articleId);
        if (!isMounted) return;
        setArticle(item);
        setError('');
      } catch (_error) {
        if (!isMounted) return;
        setError('Unable to load this article right now.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadArticle();
    return () => {
      isMounted = false;
    };
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="content-page">
        <section className="section">
          <div className="container">
            <p>Loading article...</p>
          </div>
        </section>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="content-page">
        <section className="section">
          <div className="container">
            <p>{error || 'Article not found.'}</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="content-page">
      <section className="page-hero">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="page-label">{article.category || 'Article'}</span>
            <h1 className="page-title">{article.title}</h1>
            <p className="page-subtitle">
              By {article.authorName || 'Cleansing Water Ministry'}
              {article.date ? ` • ${new Date(article.date).toLocaleDateString()}` : ''}
              {article.readTime ? ` • ${article.readTime} min read` : ''}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container container-sm">
          <div className="content-section">
            {article.contentParagraphs.length > 0
              ? article.contentParagraphs.map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '1.25rem' }}>
                    {paragraph}
                  </p>
                ))
              : <p>{article.contentRaw}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
