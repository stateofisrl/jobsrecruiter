import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type UpdateRecruiterProfileRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useRecruiterProfile() {
  return useQuery({
    queryKey: [api.recruiter.get.path],
    queryFn: async () => {
      const res = await fetch(api.recruiter.get.path, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch profile");
      return api.recruiter.get.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateRecruiterProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (updates: UpdateRecruiterProfileRequest) => {
      const validated = api.recruiter.update.input.parse(updates);
      const res = await fetch(api.recruiter.update.path, {
        method: api.recruiter.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update profile");
      }
      return api.recruiter.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.recruiter.get.path] });
      toast({ title: "Success", description: "Profile updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
