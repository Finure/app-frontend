import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-foreground"
        >
          <CreditCard className="h-6 w-6 text-primary" />
          PremiumCard
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/apply"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/apply"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Apply Now
          </Link>
        </div>

        <Button asChild variant="hero" size="sm">
          <Link to="/apply">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
