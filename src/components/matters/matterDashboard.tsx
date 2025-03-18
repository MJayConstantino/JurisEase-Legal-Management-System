import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  DollarSign,
  FileText,
  Users,
  Phone,
  Mail,
  MapPin,
  User,
  Briefcase,
  Calendar,
  Gavel,
  Building,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Matter {
  id: string;
  name: string;
  client: string;
  type: string;
  status: string;
  date: string;
  description: string;
  caseNumber?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientAddress?: string;
  assignedAttorney?: string;
  assignedStaff?: string;
  closeDate?: string | null;
  opposingCouncil?: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  court?: {
    name: string;
    phone: string;
    email: string;
    nextHearing: string | null;
  };
}

interface MatterDashboardProps {
  matter: Matter;
}

export function MatterDashboard({ matter }: MatterDashboardProps) {
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

  // Fallback values for missing data
  const caseNumber =
    matter.caseNumber ||
    `${matter.type.substring(0, 2).toUpperCase()}-${matter.id.split("-")[1]}`;
  const clientPhone = matter.clientPhone || "(555) 123-4567";
  const clientEmail =
    matter.clientEmail ||
    matter.client.toLowerCase().replace(" ", ".") + "@example.com";
  const clientAddress =
    matter.clientAddress || "123 Main St, Anytown, CA 94321";
  const assignedAttorney = matter.assignedAttorney || "James Wilson";
  const assignedStaff = matter.assignedStaff || "Sarah Parker";

  const opposingCouncil = matter.opposingCouncil || {
    name: matter.type === "Litigation" ? "Smith & Associates" : "N/A",
    phone: matter.type === "Litigation" ? "(555) 987-6543" : "N/A",
    email: matter.type === "Litigation" ? "contact@smithassociates.com" : "N/A",
    address:
      matter.type === "Litigation" ? "456 Oak Ave, Othertown, CA 94322" : "N/A",
  };

  const court = matter.court || {
    name:
      matter.type === "Litigation"
        ? "Superior Court of California, County of Los Angeles"
        : "N/A",
    phone: matter.type === "Litigation" ? "(213) 555-1212" : "N/A",
    email: matter.type === "Litigation" ? "clerk@lasuperiorcourt.gov" : "N/A",
    nextHearing: matter.type === "Litigation" ? "2023-06-15T10:00:00" : null,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+2.5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Billable Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250.00</div>
            <p className="text-xs text-muted-foreground">
              +$750 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 new documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Attorney, Paralegal, Assistant
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Case Details Section */}
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

      {/* Opposing Council Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Opposing Council</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Client
                </h4>
                <p className="font-medium">{opposingCouncil.name}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{opposingCouncil.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{opposingCouncil.email}</p>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <p>{opposingCouncil.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Court Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>Court Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Court
                </h4>
                <div className="flex items-start">
                  <Building className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                  <p className="font-medium">{court.name}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">
                  Contact Information
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{court.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{court.email}</p>
                  </div>
                </div>
              </div>

              {court.nextHearing && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    Next Hearing
                  </h4>
                  <div className="flex items-center">
                    <Gavel className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{new Date(court.nextHearing).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and activities on this matter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Document Added</p>
                <p className="text-sm text-muted-foreground">
                  Settlement Agreement draft uploaded
                </p>
                <p className="text-xs text-muted-foreground">
                  Today at 10:30 AM
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Time Entry</p>
                <p className="text-sm text-muted-foreground">
                  2.5 hours logged for client consultation
                </p>
                <p className="text-xs text-muted-foreground">
                  Yesterday at 2:15 PM
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Team Update</p>
                <p className="text-sm text-muted-foreground">
                  Jane Smith assigned as paralegal
                </p>
                <p className="text-xs text-muted-foreground">May 10, 2023</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
