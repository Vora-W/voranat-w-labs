import NavBar from "../components/NavBar";
import CustomButton from "../components/ui/CustomButton";
import { Link } from "react-router-dom";

function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="bg-brown-100 w-full flex items-center justify-center pt-10 pb-20 md:pt-15 md:pb-30">
        <div className="w-[344px] h-full rounded-2xl pt-10 pr-4 pb-10 pl-4 gap-6 flex flex-col justify-between mx-auto
                        md:w-[798px] md:pt-15 md:pr-30 md:pb-15 md:pl-30 md:gap-10
                        bg-brown-200">
          <header className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-headline-2 text-brown-600">Sign Up</h2>
          </header>
          <form className="flex flex-col gap-6 md:gap-8">
            {/* Name Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-body-1 text-brown-400">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Full name"
                className="w-full h-12 p-3 md:p-4 rounded-lg border border-brown-300 bg-white text-brown-800 placeholder-brown-400 focus:outline-none focus:border-brown-500"
              />
            </div>

            {/* Username Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-body-1 text-brown-400">Username</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Username"
                className="w-full h-12 p-3 md:p-4 rounded-lg border border-brown-300 bg-white text-brown-800 placeholder-brown-400 focus:outline-none focus:border-brown-500"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-body-1 text-brown-400">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Email"
                className="w-full h-12 p-3 md:p-4 rounded-lg border border-brown-300 bg-white text-brown-800 placeholder-brown-400 focus:outline-none focus:border-brown-500"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-body-1 text-brown-400">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Password"
                className="w-full p-3 h-12 md:p-4 rounded-lg border border-brown-300 bg-white text-brown-800 placeholder-brown-400 focus:outline-none focus:border-brown-500"
              />
            </div>

            {/* Sign Up Button */}
            <div className="flex justify-center md:pt-3">
              <CustomButton
                variant="dark"
                type="submit"
              >
                Sign up
              </CustomButton>
            </div>
          
          </form>

          {/* Login Link */}
          <div className="text-center">
            <span className="text-body-1 text-brown-400">Already have an account? </span>
            <Link to="/auth/login" className="text-body-1 text-brown-600 font-medium underline hover:text-brown-400">
              Log in
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}

export default SignUpPage;