import heroImage from "../assets/images/human-and-cat.png";

function HeroSection() {
  return (
    <section className="bg-brown-100 px-4 py-10 md:px-[120px] md:py-[60px] flex flex-col md:flex-row gap-10 md:gap-[60px] md:items-center md:justify-center">
      {/* Hero Header - 347x276 on desktop */}
      <div className="flex flex-col gap-4 md:w-[347px] md:shrink-0">
        <h1 className="text-headline-2 md:text-headline-1 text-brown-600 text-center md:text-right">
          Stay Informed, Stay Inspired
        </h1>
        <p className="text-body-1 text-brown-400 text-center md:text-right">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>

      {/* Hero Image - 386x529 on desktop */}
      <div className="w-full max-w-[343px] md:max-w-none md:w-[386px] md:h-[529px] mx-auto md:mx-0 aspect-343/470 md:aspect-auto rounded-2xl overflow-hidden md:shrink-0">
        <img
          src={heroImage}
          alt="Person with cat"
          className="w-full h-full object-cover object-[center_25%]"
        />
      </div>

      {/* Author Section - 347x284 on desktop */}
      <div className="flex flex-col gap-3 md:w-[347px] md:shrink-0">
        <span className="text-body-3 text-brown-400">-Author</span>
        <h3 className="text-headline-3 text-brown-600">Thompson P.</h3>
        <p className="text-body-1 text-brown-400">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
        </p>
        <p className="text-body-1 text-brown-400">
          When i'm not writing, I spends time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
