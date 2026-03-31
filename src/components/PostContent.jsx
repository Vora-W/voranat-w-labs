import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchBlogPosts } from "../api/blogPost";
import { LoaderCircle, Ellipsis, Smile, Copy } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { toast } from "sonner";
import AuthorCard from "../components/AuthorCard";
import CustomButton from "./ui/CustomButton";
import LoginAlertDialog from "./LoginAlertDialog";

// Mock authentication state - replace with real auth context later
const isLoggedIn = false;

// Social share buttons data with share URLs
const socialShareLinks = [
  {
    network: "facebook",
    getShareUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    network: "linkedin",
    getShareUrl: (url) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  },
  {
    network: "x",
    getShareUrl: (url) =>
      `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
];

// Shared Comment Section
function CommentSection({
  isLoggedIn,
  isDialogOpen,
  setIsDialogOpen,
  comments,
  setComments,
}) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
      return;
    }

    if (commentText.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), text: commentText, author: "You" },
      ]);
      setCommentText("");
      toast("Comment added!", {
        description: "Your comment has been posted successfully.",
      });
    }
  };

  const submitButton = (
    <CustomButton variant="dark" className="mt-1" onClick={handleSubmit}>
      <span>Send</span>
    </CustomButton>
  );

  return (
    <>
      <label className="text-body-1 text-brown-400">Comment</label>
      <textarea
        placeholder="What are your thoughts?"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full h-[102px] p-4 text-body-1 text-brown-600 bg-white border border-brown-300 rounded-lg resize-y focus:outline-none focus:border-brown-400 transition-colors placeholder:text-brown-400"
      />
      {isLoggedIn ? (
        submitButton
      ) : (
        <LoginAlertDialog
          dialogState={isDialogOpen}
          setDialogState={setIsDialogOpen}
        >
          {submitButton}
        </LoginAlertDialog>
      )}
    </>
  );
}

// Shared Like + Copy Link + Social buttons
function LikeAndShareButtons({
  likes,
  setLikes,
  isLoggedIn,
  isDialogOpen,
  setIsDialogOpen,
  fullWidth = false,
}) {
  const handleLike = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
      return;
    }

    setLikes(likes + 1);
  };

  const likeButton = (
    <CustomButton fullWidth={fullWidth} onClick={handleLike}>
      <Smile className="w-5 h-5" />
      <span>{likes}</span>
    </CustomButton>
  );

  return (
    <>
      {isLoggedIn ? (
        likeButton
      ) : (
        <LoginAlertDialog
          dialogState={isDialogOpen}
          setDialogState={setIsDialogOpen}
        >
          {likeButton}
        </LoginAlertDialog>
      )}

      <div className="flex items-center gap-3">
        <CustomButton
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast("Copied!", {
              description: "This article has been copied to your clipboard.",
            });
          }}
        >
          <Copy className="w-5 h-5" />
          <span>Copy link</span>
        </CustomButton>
        {socialShareLinks.map((social) => (
          <button
            key={social.network}
            onClick={() =>
              window.open(social.getShareUrl(window.location.href), "_blank")
            }
            className="flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer"
            aria-label={`Share on ${social.network}`}
          >
            <SocialIcon
              network={social.network}
              style={{ height: 48, width: 48 }}
            />
          </button>
        ))}
      </div>
    </>
  );
}

function PostContent() {
  const [blogPost, setBlogPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use isDialogOpen instead of the global isLoggedIn constant
  const userIsLoggedIn = !isDialogOpen && isLoggedIn;

  const CATEGORY_MAP = { 1: "Cat", 2: "Inspiration", 3: "General" };

  useEffect(() => {
    let isActive = true;
    const requestedPostId = postId;

    const getBlogPostById = async () => {
      try {
        setIsLoading(true);
        const result = await fetchBlogPosts({ postId: requestedPostId });

        // Prevent stale/out-of-order responses from overwriting current state
        if (!isActive || requestedPostId !== postId) {
          return;
        }

        setBlogPost(result);
        // Initialize likes from blog post data
        setLikes(result.likes || 0);
      } catch (error) {
        if (!isActive) {
          return;
        }
        console.error("Error fetching blog post:", error);
      } finally {
        // Only set loading to false if the effect is still active and matches the latest postId
        if (isActive && requestedPostId === postId) {
          setIsLoading(false);
        }
      }
    };

    getBlogPostById();
    // Cleanup function to prevent memory leaks
    return () => {
      isActive = false;
    };
  }, [postId]);

  return (
    <>
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
            {/* Full width image */}
            {/* Defensive render: avoid rendering <img> with undefined src on first paint or when a post has no image */}
            {blogPost.image && (
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-[300px] md:h-[587px] object-cover md:rounded-[16px]"
              />
            )}

            {/* Content + Author Layout */}
            <div className="flex flex-col md:flex-row md:justify-between md:gap-8 pt-6 md:pt-10 pb-10 px-5 md:px-0">
              {/* Content section */}
              <div className="flex-1 md:max-w-[815px]">
                {/* Category + Date */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-brand-green-soft text-brand-green px-3 py-1 rounded-full text-sm">
                    {CATEGORY_MAP[blogPost.category_id] ?? blogPost.category_id}
                  </span>
                  <span className="text-brown-400 text-body-1">
                    {blogPost.date}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-headline-3 md:text-headline-2 text-brown-600 mb-6">
                  {blogPost.title}
                </h1>

                {/* Description */}
                <p className="text-brown-500 text-body-1 mb-6 leading-relaxed">
                  {blogPost.description}
                </p>

                {/* Markdown Content */}
                <div className="markdown prose max-w-none">
                  {blogPost.content && (
                    <ReactMarkdown>{blogPost.content}</ReactMarkdown>
                  )}
                </div>

                {/* Author Section - Mobile Only */}
                <AuthorCard
                  author={blogPost.author ?? "Admin"}
                  className="md:hidden w-[343px] mt-8 mx-auto"
                />

                {/* Interaction Section - Desktop Only */}
                <div className="hidden md:flex flex-row gap-4 items-center justify-between bg-brown-200 py-4 px-6 mt-10 rounded-[16px]">
                  <LikeAndShareButtons
                    likes={likes}
                    setLikes={setLikes}
                    isLoggedIn={userIsLoggedIn}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </div>

                {/* Comment Section - Desktop Only */}
                <div className="hidden md:flex flex-col gap-2 mt-10 [&>button]:self-end">
                  <CommentSection
                    isLoggedIn={userIsLoggedIn}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    comments={comments}
                    setComments={setComments}
                  />
                </div>
              </div>

              {/* Author Section - Desktop Only (Sticky) */}
              <div className="hidden md:block md:w-[305px]">
                <AuthorCard
                  author={blogPost.author ?? "Admin"}
                  className="sticky top-4"
                />
              </div>
            </div>
          </div>

          {/* Interaction Section - Mobile Only */}
          <div className="md:hidden flex flex-col gap-4 items-center bg-brown-200 px-4 py-10">
            <LikeAndShareButtons
              likes={likes}
              setLikes={setLikes}
              isLoggedIn={userIsLoggedIn}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              fullWidth={true}
            />
          </div>

          {/* Comment Section - Mobile Only */}
          <div className="md:hidden flex flex-col gap-2 px-4 py-10 bg-brown-100">
            <CommentSection
              isLoggedIn={userIsLoggedIn}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default PostContent;
