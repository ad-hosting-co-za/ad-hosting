import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small websites and blogs",
    price: 4.99,
    billing: "monthly",
    icon: "/Logo Pictures/Web Size/plan_icon1.png",
    features: [
      "1 Website",
      "10 GB SSD Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "24/7 Support",
      "Daily Backups"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Business",
    description: "Ideal for growing businesses",
    price: 9.99,
    billing: "monthly",
    icon: "/Logo Pictures/Web Size/plan_icon2.png",
    features: [
      "Unlimited Websites",
      "50 GB SSD Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "24/7 Priority Support",
      "Daily Backups",
      "Free Domain for 1 Year",
      "Performance Boost"
    ],
    popular: true,
    cta: "Get Started"
  },
  {
    name: "Enterprise",
    description: "Advanced features for high-traffic sites",
    price: 19.99,
    billing: "monthly",
    icon: "/Logo Pictures/Web Size/plan_icon3.png",
    features: [
      "Unlimited Websites",
      "100 GB SSD Storage",
      "Unmetered Bandwidth",
      "Free SSL Certificate",
      "24/7 Priority Support",
      "Daily Backups",
      "Free Domain for 1 Year",
      "Performance Boost",
      "Dedicated IP Address",
      "Advanced Security Features"
    ],
    popular: false,
    cta: "Get Started"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.03),transparent_70%)]"></div>
      </div>

      <Container className="relative z-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider border border-border rounded-full bg-secondary">
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Choose the Perfect Hosting Plan
            </h2>
            <p className="text-muted-foreground">
              Affordable hosting solutions for every need, with no hidden fees and a 30-day money-back guarantee.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={index * 100 + 200} direction="up">
              <div className={`relative p-6 rounded-xl border ${plan.popular ? 'border-primary' : 'border-border'} bg-card hover:border-primary/50 transition-colors duration-300 group soft-shadow hover-scale h-full flex flex-col`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 right-6 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-secondary">
                    <img src={plan.icon} alt={plan.name} className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">/{plan.billing}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full mt-auto" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include a 30-day money-back guarantee and 24/7 support.
          </p>
          <Button variant="link" className="text-primary">
            View Full Comparison
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Pricing; 