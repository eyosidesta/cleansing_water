import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '../components/ui/ArticleCard';
import { articles as mockArticles } from '../data/articles';
import { fetchArticles } from '../lib/api';
import './Podcasts.css';
import './Articles.css';

const Articles = () => {
    const [articles, setArticles] = useState(mockArticles);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', ...new Set(articles.map((article) => article.category).filter(Boolean))];

    useEffect(() => {
        let isMounted = true;

        const loadArticles = async () => {
            try {
                const apiArticles = await fetchArticles();
                if (!isMounted) return;
                setArticles(apiArticles);
                setError('');
            } catch (_error) {
                if (!isMounted) return;
                // Preserve existing behavior while backend is still being connected.
                setArticles(mockArticles);
                setError('Unable to load articles from backend. Showing local content.');
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadArticles();
        return () => {
            isMounted = false;
        };
    }, []);

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter(article => article.category === activeCategory);

    return (
        <div className="articles-page">
            <section className="page-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="page-label">Read & Study</span>
                        <h1 className="page-title">Articles</h1>
                        <p className="page-subtitle">
                            Dive deeper into Scripture with our written teachings.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {error && (
                        <div className="no-results">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="filter-tabs">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="no-results">
                            <p>Loading articles...</p>
                        </div>
                    ) : (
                        <div className="articles-list">
                            {filteredArticles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ArticleCard {...article} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filteredArticles.length === 0 && (
                        <div className="no-results">
                            <p>No articles found in "{activeCategory}" category</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Articles;
