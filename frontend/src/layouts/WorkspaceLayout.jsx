export default function WorkspaceLayout({ left, center, right }) {
  return (
    <div className="mx-auto grid max-w-[1600px] gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(280px,0.9fr)_minmax(360px,1fr)_minmax(360px,1.15fr)] lg:px-8">
      <aside className="min-w-0">{left}</aside>
      <section className="min-w-0">{center}</section>
      <aside className="min-w-0">{right}</aside>
    </div>
  );
}
