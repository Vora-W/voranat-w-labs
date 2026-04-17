import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomButton from "./ui/CustomButton";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "./ui/alert-dialog";

function LoginAlertDialog({ children, dialogState, setDialogState }) {
  const navigate = useNavigate();

  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-brown-100 rounded-md pt-16 pb-6 max-w-[343px] md:max-w-lg flex flex-col items-center">
        <AlertDialogTitle className="text-2xl md:text-4xl text-brown-600 font-semibold pb-2 text-center">
          Create an account to continue
        </AlertDialogTitle>
        {/* Create account button */}
        <CustomButton onClick={() => navigate("/auth/signup")} variant="dark">
          Create account
        </CustomButton>
        <AlertDialogDescription className="flex flex-row gap-1 justify-center font-medium text-center pt-2 text-brown-400">
          Already have an account?
          <Link
            to="/auth/login"
            className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold"
          >
            Log in
          </Link>
        </AlertDialogDescription>
        <AlertDialogCancel className="absolute bg-brown-100 right-1 top-1 border-none cursor-pointer hover:bg-brown-200">
          <X className="h-6 w-6 text-brown-400 hover:text-brown-600" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoginAlertDialog;
