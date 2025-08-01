import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Shield, Zap, Gift, Globe, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: CreditCard,
      title: "No Annual Fee",
      description:
        "Enjoy all premium benefits without any yearly charges or hidden costs.",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description:
        "Military-grade encryption and real-time fraud protection for peace of mind.",
    },
    {
      icon: Zap,
      title: "Instant Approval",
      description:
        "Get approved in minutes, not days. Start using your card immediately.",
    },
    {
      icon: Gift,
      title: "Cashback Rewards",
      description:
        "Earn up to 5% cashback on every purchase with our premium rewards program.",
    },
    {
      icon: Globe,
      title: "Global Acceptance",
      description:
        "Use your card anywhere in the world with no foreign transaction fees.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Premium customer service available around the clock for all your needs.",
    },
  ];

  return (
    <section className="py-20 bg-[var(--gradient-subtle)]">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Why Choose PremiumCard?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of premium features, unmatched
            security, and exceptional rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-2 bg-card border-border/50"
            >
              <CardHeader className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
