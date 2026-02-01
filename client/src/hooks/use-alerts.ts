import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateAlertRequest, type UpdateAlertRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useAlerts() {
  return useQuery({
    queryKey: [api.alerts.list.path],
    queryFn: async () => {
      const res = await fetch(api.alerts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch alerts");
      return api.alerts.list.responses[200].parse(await res.json());
    },
  });
}

export function useAlert(id: number) {
  return useQuery({
    queryKey: [api.alerts.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.alerts.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch alert");
      return api.alerts.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateAlert() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateAlertRequest) => {
      // Ensure frequency is valid enum string if necessary, but schema handles text
      const validated = api.alerts.create.input.parse(data);
      const res = await fetch(api.alerts.create.path, {
        method: api.alerts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.alerts.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create alert");
      }
      return api.alerts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.alerts.list.path] });
      toast({ title: "Success", description: "Job alert created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}

export function useUpdateAlert() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & UpdateAlertRequest) => {
      const validated = api.alerts.update.input.parse(updates);
      const url = buildUrl(api.alerts.update.path, { id });
      
      const res = await fetch(url, {
        method: api.alerts.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 404) throw new Error("Alert not found");
        const error = await res.json();
        throw new Error(error.message || "Failed to update alert");
      }
      return api.alerts.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.alerts.list.path] });
      toast({ title: "Updated", description: "Alert preferences updated" });
    },
    onError: (error) => {
      toast({ title: "Update Failed", description: error.message, variant: "destructive" });
    },
  });
}

export function useDeleteAlert() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.alerts.delete.path, { id });
      const res = await fetch(url, { 
        method: api.alerts.delete.method, 
        credentials: "include" 
      });
      
      if (!res.ok) throw new Error("Failed to delete alert");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.alerts.list.path] });
      toast({ title: "Deleted", description: "Alert removed successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
