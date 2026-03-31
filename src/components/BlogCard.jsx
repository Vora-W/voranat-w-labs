function BlogCard({
  image,
  category,
  title,
  description,
  author,
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
          <img
            className="w-6 h-6 rounded-full"
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt={displayAuthor}
          />
          <span className="text-body-2 text-brown-500">{displayAuthor}</span>
          <span className="text-brown-300">|</span>
          <span className="text-body-2 text-brown-400">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
