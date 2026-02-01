import { Button } from "@/components/ui/button";
import { Bell, Briefcase, UserPlus, Mail, MapPin, DollarSign, FileText, Star, Globe, Shield, Zap, Twitter, Linkedin, Facebook, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Landing() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"seeking" | "posting">("seeking");

  const handleJobSeekerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      skills: formData.get("skills") as string,
      location: formData.get("location") as string,
    };
    
    console.log("Job Seeker Submission:", data);
    toast({
      title: "Registration Successful!",
      description: "Opening live chat to assist you further...",
    });
    e.currentTarget.reset();
    
    // Send form data to Smartsupp and open chat
    setTimeout(() => {
      if (window.smartsupp) {
        // Set visitor name and email
        window.smartsupp('name', data.name);
        window.smartsupp('email', data.email);
        
        // Open the chat first
        window.smartsupp('chat:open');
        
        // Send form data as a message after a short delay
        setTimeout(() => {
          const message = `Job Seeker Registration:\n\nName: ${data.name}\nEmail: ${data.email}\nSkills: ${data.skills}\nPreferred Location: ${data.location || 'Not specified'}`;
          window.smartsupp('chat:send', message);
        }, 800);
      }
    }, 500);
  };

  const handleJobPosterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName") as string,
      email: formData.get("email") as string,
      jobTitle: formData.get("jobTitle") as string,
      jobDescription: formData.get("jobDescription") as string,
      location: formData.get("location") as string,
      salary: formData.get("salary") as string,
      requirements: formData.get("requirements") as string,
    };
    
    console.log("Job Posting Submission:", data);
    toast({
      title: "Job Posted Successfully!",
      description: "Opening live chat to assist you further...",
    });
    e.currentTarget.reset();
    
    // Send form data to Smartsupp and open chat
    setTimeout(() => {
      if (window.smartsupp) {
        // Set visitor name and email
        window.smartsupp('name', data.companyName);
        window.smartsupp('email', data.email);
        
        // Open the chat first
        window.smartsupp('chat:open');
        
        // Send form data as a message after a short delay
        setTimeout(() => {
          const message = `Job Posting Submission:\n\nCompany: ${data.companyName}\nContact Email: ${data.email}\nJob Title: ${data.jobTitle}\nLocation: ${data.location}\nSalary: ${data.salary || 'Not specified'}\n\nDescription:\n${data.jobDescription}\n\nRequirements:\n${data.requirements}`;
          window.smartsupp('chat:send', message);
        }, 800);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-[100] bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Jobs Recruiter Alert</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#get-started" className="hover:text-primary transition-colors">Get Started</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
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
              <Zap className="w-3 h-3" /> New: Daily Job Alerts
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05]">
              Find Your Dream Job <br />
              <span className="text-primary italic">Today</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Connect job seekers with opportunities and help employers find top talent. Get started in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg shadow-xl shadow-primary/20"
                onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
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
                Joined by <span className="font-bold text-foreground">500+</span> job seekers & employers
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
                    <h4 className="font-bold text-sm">Recent Jobs</h4>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Live</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Senior Developer", company: "TechCorp", salary: "$120k" },
                      { title: "Product Manager", company: "StartupXYZ", salary: "$95k" },
                    ].map((job, i) => (
                      <div key={i} className="p-4 rounded-xl border border-border/50 bg-muted/10 hover-elevate cursor-default">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                            {job.company[0]}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{job.title}</p>
                            <p className="text-xs text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="ml-auto text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                            {job.salary}
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

      {/* Get Started Forms Section */}
      <section id="get-started" className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight">
              Get Started Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Looking for a job or hiring talent? Choose your path below.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "seeking" | "posting")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto">
              <TabsTrigger value="seeking" className="text-base md:text-lg py-4 gap-2">
                <UserPlus className="w-5 h-5" />
                <span>Looking for Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="posting" className="text-base md:text-lg py-4 gap-2">
                <Briefcase className="w-5 h-5" />
                <span>Post a Job</span>
              </TabsTrigger>
            </TabsList>

            {/* Job Seeker Form */}
            <TabsContent value="seeking">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Get Daily Job Alerts</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll send you daily emails with job opportunities matching your profile.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJobSeekerSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="seeker-name">Full Name *</Label>
                      <Input 
                        id="seeker-name" 
                        name="name" 
                        placeholder="John Doe" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seeker-email">Email Address *</Label>
                      <Input 
                        id="seeker-email" 
                        name="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seeker-skills">Skills & Expertise *</Label>
                      <Input 
                        id="seeker-skills" 
                        name="skills" 
                        placeholder="e.g., React, Node.js, Project Management" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="seeker-location">Preferred Location</Label>
                      <Input 
                        id="seeker-location" 
                        name="location" 
                        placeholder="e.g., Remote, New York, London" 
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Mail className="w-5 h-5 mr-2" />
                      Start Receiving Daily Job Alerts
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Poster Form */}
            <TabsContent value="posting">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Post a Job Opening</CardTitle>
                  <p className="text-muted-foreground">
                    Share your job opportunity with qualified candidates.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJobPosterSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="poster-company">Company Name *</Label>
                      <Input 
                        id="poster-company" 
                        name="companyName" 
                        placeholder="Acme Inc." 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="poster-email">Contact Email *</Label>
                      <Input 
                        id="poster-email" 
                        name="email" 
                        type="email" 
                        placeholder="hr@acme.com" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="poster-title">Job Title *</Label>
                      <Input 
                        id="poster-title" 
                        name="jobTitle" 
                        placeholder="Senior Software Engineer" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="poster-description">Job Description *</Label>
                      <Textarea 
                        id="poster-description" 
                        name="jobDescription" 
                        placeholder="Describe the role, responsibilities, and what you're looking for..."
                        rows={5}
                        required 
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="poster-location">Location *</Label>
                        <Input 
                          id="poster-location" 
                          name="location" 
                          placeholder="Remote, New York, etc." 
                          required 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="poster-salary">Salary Range</Label>
                        <Input 
                          id="poster-salary" 
                          name="salary" 
                          placeholder="$80k - $120k" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="poster-requirements">Requirements & Qualifications *</Label>
                      <Textarea 
                        id="poster-requirements" 
                        name="requirements" 
                        placeholder="List required skills, experience, education, etc."
                        rows={4}
                        required 
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Briefcase className="w-5 h-5 mr-2" />
                      Submit Job Posting
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Everything you need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Connecting job seekers with employers through smart technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover-elevate group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Daily Job Alerts</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Job seekers receive personalized email alerts every day with opportunities matching their skills and preferences.
              </p>
            </div>
            <div className="bg-primary p-8 rounded-3xl text-primary-foreground shadow-xl hover-elevate">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Secure & Private</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Your data is protected with industry-standard security measures.
              </p>
            </div>
            <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover-elevate group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Posting</h3>
              <p className="text-muted-foreground text-sm">Get your job opening listed within minutes.</p>
            </div>
            <div className="md:col-span-2 bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover-elevate group">
              <div className="flex gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Quality Matches</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our platform connects the right candidates with the right opportunities for better hiring outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">Trusted by job seekers & employers</h2>
              <p className="text-muted-foreground text-lg">See what our users have to say.</p>
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
                text: "Jobs Recruiter Alert helped me land my dream job in just 2 weeks! The daily alerts were spot on.",
                author: "Sarah Chen",
                role: "Software Engineer",
                avatar: "https://i.pravatar.cc/150?u=sarah"
              },
              {
                text: "As an employer, posting jobs here is incredibly easy. We found qualified candidates within days.",
                author: "Michael Ross",
                role: "HR Manager @ TechCorp",
                avatar: "https://i.pravatar.cc/150?u=michael"
              },
              {
                text: "The best job alert platform I've used. Simple, effective, and the emails are actually relevant!",
                author: "Emma Thompson",
                role: "Marketing Specialist",
                avatar: "https://i.pravatar.cc/150?u=emma"
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
      <section className="py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-muted-foreground">
              Subscribe to our newsletter for the latest job opportunities and career tips.
            </p>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get("email") as string;
              console.log("Newsletter Subscription:", email);
              toast({
                title: "Subscribed Successfully!",
                description: "Opening live chat to personalize your preferences...",
              });
              e.currentTarget.reset();
              setTimeout(() => {
                if (window.smartsupp) {
                  // Set visitor email
                  window.smartsupp('email', email);
                  
                  // Open the chat first
                  window.smartsupp('chat:open');
                  
                  // Send newsletter subscription as a message after a short delay
                  setTimeout(() => {
                    const message = `Newsletter Subscription:\n\nEmail: ${email}`;
                    window.smartsupp('chat:send', message);
                  }, 800);
                }
              }, 500);
            }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              className="h-14 text-lg"
              required
            />
            <Button type="submit" size="lg" className="h-14 px-8 text-lg whitespace-nowrap">
              Subscribe <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              {
                q: "How do the daily job alerts work?",
                a: "Once you submit the job seeker form, our system will match your skills and preferences with available job postings and send you a daily email with the best opportunities."
              },
              {
                q: "Is there a fee to post jobs?",
                a: "Currently, job posting is free for all employers. We may introduce premium features in the future."
              },
              {
                q: "Can I update my preferences later?",
                a: "Yes, you can update your job preferences anytime by submitting the form again with your new information."
              },
              {
                q: "How quickly will my job posting go live?",
                a: "Job postings are typically reviewed and published within 24 hours of submission."
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

      {/* Footer */}
      <footer className="py-20 border-t border-border/40 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Jobs Recruiter Alert</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Jobs Recruiter Alert Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
