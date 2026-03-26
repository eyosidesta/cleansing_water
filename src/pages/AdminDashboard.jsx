import { useEffect, useState } from 'react';
import { fetchArticles, fetchPodcasts, fetchSeries } from '../lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    podcasts: 0,
    articles: 0,
    series: 0,
    standalonePodcasts: 0,
  });

  useEffect(() => {
    let isMounted = true;
    const loadStats = async () => {
      try {
        const [podcasts, articles, series] = await Promise.all([
          fetchPodcasts(),
          fetchArticles(),
          fetchSeries(),
        ]);
        if (!isMounted) return;
        setStats({
          podcasts: podcasts.length,
          articles: articles.length,
          series: series.length,
          standalonePodcasts: podcasts.filter((podcast) => !podcast.series).length,
        });
      } catch (_error) {
        // Keep dashboard lightweight if API fails.
      }
    };

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h2>Overview</h2>
      <p className="text-muted">Quick snapshot of current ministry content.</p>
      <div className="admin-grid mt-6">
        <div className="admin-card glass-card">
          <h3>{stats.podcasts}</h3>
          <p>Total Podcasts</p>
        </div>
        <div className="admin-card glass-card">
          <h3>{stats.articles}</h3>
          <p>Total Articles</p>
        </div>
        <div className="admin-card glass-card">
          <h3>{stats.series}</h3>
          <p>Total Series</p>
        </div>
        <div className="admin-card glass-card">
          <h3>{stats.standalonePodcasts}</h3>
          <p>Podcasts Without Series</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
