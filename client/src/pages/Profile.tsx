import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useRecruiterProfile, useUpdateRecruiterProfile } from "@/hooks/use-recruiter";
import { useAuth } from "@/hooks/use-auth";
import { insertRecruiterProfileSchema, type InsertRecruiterProfile } from "@shared/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function Profile() {
  const { user } = useAuth();
  const { data: profile, isLoading: isProfileLoading } = useRecruiterProfile();
  const updateMutation = useUpdateRecruiterProfile();

  const form = useForm<InsertRecruiterProfile>({
    resolver: zodResolver(insertRecruiterProfileSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      websiteUrl: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        companyName: profile.companyName || "",
        industry: profile.industry || "",
        websiteUrl: profile.websiteUrl || "",
      });
    }
  }, [profile, form]);

  const onSubmit = (data: InsertRecruiterProfile) => {
    updateMutation.mutate(data);
  };

  if (isProfileLoading) {
    return (
      <DashboardLayout>
        <Skeleton className="h-[400px] w-full max-w-2xl rounded-xl" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-display font-bold">Recruiter Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your company details and preferences</p>
        </div>

        <div className="grid gap-6">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Managed via Replit Auth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-border"
                />
                <div>
                  <h3 className="font-bold text-lg">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Profile Form */}
          <Card>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>This information helps us tailor your alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Technology, Healthcare, etc." {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://company.com" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Link to your careers page or company site</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit" disabled={updateMutation.isPending}>
                      {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
