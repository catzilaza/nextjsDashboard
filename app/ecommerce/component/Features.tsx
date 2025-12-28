export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold">Features</h2>
      <p className="mx-auto mt-2 max-w-2xl text-center text-gray-600">
        Everything you need to build a fully-featured dashboard quickly.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Responsive", desc: "Looks great on any device." },
          { title: "Accessible", desc: "Built with accessibility in mind." },
          { title: "Theming", desc: "Easily switch colors and styles." },
          { title: "Components", desc: "Pre-built UI pieces for speed." },
          { title: "Fast", desc: "Optimized for performance." },
          { title: "Docs", desc: "Clear examples and guides." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
