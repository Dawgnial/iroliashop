
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageViewerProps {
  imageSrc: string;
  imageAlt: string;
  categoryName: string;
}

const ImageViewer = ({ imageSrc, imageAlt, categoryName }: ImageViewerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md z-10"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full h-full max-h-[90vh] p-0">
        <div className="relative w-full h-full">
          <div className="absolute top-4 left-4 z-10">
            <h2 className="text-2xl font-bold text-white bg-black/50 px-4 py-2 rounded-lg">
              {categoryName}
            </h2>
          </div>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewer;
