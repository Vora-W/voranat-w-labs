import { LoaderCircle, Ellipsis } from "lucide-react";

function LoadMoreButton({ isLoading, onClick }) {
  return (
    <button
      className="pt-6 md:pt-12 pb-14 md:pb-22 text-body-1 text-brown-600"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex flex-col items-center gap-2">
          <LoaderCircle className="animate-spin w-10 h-10 mr-2" />
          <span className="flex flex-row items-end-safe">
            Loading
            <Ellipsis className="w-5 h-5 animate-pulse pt-0.5" />
          </span>
        </div>
      ) : (
        <div className="underline cursor-pointer hover:text-brown-400 transition-colors">
          View more
        </div>
      )}
    </button>
  );
}

export default LoadMoreButton;
