import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  fetchBlogPosts,
  fetchPostLikes,
  likePost,
  fetchPostComments,
  createPostComment,
} from "../api/blogPost";
import { LoaderCircle, Ellipsis, Smile, Copy } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { toast } from "sonner";
import AuthorCard from "../components/AuthorCard";
import CustomButton from "./ui/CustomButton";
import LoginAlertDialog from "./LoginAlertDialog";
import { useAuth } from "../contexts/AuthContext";

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

const getCommentInitial = (author) =>
  (author ?? "A").trim().charAt(0).toUpperCase() || "A";

function CommentItem({ comment, withDivider = true }) {
  const [imageFailed, setImageFailed] = useState(false);
  const shouldShowProfileImage = Boolean(comment.profilePic) && !imageFailed;

  return (
    <article
      className={`${withDivider ? "border-t border-brown-300 pt-8" : ""}`}
    >
      <div className="flex items-start gap-4">
        {shouldShowProfileImage ? (
          <img
            src={comment.profilePic}
            alt={comment.author}
            className="size-12 rounded-full object-cover shrink-0"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brown-300 text-body-1 text-brown-600">
            {getCommentInitial(comment.author)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-headline-4 text-brown-600 wrap-break-word">
            {comment.author}
          </h3>
          <p className="mt-1 text-body-3 text-brown-400">
            {comment.formattedDate || "-"}
          </p>
          <p className="mt-4 whitespace-pre-wrap text-body-1 leading-relaxed text-brown-500">
            {comment.text}
          </p>
        </div>
      </div>
    </article>
  );
}

// Shared Comment Section
function CommentSection({
  postId,
  isLoggedIn,
  accessToken,
  isDialogOpen,
  setIsDialogOpen,
  comments,
  setComments,
  isSubmittingComment,
  setIsSubmittingComment,
  buttonAlignment = "start",
}) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
      return;
    }

    const trimmedComment = commentText.trim();
    if (!trimmedComment) {
      toast.error("Please enter a comment before sending.");
      return;
    }

    try {
      setIsSubmittingComment(true);
      const createdComment = await createPostComment({
        postId,
        commentText: trimmedComment,
        accessToken,
      });

      setComments((prevComments) => [createdComment, ...prevComments]);
      setCommentText("");
      toast("Comment added!", {
        description: "Your comment has been posted successfully.",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          "Failed to post your comment"
      );
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const submitButton = (
    <CustomButton
      variant="dark"
      className="mt-1"
      onClick={handleSubmit}
      disabled={isSubmittingComment}
    >
      <span>{isSubmittingComment ? "Sending..." : "Send"}</span>
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
      <div
        className={`mt-1 flex ${
          buttonAlignment === "end" ? "justify-end" : "justify-start"
        }`}
      >
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
      </div>
      {comments.length > 0 && (
        <div className="mt-8 flex flex-col gap-8">
          {comments.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              withDivider={index !== 0}
            />
          ))}
        </div>
      )}
    </>
  );
}

// Shared Like + Copy Link + Social buttons
function LikeAndShareButtons({
  likes,
  setLikes,
  isLoggedIn,
  accessToken,
  postId,
  likedByUser,
  setLikedByUser,
  isLiking,
  setIsLiking,
  isDialogOpen,
  setIsDialogOpen,
  fullWidth = false,
}) {
  const handleLike = async () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
      return;
    }

    if (likedByUser || isLiking) {
      return;
    }

    try {
      setIsLiking(true);
      const result = await likePost({ postId, accessToken });
      setLikes(result.likesCount ?? likes);
      setLikedByUser(Boolean(result.likedByUser));
      toast("Liked!", {
        description: "Thanks for liking this article.",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.error || error?.message || "Failed to like this article"
      );
    } finally {
      setIsLiking(false);
    }
  };

  const likeButton = (
    <CustomButton
      fullWidth={fullWidth}
      onClick={handleLike}
      disabled={isLiking || likedByUser}
    >
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
  const { user, accessToken } = useAuth();
  const [blogPost, setBlogPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = useParams();

  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userIsLoggedIn = Boolean(user && accessToken);

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

  useEffect(() => {
    let isActive = true;

    const loadLikes = async () => {
      if (!postId) return;
      try {
        const result = await fetchPostLikes({ postId, accessToken });
        if (!isActive) return;
        setLikes(result.likesCount ?? 0);
        setLikedByUser(Boolean(result.likedByUser));
      } catch (error) {
        if (!isActive) return;
        console.error("Error fetching likes:", error);
      }
    };

    loadLikes();
    return () => {
      isActive = false;
    };
  }, [postId, accessToken]);

  useEffect(() => {
    let isActive = true;

    const loadComments = async () => {
      if (!postId) return;

      try {
        const result = await fetchPostComments({ postId, accessToken });
        if (!isActive) return;
        setComments(result);
      } catch (error) {
        if (!isActive) return;
        console.error("Error fetching comments:", error);
      }
    };

    loadComments();
    return () => {
      isActive = false;
    };
  }, [postId, accessToken]);

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
                    {blogPost.category || "-"}
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
                  authorProfilePic={blogPost.authorProfilePic}
                  className="md:hidden w-[343px] mt-8 mx-auto"
                />

                {/* Interaction Section - Desktop Only */}
                <div className="hidden md:flex flex-row gap-4 items-center justify-between bg-brown-200 py-4 px-6 mt-10 rounded-[16px]">
                  <LikeAndShareButtons
                    likes={likes}
                    setLikes={setLikes}
                    isLoggedIn={userIsLoggedIn}
                    accessToken={accessToken}
                    postId={postId}
                    likedByUser={likedByUser}
                    setLikedByUser={setLikedByUser}
                    isLiking={isLiking}
                    setIsLiking={setIsLiking}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </div>

                {/* Comment Section - Desktop Only */}
                <div className="hidden md:flex flex-col gap-2 mt-10">
                  <CommentSection
                    postId={postId}
                    isLoggedIn={userIsLoggedIn}
                    accessToken={accessToken}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    comments={comments}
                    setComments={setComments}
                    isSubmittingComment={isSubmittingComment}
                    setIsSubmittingComment={setIsSubmittingComment}
                    buttonAlignment="end"
                  />
                </div>
              </div>

              {/* Author Section - Desktop Only (Sticky) */}
              <div className="hidden md:block md:w-[305px]">
                <AuthorCard
                  author={blogPost.author ?? "Admin"}
                  authorProfilePic={blogPost.authorProfilePic}
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
              accessToken={accessToken}
              postId={postId}
              likedByUser={likedByUser}
              setLikedByUser={setLikedByUser}
              isLiking={isLiking}
              setIsLiking={setIsLiking}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              fullWidth={true}
            />
          </div>

          {/* Comment Section - Mobile Only */}
          <div className="md:hidden flex flex-col gap-2 px-4 py-10 bg-brown-100">
            <CommentSection
              postId={postId}
              isLoggedIn={userIsLoggedIn}
              accessToken={accessToken}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              comments={comments}
              setComments={setComments}
              isSubmittingComment={isSubmittingComment}
              setIsSubmittingComment={setIsSubmittingComment}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default PostContent;
