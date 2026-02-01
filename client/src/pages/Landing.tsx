import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Bell, Search, Users, ArrowRight, Star, Globe, Shield, Zap, Mail, MessageSquare, Twitter, Linkedin, Facebook } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema, type InsertNewsletter } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { api } from "@shared/routes";

export default function Landing() {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<InsertNewsletter>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const subscribeMutation = useMutation({
    mutationFn: async (data: InsertNewsletter) => {
      const res = await apiRequest("POST", api.newsletter.subscribe.path, data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-[100] bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">RecruiterAlert</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button data-testid="link-dashboard">Go to Dashboard</Button>
              </Link>
            ) : (
              <Button 
                onClick={() => window.location.href = "/api/login"} 
                size="default" 
                className="font-semibold shadow-md"
                data-testid="button-login"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3 h-3" /> New: Instant SMS Alerts
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05]">
              Hire faster with <br />
              <span className="text-primary italic">Precision</span> Alerts
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              The only platform built specifically for headhunters. Get notified the second a top-tier candidate updates their status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg shadow-xl shadow-primary/20 hover-elevate active-elevate-2"
                onClick={() => window.location.href = "/api/login"}
                data-testid="button-get-started"
              >
                Start Sourcing Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Joined by <span className="font-bold text-foreground">500+</span> top agencies
              </p>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <div className="relative bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700 p-1">
              <div className="bg-background rounded-xl overflow-hidden">
                <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="h-2 w-24 bg-muted rounded-full" />
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm">Active Monitoring</h4>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Live</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah J.", role: "Senior Architect", status: "Active" },
                      { name: "Mike R.", role: "Staff Engineer", status: "Looking" },
                    ].map((candidate, i) => (
                      <div key={i} className="p-4 rounded-xl border border-border/50 bg-muted/10 hover-elevate cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                            {candidate.name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{candidate.name}</p>
                            <p className="text-xs text-muted-foreground">{candidate.role}</p>
                          </div>
                          <div className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                            {candidate.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Everything you need to source faster</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Powering the next generation of recruitment agencies with modern tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover-elevate group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Global Talent Search</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Connect with major job boards and professional networks across the globe. Our spider engine monitors candidate updates 24/7 so you don't have to.
              </p>
            </div>
            <div className="bg-primary p-8 rounded-3xl text-primary-foreground shadow-xl hover-elevate">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">GDPR Compliant</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Source with confidence knowing all candidate data is handled with strict privacy standards.
              </p>
            </div>
            <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover-elevate group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Sync</h3>
              <p className="text-muted-foreground text-sm">Real-time alerts directly to your phone.</p>
            </div>
            <div className="md:col-span-2 bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover-elevate group">
              <div className="flex gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Team Collaboration</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Share pipelines, leave comments, and track candidate status across your entire recruitment team.
                  </p>
                </div>
                <div className="hidden lg:flex gap-2">
                  <div className="w-32 h-40 bg-muted/50 rounded-2xl border border-border/50 animate-pulse" />
                  <div className="w-32 h-40 bg-muted/50 rounded-2xl border border-border/50 translate-y-8 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">Trusted by industry leaders</h2>
              <p className="text-muted-foreground text-lg">Hear from recruiters who have transformed their workflow.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <span className="font-bold">4.9/5 Average Rating</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "RecruiterAlert reduced our time-to-hire by 40%. It's literally like having a sourcing assistant that never sleeps.",
                author: "James Wilson",
                role: "Director @ TalentSource",
                avatar: "https://i.pravatar.cc/150?u=james"
              },
              {
                text: "The instant notifications are a game changer. We reached out to a candidate 5 minutes after they updated their status and signed them.",
                author: "Elena Rodriguez",
                role: "Senior Partner @ HeadHunter Pro",
                avatar: "https://i.pravatar.cc/150?u=elena"
              },
              {
                text: "Finally, a recruiter tool that doesn't feel like it was built in 1995. Clean, fast, and incredibly intuitive UI.",
                author: "Mark Thompson",
                role: "Lead Recruiter @ TechStack",
                avatar: "https://i.pravatar.cc/150?u=mark"
              }
            ].map((t, i) => (
              <Card key={i} className="bg-card hover-elevate transition-all border-none shadow-lg">
                <CardContent className="p-8 space-y-6">
                  <p className="text-lg italic text-muted-foreground">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                      <img src={t.avatar} alt={t.author} />
                    </div>
                    <div>
                      <p className="font-bold">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Stay ahead of the curve</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Get weekly insights on recruitment trends, Boolean search tips, and new feature announcements.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => subscribeMutation.mutate(data))} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-0">
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                variant="secondary" 
                className="h-12 px-8 font-bold"
                disabled={subscribeMutation.isPending}
                data-testid="button-newsletter-subscribe"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
          </Form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "How fast are the alerts?",
                a: "Our engine polls sources every 60 seconds. Depending on the frequency you choose, you can receive alerts almost instantly."
              },
              {
                q: "Which job boards do you monitor?",
                a: "We monitor over 50+ major job boards, LinkedIn, and niche professional networks specifically for the tech and finance industries."
              },
              {
                q: "Can I cancel my plan anytime?",
                a: "Yes, you can cancel or pause your subscription at any time from your dashboard settings."
              },
              {
                q: "Do you offer enterprise pricing?",
                a: "Yes, for teams larger than 10 recruiters, we offer custom enterprise plans with additional features like SSO and dedicated account managers."
              }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/50">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-primary transition-colors py-6">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Ready to close more roles?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join 500+ recruitment agencies who use RecruiterAlert to stay ahead of the competition.
        </p>
        <Button 
          size="lg" 
          className="h-16 px-12 text-xl font-bold shadow-2xl shadow-primary/30 hover-elevate active-elevate-2"
          onClick={() => window.location.href = "/api/login"}
          data-testid="button-cta-bottom"
        >
          Get Started For Free
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border/40 bg-card">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">RecruiterAlert</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering recruitment teams with real-time talent insights and automated sourcing workflows.
            </p>
            <div className="flex gap-4">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jobs Recruiter Alert Inc. All rights reserved. Built with precision for the modern recruiter.</p>
        </div>
      </footer>
    </div>
  );
}
