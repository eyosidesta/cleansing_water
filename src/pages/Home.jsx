import { useEffect, useState } from 'react';
import Hero from '../components/home/Hero';
import Button from '../components/ui/Button';
import PodcastCard from '../components/ui/PodcastCard';
import ArticleCard from '../components/ui/ArticleCard';
import CollapsibleSection from '../components/ui/CollapsibleSection';
import ImagePromoSection from '../components/ui/ImagePromoSection';
import { getFeaturedPodcasts } from '../data/podcasts';
import { getFeaturedArticles } from '../data/articles';
import { faqs } from '../data/teachings';
import { fetchArticles, fetchPodcasts } from '../lib/api';
import './Home.css';

const Home = () => {
    const [featuredPodcasts, setFeaturedPodcasts] = useState(getFeaturedPodcasts(3));
    const [featuredArticles, setFeaturedArticles] = useState(getFeaturedArticles(4));

    useEffect(() => {
        let isMounted = true;

        const loadFeaturedContent = async () => {
            try {
                const [podcasts, articles] = await Promise.all([fetchPodcasts(), fetchArticles()]);
                if (!isMounted) return;

                setFeaturedPodcasts(podcasts.slice(0, 3));
                setFeaturedArticles(articles.slice(0, 4));
            } catch (_error) {
                // Keep mock content as graceful fallback when API is unavailable.
            }
        };

        loadFeaturedContent();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <Hero
                subtitle="Welcome to Cleansing Water Ministry"
                title="Proclaiming the Gospel of"
                backgroundImage="/images/home-hero-bg.png"
                rotatingWords={[
                    "Jesus Christ",
                    "Salvation",
                    "Redemption",
                    "New Life",
                    "Eternal Hope"
                ]}
            >
                <Button to="/podcasts" variant="primary" size="lg">
                    Listen to Podcasts
                </Button>
                <Button to="/about" variant="ghost" size="lg">
                    Learn More
                </Button>
            </Hero>

            {/* Featured Podcasts Section */}
            <section className="section podcasts-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Latest Episodes</span>
                        <h2 className="section-title">Featured Podcasts</h2>
                        <p className="section-description">
                            Listen to our latest teachings on the Gospel, prayer, and walking with Christ.
                        </p>
                    </div>

                    <div className="podcasts-grid">
                        {featuredPodcasts.map((podcast, index) => (
                            <PodcastCard key={podcast.id} animationIndex={index} {...podcast} />
                        ))}
                    </div>

                    <div className="section-cta">
                        <Button to="/podcasts" variant="outline">
                            See All Podcasts
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Ministry Explanation Section */}
            <section className="section explanation-section">
                <div className="container container-sm">
                    <div className="explanation-content text-center">
                        <h2 className="explanation-section__title">Rivers of Living Water</h2>
                        <blockquote className="scripture-quote">
                            "He who believes in Me, as the Scripture has said, out of his heart will flow rivers of living water."
                            <cite>— John 7:38</cite>
                        </blockquote>
                        <p>
                            Cleansing Water Ministry exists to proclaim the Gospel of Jesus Christ
                            with clarity and boldness. We are committed to teaching the whole counsel
                            of God's Word, equipping believers to grow in their faith, and raising up
                            disciples who will impact the world for Christ.
                        </p>
                        <p>
                            Through podcasts, articles, and speaking engagements, we seek
                            to encourage the church, challenge believers to deeper devotion,
                            and call the lost to repentance and faith in Jesus.
                        </p>
                        <div className="explanation-cta">
                            <Button to="/mission" variant="primary">
                                Our Mission
                            </Button>
                            <Button to="/about" variant="ghost">
                                About Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <ImagePromoSection
                title="The Victory of the Empty Tomb"
                description="Jesus is risen, and His resurrection gives us living hope. Explore the promise of new life and bold faith through Christ."
                buttonLabel="Explore Our Teachings"
                buttonLink="/articles"
                backgroundImage="/images/home-shared-tomb.png"
            />

            {/* FAQ Section */}
            <section className="section faq-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Common Questions</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>

                    <div className="faq-list">
                        {faqs.map((faq) => (
                            <CollapsibleSection key={faq.id} title={faq.title}>
                                <p>{faq.content}</p>
                            </CollapsibleSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Articles Section */}
            <section className="section articles-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Read & Study</span>
                        <h2 className="section-title">Featured Articles</h2>
                        <p className="section-description">
                            Dive deeper into Scripture with our written teachings.
                        </p>
                    </div>

                    <div className="articles-list">
                        {featuredArticles.map((article) => (
                            <ArticleCard key={article.id} {...article} />
                        ))}
                    </div>

                    <div className="section-cta">
                        <Button to="/articles" variant="outline">
                            See All Articles
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </section>

            <ImagePromoSection
                title="Christ Crucified and Glorified"
                description="The cross is the center of our message. Discover Gospel-centered resources and podcasts that strengthen your walk with Jesus."
                buttonLabel="Listen to the Podcasts"
                buttonLink="/podcasts"
                backgroundImage="/images/home-shared-cross.png"
            />

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-card glass-card">
                        <div className="cta-content">
                            <h2>Want to Invite Us to Speak?</h2>
                            <p>
                                We are available for churches, conferences, retreats, and other events.
                                Reach out to discuss how we can partner together for the Gospel.
                            </p>
                        </div>
                        <div className="cta-actions">
                            <Button to="/speaker-request" variant="primary" size="lg">
                                Speaker Request
                            </Button>
                            <Button to="/interview-request" variant="ghost" size="lg">
                                Interview Request
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
