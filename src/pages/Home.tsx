import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Benefits />

      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground">
              Join thousands of satisfied customers who trust PremiumCard for
              their financial needs.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 PremiumCard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
