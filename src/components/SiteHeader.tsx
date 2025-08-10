import logo from "@/assets/atoz-logo-transparent.png";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <nav className="container flex items-center justify-center px-4 py-4" aria-label="Main">
        <a href="/" className="inline-flex items-center gap-2" aria-label="AtoZ Electrical Service home">
          <img
            src={logo}
            alt="AtoZ Electrical Service logo"
            width="220"
            height="64"
            loading="eager"
            decoding="async"
            className="h-12 sm:h-14 w-auto"
          />
        </a>
      </nav>
    </header>
  );
}
