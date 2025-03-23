'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Calendar, Clock, Search, Tag, ChevronRight } from "lucide-react";

const categories = [
  "All Posts",
  "Cloud Computing",
  "Web Hosting",
  "Security",
  "Performance",
  "Development"
];

const blogPosts = [
  {
    title: "The Future of Cloud Computing: Trends to Watch in 2024",
    category: "Cloud Computing",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    excerpt: "Explore the latest trends shaping the future of cloud computing and how they'll impact businesses worldwide.",
    tags: ["Cloud", "Technology", "Future Trends"]
  },
  {
    title: "Essential Security Practices for Web Hosting",
    category: "Security",
    date: "March 12, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    excerpt: "Learn the crucial security measures every website owner should implement to protect their online presence.",
    tags: ["Security", "Web Hosting", "Best Practices"]
  },
  {
    title: "Optimizing Website Performance: A Complete Guide",
    category: "Performance",
    date: "March 10, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    excerpt: "Discover proven techniques to improve your website's performance and user experience.",
    tags: ["Performance", "Optimization", "Web Development"]
  },
  {
    title: "Getting Started with Container Orchestration",
    category: "Cloud Computing",
    date: "March 8, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
    excerpt: "A comprehensive guide to understanding and implementing container orchestration in your infrastructure.",
    tags: ["Containers", "DevOps", "Cloud"]
  }
];

const Blog = () => {
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
            Our Blog
          </h1>
          <p className="text-lg text-white/60 mb-8">
            Stay updated with the latest insights, tips, and industry news from our team of experts.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="Search articles..."
              className="bg-white/5 border-white/10 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Button
                variant={category === "All Posts" ? "default" : "outline"}
                className={`${
                  category === "All Posts"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "border-white/10 hover:bg-white/5"
                }`}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-white/10 overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white/90">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/5 text-white/60 text-sm rounded-full flex items-center"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" className="text-blue-400 hover:text-blue-500">
                    Read More
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <CardContent className="p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-white/60 mb-8">
                Get the latest articles and insights delivered straight to your inbox.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border-white/10"
                />
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Subscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Blog; 