function AuthorCard({ author, authorProfilePic, className = "" }) {
  const displayAuthor = author ?? "Admin";

  return (
    <div
      className={`bg-brown-200 rounded-[16px] p-[24px] flex flex-col gap-[20px] ${className}`}
    >
      {/* Author Header */}
      <div className="flex items-center gap-4">
        {authorProfilePic ? (
          <img
            src={authorProfilePic}
            alt={displayAuthor}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex w-12 h-12 rounded-full bg-brown-300 items-center justify-center text-body-1 text-brown-600">
            {(displayAuthor || "A").charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-brown-400 text-body-3">Author</p>
          <p className="text-brown-500 text-headline-4">{displayAuthor}</p>
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
          When I'm not writing, I spend time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
}

export default AuthorCard;