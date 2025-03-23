'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Award, HeartHandshake, Globe, Coffee, Zap, Shield, Brain } from "lucide-react";

const jobListings = [
  {
    title: "Senior Cloud Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Join our cloud infrastructure team to build and maintain scalable solutions.",
    requirements: [
      "5+ years of cloud experience",
      "Expert in AWS/Azure/GCP",
      "Strong programming skills",
      "Infrastructure as Code expertise"
    ]
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    description: "Lead product development and strategy for our hosting solutions.",
    requirements: [
      "3+ years of product management",
      "Technical background",
      "Strong analytical skills",
      "Excellent communication"
    ]
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Hybrid",
    type: "Full-time",
    description: "Help customers achieve their goals with our hosting solutions.",
    requirements: [
      "2+ years of customer success",
      "Technical knowledge",
      "Problem-solving skills",
      "Customer-focused mindset"
    ]
  }
];

const benefits = [
  {
    icon: Globe,
    title: "Remote Work",
    description: "Work from anywhere in the world with our flexible remote policy."
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description: "Flexible hours and unlimited PTO to maintain a healthy work-life balance."
  },
  {
    icon: Zap,
    title: "Growth Opportunities",
    description: "Continuous learning and development programs to advance your career."
  },
  {
    icon: Shield,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family."
  },
  {
    icon: Brain,
    title: "Learning Budget",
    description: "Annual budget for courses, conferences, and professional development."
  }
];

const culture = [
  {
    icon: Users,
    title: "Inclusive Culture",
    description: "Diverse and inclusive environment where everyone's voice matters."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do."
  },
  {
    icon: HeartHandshake,
    title: "Collaboration",
    description: "Strong emphasis on teamwork and open communication."
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Join Our Team
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Be part of an innovative team that's shaping the future of web hosting and cloud services.
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
            View Open Positions
          </Button>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-white/10 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-white/90">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
        <div className="grid grid-cols-1 gap-8">
          {jobListings.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl text-white/90">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="text-blue-400">{job.department}</span>
                    <span className="text-white/60">{job.location}</span>
                    <span className="text-white/60">{job.type}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 mb-4">{job.description}</p>
                  <h4 className="text-white/90 font-semibold mb-2">Requirements:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-center text-white/60">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 bg-blue-500 hover:bg-blue-600">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Culture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {culture.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-white/10 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-white/90">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <CardContent className="p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Join Our Team?
              </h3>
              <p className="text-white/60 mb-8">
                Take the first step towards an exciting career with us.
              </p>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Careers; 