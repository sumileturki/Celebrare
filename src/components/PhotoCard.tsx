import type { Photo } from "../types/photo";

interface Props {
  photo: Photo;
  isFav: boolean;
  toggleFav: (id: string) => void;
}

export default function PhotoCard({ photo, isFav, toggleFav }: Props) {
  return (
    <div className="bg-zinc-900 rounded shadow-lg overflow-hidden border border-zinc-800">
      <img
        src={photo.download_url}
        alt={photo.author}
        className="w-full h-48 md:h-56 lg:h-64 object-contain"
      />

      <div className="flex flex-col sm:flex-row sm:justify-between items-center p-3 bg-zinc-900">
        <p className="text-sm text-gray-300 font-medium text-center sm:text-left">
          {photo.author}
        </p>

        <button
          onClick={() => toggleFav(photo.id)}
          className="text-xl hover:scale-110 transition mt-2 sm:mt-0"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}
