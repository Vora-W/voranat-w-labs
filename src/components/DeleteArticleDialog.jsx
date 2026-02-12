import { X } from "lucide-react";
import CustomButton from "./ui/CustomButton";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "./ui/alert-dialog";

function DeleteArticleDialog({ open, onOpenChange, onConfirm, postId }) {
  const handleConfirm = () => {
    onConfirm?.(postId);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-brown-100 rounded-lg pt-14 pb-10 max-w-[477px] flex flex-col items-center gap-4">
        <AlertDialogCancel className="absolute right-4 top-4 border-none bg-transparent cursor-pointer p-0 h-auto hover:bg-brown-200 rounded">
          <X className="h-5 w-5 text-brown-500 hover:text-brown-600" />
        </AlertDialogCancel>

        <AlertDialogHeader className="flex flex-col items-center gap-2 pb-2">
          <AlertDialogTitle className="text-headline-3! text-brown-600 font-semibold pb-2 text-center">
            Delete article
          </AlertDialogTitle>
          <AlertDialogDescription className="text-body-1! text-brown-400 text-center">
            Do you want to delete this article?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-row gap-3 justify-center w-full sm:w-auto">
          <AlertDialogCancel
            asChild
            className="mt-0! h-12! px-10! py-3! rounded-full! min-w-0!"
          >
            <CustomButton variant="light">Cancel</CustomButton>
          </AlertDialogCancel>
          <CustomButton
            variant="dark"
            onClick={handleConfirm}
          >
            Delete
          </CustomButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteArticleDialog;
