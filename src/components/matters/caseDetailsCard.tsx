import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, User, Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface Matter {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  date: string;
  description: string;
  closeDate?: string | null;
}

interface CaseDetailsCardProps {
  matter: Matter;
  caseNumber: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  assignedAttorney: string;
  assignedStaff: string;
}

function CaseDetailsCard({
  matter,
  caseNumber,
  clientPhone,
  clientEmail,
  clientAddress,
  assignedAttorney,
  assignedStaff,
}: CaseDetailsCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Case Title
              </h4>
              <p className="font-medium">{matter.name}</p>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Case Number
                </h4>
                <p>{caseNumber}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Status
                </h4>
                <Badge
                  className={getStatusColor(matter.status)}
                  variant="outline"
                >
                  {matter.status.charAt(0).toUpperCase() +
                    matter.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Case Description
              </h4>
              <p>{matter.description}</p>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Open Date
                </h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{new Date(matter.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Close Date
                </h4>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>
                    {matter.closeDate
                      ? new Date(matter.closeDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Client
              </h4>
              <p className="font-medium">{matter.client}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{clientPhone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{clientEmail}</p>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                  <p>{clientAddress}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-6">
              <div className="mb-4 md:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Assigned Attorney
                </h4>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{assignedAttorney}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Assigned Staff
                </h4>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <p>{assignedStaff}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CaseDetailsCard;
