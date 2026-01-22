import axios from 'axios';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export const fetchBlogPosts = async (category, page = 1, limit = 6) => {
    const categoryParam = category === "Highlight" ? "" : category;

    const response = await axios.get(
        "https://blog-post-project-api.vercel.app/posts",
        {
            params: {
                page: page,
                limit: limit,
                category: categoryParam,
            },
        }
    );
    console.log('response.data:', response.data);

    const posts = response.data.posts.map(post => ({
        ...post,
        date: formatDate(post.date)
    }));

    return {
        posts,
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
    };
};