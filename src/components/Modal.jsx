export default function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-10 rounded-full bg-black/30 text-white"
        >
          ✕
        </button>

        <img
          src={item.imageUrl}
          className="w-full h-72 object-cover"
          alt={item.title}
        />

        <div className="p-8">
          <h2 className="text-3xl font-black dark:text-white mb-4">
            {item.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Detailed information about {item.title}.
          </p>
        </div>
      </div>
    </div>
  );
}
