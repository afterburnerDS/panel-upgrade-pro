export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between px-4 py-3" aria-label="Main">
        <a href="/" className="inline-flex items-center gap-2" aria-label="AtoZ Electrical Service home">
          <img
            src="/lovable-uploads/6d370bf3-cf54-416a-b2ec-edd6f1fdb2f2.png"
            alt="AtoZ Electrical Service logo"
            width="160"
            height="40"
            loading="eager"
            decoding="async"
            className="h-8 w-auto"
          />
        </a>
      </nav>
    </header>
  );
}
