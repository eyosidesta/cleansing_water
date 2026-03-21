// Mock Podcast Data

export const podcasts = [
    {
        id: 1,
        title: "The Gospel Message: Understanding True Salvation",
        description: "In this episode, we dive deep into the heart of the Gospel message. What does it truly mean to be saved? Understanding the complete work of Christ on the cross.",
        image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop",
        date: "2024-01-15",
        duration: "45:30",
        audioUrl: "#",
        speaker: "Justin Slemp",
        slug: "gospel-message-true-salvation"
    },
    {
        id: 2,
        title: "The Power of Prayer: Connecting with God",
        description: "Prayer is our direct line of communication with our Heavenly Father. Learn how to develop a powerful prayer life that transforms your walk with Christ.",
        image: "https://images.unsplash.com/photo-1445633743309-b60418bedbf2?w=600&h=400&fit=crop",
        date: "2024-01-08",
        duration: "38:15",
        audioUrl: "#",
        speaker: "Justin Slemp",
        slug: "power-of-prayer"
    },
    {
        id: 3,
        title: "Walking in the Spirit: A Daily Journey",
        description: "What does it mean to walk in the Spirit? This episode explores the daily reality of being led by the Holy Spirit in every aspect of our lives.",
        image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600&h=400&fit=crop",
        date: "2024-01-01",
        duration: "42:00",
        audioUrl: "#",
        speaker: "Justin Slemp",
        slug: "walking-in-the-spirit"
    },
    {
        id: 4,
        title: "Evangelism Today: Sharing Your Faith",
        description: "Practical wisdom for sharing the Gospel in today's world. How to have meaningful conversations about faith with friends, family, and strangers.",
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&h=400&fit=crop",
        date: "2023-12-25",
        duration: "35:45",
        audioUrl: "#",
        speaker: "Justin Slemp",
        slug: "evangelism-today"
    },
    {
        id: 5,
        title: "The Authority of Scripture",
        description: "Why we trust the Bible as God's inspired Word. Examining the reliability, authority, and transformative power of Scripture in the life of a believer.",
        image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&h=400&fit=crop",
        date: "2023-12-18",
        duration: "50:20",
        audioUrl: "#",
        speaker: "Justin Slemp",
        slug: "authority-of-scripture"
    },
    {
        id: 6,
        title: "Understanding Church History",
        description: "A journey through 2000 years of church history. Learning from the triumphs and failures of those who came before us in the faith.",
        image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&h=400&fit=crop",
        date: "2023-12-11",
        duration: "55:00",
        audioUrl: "#",
        speaker: "Justin Slemp",
        slug: "understanding-church-history"
    }
];

export const getFeaturedPodcasts = (count = 3) => {
    return podcasts.slice(0, count);
};

export const getPodcastBySlug = (slug) => {
    return podcasts.find(podcast => podcast.slug === slug);
};
