import { useAlerts, useDeleteAlert, useUpdateAlert } from "@/hooks/use-alerts";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AlertFormDialog } from "@/components/AlertFormDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  MapPin, 
  Clock, 
  Trash2, 
  Edit, 
  Activity, 
  Search,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: alerts, isLoading } = useAlerts();
  const deleteMutation = useDeleteAlert();
  const updateMutation = useUpdateAlert();

  const activeAlerts = alerts?.filter(a => a.isActive).length || 0;
  const totalAlerts = alerts?.length || 0;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="grid gap-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your automated candidate alerts</p>
          </div>
          <AlertFormDialog />
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="dashboard-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <h3 className="text-3xl font-bold mt-2 text-primary">{activeAlerts}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                <h3 className="text-3xl font-bold mt-2">{totalAlerts}</h3>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Matches Found</p>
                <h3 className="text-3xl font-bold mt-2">--</h3>
                <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Alert List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Alerts</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>

          {alerts?.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">No alerts created yet</h3>
              <p className="text-muted-foreground mb-6">Create your first alert to start finding candidates.</p>
              <AlertFormDialog />
            </div>
          ) : (
            <div className="grid gap-4">
              {alerts?.map((alert) => (
                <div 
                  key={alert.id} 
                  className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6 group"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg">{alert.keywords}</h3>
                      <Badge variant={alert.isActive ? "default" : "secondary"}>
                        {alert.isActive ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      {alert.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {alert.location}
                        </div>
                      )}
                      <div className="flex items-center gap-1 capitalize">
                        <Clock className="w-4 h-4" /> {alert.frequency}
                      </div>
                      <div>
                        Created {format(new Date(alert.createdAt), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-6">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={alert.isActive}
                        onCheckedChange={(checked) => updateMutation.mutate({ id: alert.id, isActive: checked })}
                      />
                      <span className="text-sm text-muted-foreground md:hidden lg:inline">
                        {alert.isActive ? "On" : "Off"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <AlertFormDialog 
                        alert={alert}
                        trigger={
                          <Button variant="ghost" size="icon" className="hover:text-primary">
                            <Edit className="w-4 h-4" />
                          </Button>
                        }
                      />
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Alert?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove the alert for "{alert.keywords}". This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteMutation.mutate(alert.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
