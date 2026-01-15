export default function Navbar({ dark, setDark }) {
  return (
    <nav className="fixed  top-4 inset-x-4 z-50 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl dark:bg-black/20 px-6 py-3 flex items-center justify-center shadow-2xl">
      <span className="font-black items-center text-5xl dark:text-yellow-200">
        Interiorsourav Gallery
      </span>
    </nav>
  );
}
