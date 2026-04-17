function BlogCard({
  image,
  category,
  title,
  description,
  author,
  authorProfilePic,
  date,
  onClick,
}) {
  const displayAuthor = author ?? "Admin";
  return (
    <div className="w-full max-w-[343px] md:max-w-none flex flex-col gap-4 md:gap-6">
      {/* Image */}
      <div
        onClick={onClick}
        className="block w-full rounded-2xl overflow-hidden cursor-pointer"
      >
        <img
          className="w-full h-[212px] md:h-[360px] object-cover"
          src={image}
          alt={title}
        />
      </div>

      {/* Content */}
      <div className="w-full flex flex-col gap-4">
        {/* Category Badge */}
        <div className="flex">
          <span className="bg-brand-green-soft rounded-full px-3 py-1 text-body-2 text-brand-green">
            {category}
          </span>
        </div>

        {/* Title */}
        <div onClick={onClick} className="cursor-pointer">
          <h2 className="text-headline-4 text-brown-600 line-clamp-2 hover:underline">
            {title}
          </h2>
        </div>

        {/* Description */}
        <p className="text-body-2 text-brown-400 line-clamp-2">{description}</p>

        {/* Author & Date */}
        <div className="flex items-center gap-2 text-body-2 text-brown-600">
          {authorProfilePic ? (
            <img
              className="w-6 h-6 rounded-full object-cover"
              src={authorProfilePic}
              alt={displayAuthor}
            />
          ) : (
            <div className="flex w-6 h-6 rounded-full bg-brown-300 items-center justify-center text-[10px] text-brown-600">
              {(displayAuthor || "A").charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-body-2 text-brown-500">{displayAuthor}</span>
          <span className="text-brown-300">|</span>
          <span className="text-body-2 text-brown-400">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
