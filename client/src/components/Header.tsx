import { APP_LOGO } from "@/const";
import { Link } from "wouter";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <img src={APP_LOGO} alt="Kenco Ltd" className="h-12" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="/services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>

          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact">Get Connected</Link>
          </Button>

          {/* Mobile menu button - placeholder for future implementation */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}
