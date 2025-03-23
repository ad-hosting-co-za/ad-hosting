'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award, HeartHandshake, Linkedin, Mail } from "lucide-react";

const leadership = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
    bio: "15+ years of experience in cloud infrastructure and web hosting solutions.",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
    bio: "Expert in scalable architecture and cloud-native technologies.",
    linkedin: "https://linkedin.com"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
    bio: "Leading global operations and customer success initiatives.",
    linkedin: "https://linkedin.com"
  }
];

const teamMembers = [
  {
    name: "David Kim",
    role: "Senior Cloud Architect",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
    department: "Engineering"
  },
  {
    name: "Lisa Patel",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
    department: "Product"
  },
  {
    name: "James Wilson",
    role: "Customer Success Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop",
    department: "Customer Success"
  },
  {
    name: "Sophie Chen",
    role: "Security Engineer",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&h=500&fit=crop",
    department: "Security"
  }
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from customer service to technical solutions."
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description: "Our customers' success is our top priority, and we're committed to their growth."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in the power of teamwork and open communication across all levels."
  }
];

const Team = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Meet Our Team
          </h1>
          <p className="text-lg text-white/60 mb-8">
            A diverse group of passionate individuals dedicated to revolutionizing web hosting and cloud services.
          </p>
        </motion.div>
      </section>

      {/* Leadership Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-white/10 overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-white/90">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-400 mb-2">{member.role}</p>
                  <p className="text-white/60 mb-4">{member.bio}</p>
                  <div className="flex gap-4">
                    <a href={member.linkedin} className="text-white/60 hover:text-blue-400" title={`Connect with ${member.name} on LinkedIn`}>
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@company.com`} className="text-white/60 hover:text-blue-400" title={`Email ${member.name}`}>
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Members Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-white/10 overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-white/90">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-400 text-sm mb-1">{member.role}</p>
                  <p className="text-white/60 text-sm">{member.department}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-white/10 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-white/90">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60">{value.description}</p>
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
                Join Our Growing Team
              </h3>
              <p className="text-white/60 mb-8">
                We're always looking for talented individuals to join our mission.
              </p>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                View Open Positions
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Team; 