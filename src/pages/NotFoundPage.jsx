import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";
import CustomButton from "../components/ui/CustomButton";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Not Found Section */}
      <section className="bg-brown-100 flex-1 w-full flex items-center justify-center px-4 py-20">
        <div className="max-w-[720px] mx-auto flex flex-col items-center gap-6 text-center">
          <CircleAlert className="w-16 h-16 text-brown-600 animate-caret-blink" />

          <div className="flex flex-col gap-2">
            <h2 className="text-headline-3 text-brown-600">Page Not Found</h2>
          </div>

          <CustomButton variant="dark" onClick={() => navigate("/")}>
            Go To Homepage
          </CustomButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NotFoundPage;
