// Note: Linkedin & Github are deprecated brand icons and will be removed in lucide-react v1.0
import { Linkedin, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/voranat-wongnat/",
    icon: Linkedin,
    external: true
  },
  {
    href: "https://github.com/Vora-W",
    icon: Github,
    external: true
  },
  {
    href: "mailto:voranat.wn@gmail.com",
    icon: Mail,
    external: false
  },
];

function Footer() {
  return (
    <footer className="bg-brown-200 border-t border-brown-300 px-4 py-10 md:px-[120px] md:py-[60px] flex flex-col md:flex-row gap-6 md:gap-0 items-center md:justify-between">
      {/* Get in touch + Social Icons */}
      <div className="flex items-center gap-4">
        <span className="text-body-1 text-brown-500">Get in touch</span>
        <div className="flex items-center gap-4">
          {socialLinks.map((props) => (
            <a
              key={props.href}
              href={props.href}
              {...(props.external && {
                target: "_blank", // เปิดลิงก์ใน tab ใหม่
                rel: "noopener noreferrer", // ความปลอดภัย: ป้องกัน tabnabbing attack และไม่ส่ง referrer
              })}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-brown-500 text-white hover:bg-brown-400 transition-colors"
            >
              <props.icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Home page link */}
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
        className="text-body-1 text-brown-600 underline hover:text-brown-400 transition-colors cursor-pointer"
      >
        Home page
      </Link>
    </footer>
  );
}

export default Footer;
