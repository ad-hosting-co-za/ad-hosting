'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react";

const offices = [
  {
    city: "San Francisco",
    address: "123 Tech Street, San Francisco, CA 94105",
    phone: "+1 (555) 123-4567",
    email: "sf@company.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM PST"
  },
  {
    city: "New York",
    address: "456 Innovation Ave, New York, NY 10001",
    phone: "+1 (555) 234-5678",
    email: "ny@company.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM EST"
  },
  {
    city: "London",
    address: "789 Digital Lane, London, UK EC2A 4PB",
    phone: "+44 20 7123 4567",
    email: "london@company.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM GMT"
  }
];

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 234-5678"],
    description: "Call us for immediate assistance"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["support@company.com", "sales@company.com"],
    description: "We typically respond within 24 hours"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    details: ["Available 24/7"],
    description: "Get instant help from our support team"
  }
];

const Contact = () => {
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
            Contact Us
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Get in touch with our team. We're here to help with any questions or concerns you may have.
          </p>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-white/10 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-white/90">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-white/60 mb-1">{detail}</p>
                    ))}
                    <p className="text-white/40 text-sm mt-2">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form and Office Locations */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white/90">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">First Name</label>
                      <Input className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/60">Last Name</label>
                      <Input className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Email</label>
                    <Input type="email" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Subject</label>
                    <Input className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Message</label>
                    <Textarea className="bg-white/5 border-white/10 min-h-[150px]" />
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8">Our Offices</h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <Card key={office.city} className="border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xl text-white/90 mb-4">{office.city}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                        <p className="text-white/60">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-blue-400" />
                        <p className="text-white/60">{office.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-400" />
                        <p className="text-white/60">{office.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <p className="text-white/60">{office.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-white/10">
          <CardContent className="p-0">
            <div className="aspect-video w-full bg-white/5 flex items-center justify-center">
              <p className="text-white/40">Map will be integrated here</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Contact; 