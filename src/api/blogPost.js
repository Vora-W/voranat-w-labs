import axios from 'axios';

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

export const fetchBlogPosts = async () => {
    const response = await axios.get('https://blog-post-project-api.vercel.app/posts');
    console.log('response.data:', response.data);
    
    const posts = response.data.posts.map(post => ({
        ...post,
        date: formatDate(post.date)
    }));
    
    return posts;
};