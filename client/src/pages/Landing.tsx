import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check, Bell, Search, Users, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Bell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">RecruiterAlert</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Button onClick={() => window.location.href = "/api/login"} size="lg" className="font-semibold shadow-md">
                Login with Replit
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
              Find top talent <br />
              <span className="text-primary">before they're gone</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Automated candidate tracking that sends you instant alerts when new talent matches your criteria. Never miss a perfect hire again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="xl" 
                className="h-14 px-8 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
                onClick={() => window.location.href = "/api/login"}
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="pt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" /> Instant setup
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
            {/* Abstract Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
            
            {/* Hero Image Card */}
            <div className="relative bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="p-4 border-b border-border/50 bg-muted/30 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-background border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                      <div className="h-3 w-20 bg-slate-100 rounded" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      Matched
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-xl border border-border/40 animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">New Match Found</p>
                    <p className="text-xs text-muted-foreground">Senior React Dev</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50/50 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Why top recruiters choose us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Streamline your sourcing process with intelligent automation that works 24/7.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Keyword Matching",
                description: "Define complex boolean strings and let our engine find candidates that exactly match your requirements."
              },
              {
                icon: Bell,
                title: "Instant Notifications",
                description: "Get notified the moment a qualified candidate appears on the market via email or Slack."
              },
              {
                icon: Users,
                title: "Talent Pipeline",
                description: "Automatically build a pipeline of qualified candidates while you sleep. Review them in your dashboard."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-border/40 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jobs Recruiter Alert. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
