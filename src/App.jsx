import "./App.css";
import { NavBar } from "./components/WebSections.jsx";
import { HeroSection } from "./components/WebSections.jsx";
import { Footer } from "./components/WebSections.jsx";
import ArticleSection from "./components/ArticleSection.jsx";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ArticleSection />
      <Footer />
    </>
  );
}

export default App;
