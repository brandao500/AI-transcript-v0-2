import { Button } from "@/components/ui/button";
import { Play, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-youtube rounded-lg shadow-glow">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold bg-gradient-youtube bg-clip-text text-transparent">
              AI YouTube Analyzer
            </h1>
            <p className="text-xs text-muted-foreground">Powered by AI</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="/#features" 
            className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
            onClick={(e) => {
              if (window.location.pathname !== '/') {
                window.location.href = '/#features';
                return;
              }
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Recursos
          </a>
          <a 
            href="/#pricing" 
            className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
            onClick={(e) => {
              if (window.location.pathname !== '/') {
                window.location.href = '/#pricing';
                return;
              }
              e.preventDefault();
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Preços
          </a>
          <a 
            href="/transcricaoAnalise" 
            className="text-sm font-medium text-foreground hover:text-primary transition-smooth"
          >
            Analise
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="nav" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="youtube" size="sm" asChild>
            <Link to="/transcricaoAnalise">Começar Agora</Link>
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <nav className="container py-4 space-y-3">
            <a 
              href="/#features" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-smooth"
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  window.location.href = '/#features';
                  setIsMenuOpen(false);
                  return;
                }
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Recursos
            </a>
            <a 
              href="/#pricing" 
              className="block text-sm font-medium text-foreground hover:text-primary transition-smooth"
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  window.location.href = '/#pricing';
                  setIsMenuOpen(false);
                  return;
                }
                e.preventDefault();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
            >
              Preços
            </a>
            <a 
              href="/transcricaoAnalise" 
              className="block w-full text-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Comece Agora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;