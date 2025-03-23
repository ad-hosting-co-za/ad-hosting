import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    id: "performance",
    title: "High Performance",
    description: "Our servers are optimized for speed and reliability, ensuring your website loads quickly every time.",
    image: "/Logo Pictures/Web Size/Super-Fast-Server-134x134.png",
    benefits: [
      "SSD storage for faster data access",
      "Global CDN for reduced latency",
      "Optimized server configurations",
      "99.9% uptime guarantee"
    ]
  },
  {
    id: "security",
    title: "Advanced Security",
    description: "We implement multiple layers of security to keep your website and data safe from threats.",
    image: "/Logo Pictures/Small logo website/Daily-Backups.png",
    benefits: [
      "Free SSL certificates",
      "Daily automated backups",
      "DDoS protection",
      "Malware scanning and removal"
    ]
  },
  {
    id: "scalability",
    title: "Easy Scalability",
    description: "As your business grows, our hosting solutions can scale to meet your increasing demands.",
    image: "/Logo Pictures/Small logo website/Cloud-VPS.png",
    benefits: [
      "Flexible resource allocation",
      "Seamless upgrades",
      "Load balancing",
      "Horizontal and vertical scaling options"
    ]
  },
  {
    id: "support",
    title: "24/7 Expert Support",
    description: "Our technical team is available around the clock to assist you with any hosting issues.",
    image: "/Logo Pictures/Small logo website/Technical-Services.png",
    benefits: [
      "Live chat support",
      "Phone and email assistance",
      "Knowledge base resources",
      "Dedicated account managers"
    ]
  }
];

const FeatureShowcase = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <Container>
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase tracking-wider border border-border rounded-full bg-secondary">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Hosting Features That Set Us Apart
            </h2>
            <p className="text-muted-foreground">
              Discover the powerful features that make our hosting services the preferred choice for businesses worldwide.
            </p>
          </div>
        </Reveal>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto mb-8">
            {features.map((feature) => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className="py-3 data-[state=active]:bg-primary/10"
              >
                <div className="flex flex-col items-center gap-2">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-8 h-8 object-contain" 
                  />
                  <span>{feature.title}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <Reveal direction="left">
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <img 
                          src={feature.image} 
                          alt={feature.title} 
                          className="w-12 h-12 object-contain" 
                        />
                      </div>
                      <h3 className="text-2xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                            <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="gap-2">
                      Learn More <ArrowRight size={16} />
                    </Button>
                  </div>
                </Reveal>
                
                <Reveal direction="right">
                  <div className="relative rounded-xl overflow-hidden aspect-video shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 pointer-events-none z-10"></div>
                    <img 
                      src={`/Logo Pictures/${feature.id === "performance" ? "CRYSIS CACGROUND.png" : 
                            feature.id === "security" ? "A&D ArtLogo.jpg" : 
                            feature.id === "scalability" ? "A&D-Studios33.png" : "Untitled-5.jpg"}`} 
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Reveal>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  );
};

export default FeatureShowcase; 