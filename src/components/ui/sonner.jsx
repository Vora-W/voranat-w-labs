import { Toaster as Sonner } from "sonner";
import { useTheme } from "next-themes";

function Toaster(props) {
  const { theme = "system" } = useTheme()
  
  return (
    <Sonner
      theme={theme}
      closeButton
      toastOptions={{
        classNames: {
          toast: "!bg-brand-green !text-white !border-brand-green shadow-lg",
          title: "!text-white text-headline-4",
          description: "!text-white text-body-2",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
