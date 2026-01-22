import axios from 'axios';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export const fetchBlogPosts = async ({ postId, category, page = 1, limit = 6 } = {}) => {
    const baseUrl = "https://blog-post-project-api.vercel.app/posts";

    // Fetch single post by ID
    if (postId) {
        const response = await axios.get(`${baseUrl}/${postId}`);
        console.log('response.data:', response.data);
        const post = {
            ...response.data,
            date: formatDate(response.data.date)
        };
        return post;
    }

    // Fetch list of posts
    const categoryParam = category === "Highlight" ? "" : category;
    const response = await axios.get(baseUrl, {
        params: { page, limit, category: categoryParam }
    });
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