import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, TrendingUp } from "lucide-react";

const Benefits = () => {
  const benefits = [
    "0% intro APR for 15 months on purchases",
    "Up to 5% cashback on rotating categories",
    "No foreign transaction fees worldwide",
    "Premium travel insurance included",
    "Exclusive access to airport lounges",
    "24/7 concierge service available",
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Unlock Premium Benefits
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join millions of satisfied customers who trust PremiumCard for
                their financial needs. Experience the difference that premium
                banking makes.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button asChild variant="premium" size="lg">
              <Link to="/apply">
                Start Your Application
                <TrendingUp className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-border/50">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-primary">$0</div>
                  <div className="text-muted-foreground">Annual Fee</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-accent">5%</div>
                    <div className="text-sm text-muted-foreground">
                      Max Cashback
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">
                      Months 0% APR
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-lg font-semibold text-success">
                    ✓ Approved in Minutes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
