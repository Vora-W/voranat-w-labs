import { useId } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import CustomButton from "./ui/CustomButton";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

function ImageUploadField({
  label = "Thumbnail image",
  previewUrl,
  onImageChange,
  buttonLabel = "Upload image",
  disabled = false,
  previewClassName = "h-40 w-64 rounded-lg border-2 border-dashed border-brown-200 bg-brown-100/50",
  iconClassName = "size-10 text-brown-400",
  accept = "image/jpeg,image/png,image/gif,image/webp",
  containerClassName = "space-y-2",
  labelClassName = "block text-body-1 text-brown-400",
  contentClassName = "flex flex-wrap items-start gap-4",
  buttonClassName = "h-10 px-4 py-2 text-body-2",
}) {
  const inputId = useId();

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error("The file is too large. Please upload an image smaller than 5MB.");
      return;
    }

    try {
      const nextPreviewUrl = await readFileAsDataUrl(file);
      onImageChange?.({ file, previewUrl: nextPreviewUrl });
    } catch {
      toast.error("Failed to read selected image");
    }
  };

  return (
    <div className={containerClassName}>
      {label ? <label className={labelClassName}>{label}</label> : null}
      <div className={contentClassName}>
        <div
          className={`flex shrink-0 items-center justify-center overflow-hidden ${previewClassName}`}
          style={{
            backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!previewUrl && <ImagePlus className={iconClassName} />}
        </div>
        <CustomButton
          type="button"
          variant="light"
          className={buttonClassName}
          onClick={() => document.getElementById(inputId)?.click()}
          disabled={disabled}
        >
          {buttonLabel}
        </CustomButton>
        <input
          id={inputId}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default ImageUploadField;
