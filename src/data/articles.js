// Mock Articles Data

export const articles = [
    {
        id: 1,
        title: "Understanding True Repentance",
        category: "Gospel",
        date: "2024-01-10",
        excerpt: "What does it mean to truly repent? Many mistake repentance for mere sorrow or regret, but biblical repentance goes much deeper...",
        content: "Full article content here...",
        slug: "understanding-true-repentance",
        readTime: 8
    },
    {
        id: 2,
        title: "The Doctrine of Justification by Faith",
        category: "Theology",
        date: "2024-01-05",
        excerpt: "Martin Luther called justification by faith the doctrine upon which the church stands or falls. But what does it really mean?",
        content: "Full article content here...",
        slug: "doctrine-justification-faith",
        readTime: 12
    },
    {
        id: 3,
        title: "Why the Church Gathers: The Purpose of Corporate Worship",
        category: "Church Life",
        date: "2023-12-28",
        excerpt: "In an age of online services and individualistic spirituality, why is gathering together as a local church so important?",
        content: "Full article content here...",
        slug: "why-church-gathers",
        readTime: 10
    },
    {
        id: 4,
        title: "Spiritual Gifts: Understanding Your Role in the Body",
        category: "Holy Spirit",
        date: "2023-12-20",
        excerpt: "Every believer has been given spiritual gifts for the building up of the church. Discover how to identify and use your gifts.",
        content: "Full article content here...",
        slug: "spiritual-gifts-role",
        readTime: 9
    },
    {
        id: 5,
        title: "The Call to Evangelism: Every Christian's Mission",
        category: "Evangelism",
        date: "2023-12-15",
        excerpt: "Jesus commanded us to make disciples of all nations. How does this apply to everyday believers in their daily lives?",
        content: "Full article content here...",
        slug: "call-to-evangelism",
        readTime: 7
    },
    {
        id: 6,
        title: "Prayer as Warfare: The Believer's Secret Weapon",
        category: "Prayer",
        date: "2023-12-10",
        excerpt: "Prayer is not just communication with God—it is spiritual warfare. Learn how to pray with authority and power.",
        content: "Full article content here...",
        slug: "prayer-as-warfare",
        readTime: 11
    },
    {
        id: 7,
        title: "The Trinity Explained: One God, Three Persons",
        category: "Theology",
        date: "2023-12-05",
        excerpt: "The doctrine of the Trinity is foundational to Christian faith. Let's explore this profound mystery together.",
        content: "Full article content here...",
        slug: "trinity-explained",
        readTime: 14
    },
    {
        id: 8,
        title: "Living a Set-Apart Life: Practical Holiness",
        category: "Christian Living",
        date: "2023-11-28",
        excerpt: "God calls us to be holy as He is holy. But what does holiness look like in everyday life?",
        content: "Full article content here...",
        slug: "set-apart-life",
        readTime: 8
    }
];

export const getFeaturedArticles = (count = 4) => {
    return articles.slice(0, count);
};

export const getArticleBySlug = (slug) => {
    return articles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category) => {
    return articles.filter(article => article.category === category);
};

export const getAllCategories = () => {
    return [...new Set(articles.map(article => article.category))];
};
