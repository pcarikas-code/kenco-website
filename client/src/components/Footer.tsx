import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Kendyl</p>
              <p>
                <span className="font-medium">m:</span> +64 (0)21 029 66718
              </p>
              <p>
                <span className="font-medium">@:</span>{" "}
                <a href="mailto:web@kenco.nz" className="hover:text-primary transition-colors">
                  web@kenco.nz
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link href="/" className="block hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/services" className="block hover:text-primary transition-colors">
                Services
              </Link>
              <Link href="/about" className="block hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="block hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kenco Ltd.</h3>
            <p className="text-sm">
              We partner with infection control and procurement leaders to deliver solutions that are clinically effective, operationally efficient, and financially sound.
            </p>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>© Kenco Ltd. 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
