import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchBlogPosts } from "../api/blogPost";
import { LoaderCircle, Ellipsis } from "lucide-react";

// Author Card Component
function AuthorCard({ author, className = "" }) {
    return (
        <div className={`bg-brown-200 rounded-[16px] p-[24px] flex flex-col gap-[20px] ${className}`}>
            {/* Author Header */}
            <div className="flex items-center gap-4">
                <img
                    src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                    alt={author}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                    <p className="text-brown-400 text-body-3">Author</p>
                    <p className="text-brown-500 text-headline-4">{author}</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-brown-300" />

            {/* Author Bio */}
            <div className="flex flex-col gap-4">
                <p className="text-body-1 text-brown-400 leading-relaxed">
                    I am a pet enthusiast and freelance writer who specializes in animal
                    behavior and care. With a deep love for cats, I enjoy sharing insights
                    on feline companionship and wellness.
                </p>
                <p className="text-body-1 text-brown-400 leading-relaxed">
                    When i'm not writing, I spends time volunteering at my local animal
                    shelter, helping cats find loving homes.
                </p>
            </div>
        </div>
    );
}

function ViewPostPage() {
    const [blogPost, setBlogPost] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { postId } = useParams();

    useEffect(() => {
        const getBlogPostById = async () => {
            try {
                setIsLoading(true);
                const result = await fetchBlogPosts({ postId });
                setBlogPost(result);
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getBlogPostById();
    }, [postId]);

    return (
        <>
            <NavBar />

            {/* blog post */}
            {isLoading ? (
                <div className="flex flex-col justify-center items-center gap-2 min-h-screen bg-brown-100">
                    <LoaderCircle className="animate-spin w-10 h-10 mr-2" />
                    <span className="flex flex-row items-end-safe">
                        Loading
                        <Ellipsis className="w-5 h-5 animate-pulse pt-0.5" />
                    </span>
                </div>
            ) : (
                <section className="bg-brown-100 md:pt-15">
                    <div className="max-w-[1200px] mx-auto">
                        {/* รูปภาพเต็มความกว้าง */}
                        <img
                            src={blogPost.image}
                            alt={blogPost.title}
                            className="w-full h-[300px] md:h-[587px] object-cover md:rounded-[16px]"
                        />

                        {/* Content + Author Layout */}
                        <div className="flex flex-col md:flex-row md:justify-between md:gap-8 pt-6 md:pt-10 pb-10 px-5 md:px-0">
                            {/* Content section */}
                            <div className="flex-1 md:max-w-[815px]">
                                {/* Category + Date */}
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-brand-green-soft text-brand-green px-3 py-1 rounded-full text-sm">
                                        {blogPost.category}
                                    </span>
                                    <span className="text-brown-400 text-body-1">
                                        {blogPost.date}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-headline-3 md:text-headline-2 text-brown-600 mb-6">{blogPost.title}</h1>

                                {/* Description */}
                                <p className="text-brown-500 text-body-1 mb-6 leading-relaxed">
                                    {blogPost.description}
                                </p>

                                {/* Markdown Content */}
                                <div className="markdown prose max-w-none">
                                    <ReactMarkdown>{blogPost.content}</ReactMarkdown>
                                </div>

                                {/* Author Section - Mobile Only */}
                                <AuthorCard
                                    author={blogPost.author}
                                    className="md:hidden w-[343px] mt-8 mx-auto"
                                />
                            </div>

                            {/* Author Section - Desktop Only (Sticky) */}
                            <div className="hidden md:block md:w-[305px]">
                                <AuthorCard
                                    author={blogPost.author}
                                    className="sticky top-4"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}

export default ViewPostPage;
