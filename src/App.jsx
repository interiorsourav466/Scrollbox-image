import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Modal from "./components/Modal";
import Skeleton from "./components/Skeleton";

const STEPS = [
  {
    title: "Discovery Phase",
    category: "Planning",
    description:
      "In this phase, we gather requirements, understand user needs, analyze competitors, and define the project scope. This lays the foundation for all design and development decisions.",
    tags: ["Research", "Planning", "UX"],
  },
  {
    title: "UI Concept",
    category: "Design",
    description:
      "Wireframes and UI concepts are created to visualize layout, structure, and interactions before development begins.",
    tags: ["UI", "Wireframe", "Design"],
  },
  {
    title: "Color Theory",
    category: "Design",
    description:
      "Color palettes are selected to ensure visual harmony, accessibility, and emotional impact across the application.",
    tags: ["Colors", "Accessibility", "Branding"],
  },
  {
    title: "Frontend Logic",
    category: "Development",
    description:
      "Core frontend functionality is implemented using React components, state management, and reusable logic.",
    tags: ["React", "Logic", "Components"],
  },
  {
    title: "State Management",
    category: "Development",
    description:
      "Application state is handled efficiently to ensure predictable data flow and smooth user interactions.",
    tags: ["State", "Hooks", "Performance"],
  },
  {
    title: "API Integration",
    category: "Development",
    description:
      "External APIs are integrated to fetch dynamic data and connect frontend with backend services.",
    tags: ["API", "Async", "Networking"],
  },
  {
    title: "Tailwind Magic",
    category: "Styling",
    description:
      "Tailwind CSS utilities are used to rapidly build responsive, consistent, and modern user interfaces.",
    tags: ["Tailwind", "CSS", "UI"],
  },
  {
    title: "Responsiveness",
    category: "Styling",
    description:
      "Layouts are optimized for mobile, tablet, and desktop devices using responsive design principles.",
    tags: ["Responsive", "Mobile-first"],
  },
  {
    title: "User Testing",
    category: "Testing",
    description:
      "Usability testing is conducted to identify bugs, gather feedback, and improve user experience.",
    tags: ["Testing", "UX", "Feedback"],
  },
  {
    title: "Deployment",
    category: "Deployment",
    description:
      "The application is deployed to production with optimized builds and proper environment configuration.",
    tags: ["Deployment", "Production"],
  },
  {
    title: "Performance Tuning",
    category: "Optimization",
    description:
      "Performance bottlenecks are identified and fixed to ensure fast load times and smooth animations.",
    tags: ["Performance", "Optimization"],
  },
  {
    title: "SEO Strategy",
    category: "Optimization",
    description:
      "SEO best practices are applied to improve search engine visibility and accessibility.",
    tags: ["SEO", "Accessibility"],
  },
];

const CATEGORIES = [
  "All",
  "Planning",
  "Design",
  "Development",
  "Styling",
  "Testing",
  "Deployment",
  "Optimization",
];

export default function App() {
  const [dark, setDark] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  const [autoLoad, setAutoLoad] = useState(true);

  const loaderRef = useRef(null);

  const filteredSteps =
    category === "All" ? STEPS : STEPS.filter((s) => s.category === category);

  useEffect(() => {
    if (!autoLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((v) => v + 6);
        }
      },
      { threshold: 0.3 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [autoLoad]);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-700">
        <Navbar dark={dark} setDark={setDark} />

        <main className="container mx-auto px-6 pt-32 pb-20">
          <h1 className="text-5xl font-black dark:text-white mb-12 text-center">
            Gallery
          </h1>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setVisibleCount(12);
                }}
                className={`px-4 py-2 rounded-full font-bold text-sm transition
                  ${
                    category === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: visibleCount }).map((_, i) => {
              const step = filteredSteps[i % filteredSteps.length];
              return step ? (
                <Card
                  key={i}
                  index={i}
                  title={step.title}
                  onClick={(data) => setSelectedItem(data)}
                />
              ) : (
                <Skeleton key={`s-${i}`} />
              );
            })}
          </div>

          {/* Loader + Load More */}
          <div className="flex flex-col items-center mt-12 gap-4">
            {autoLoad && <div ref={loaderRef} className="h-10" />}

            {!autoLoad && (
              <button
                onClick={() => setVisibleCount((v) => v + 6)}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700"
              >
                Load More
              </button>
            )}

            <button
              onClick={() => setAutoLoad((v) => !v)}
              className="text-sm text-slate-500 underline"
            >
              Switch to {autoLoad ? "Manual Load" : "Auto Load"}
            </button>
          </div>
        </main>

        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
