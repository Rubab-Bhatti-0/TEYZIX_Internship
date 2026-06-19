import { useLocation } from 'wouter';

export default function Footer() {
  const [, navigate] = useLocation();

  return (
    <footer className="border-t border-border bg-background/50 mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">ServiceHub</h3>
            <p className="text-sm text-foreground/70">
              Connect with skilled service providers for all your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/services')}
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Browse Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Home
                </button>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">For Providers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/register')}
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  Become a Provider
                </button>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Provider Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground/70">
            © 2024 ServiceHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
