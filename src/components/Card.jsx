import { useEffect, useRef, useState } from "react";

export default function Card({ index, title, onClick }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const imageUrl = `https://picsum.photos/seed/${index + 40}/800/600`;

  return (
    <div
      ref={ref}
      onClick={() => onClick({ title, index, imageUrl })}
      className={`
        relative group overflow-hidden rounded-3xl h-64 w-full cursor-pointer
        transition-all duration-1000
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
      `}
    >
      <img
        src={imageUrl}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white/60 text-sm">Click to view details</p>
      </div>
    </div>
  );
}
