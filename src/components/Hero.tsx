import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import creditCardImage from "@/assets/credit-card.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--gradient-hero)] py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                The Future of
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}
                  Premium Banking
                </span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Experience unmatched benefits, instant approvals, and premium
                rewards with our exclusive credit card designed for modern
                achievers.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">
                  Bank-level Security
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Instant Approval
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">
                  Premium Rewards
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <img
                src={creditCardImage}
                alt="Premium Credit Card"
                className="w-full max-w-md mx-auto rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl transform scale-110"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
