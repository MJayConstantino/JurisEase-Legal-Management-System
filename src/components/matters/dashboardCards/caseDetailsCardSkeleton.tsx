import { Calendar, Phone, Mail, MapPin, User, Briefcase } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { EditableCard } from "../editableCard";

export function CaseDetailsCardSkeleton() {
  return (
    <EditableCard title="Case Details" editable={false}>
      <div className="space-y-6">
        {/* Main info skeleton */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Case Title
            </h4>
            <Skeleton className="h-6 w-3/4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Case Number
              </h4>
              <Skeleton className="h-6 w-full" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </h4>
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Case Description
            </h4>
            <Skeleton className="h-6 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Open Date
              </h4>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Close Date
              </h4>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Client info skeleton */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            Client Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm text-muted-foreground mb-1">
                Client Name
              </h5>
              <Skeleton className="h-6 w-full" />
            </div>

            <div className="space-y-2">
              <h5 className="text-sm text-muted-foreground mb-1">
                Client Contact Information
              </h5>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Assignment skeleton */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            Case Assignment
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm text-muted-foreground mb-1">
                Assigned Attorney
              </h5>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
            <div>
              <h5 className="text-sm text-muted-foreground mb-1">
                Assigned Staff
              </h5>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableCard>
  );
}
