import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Gavel, Building } from "lucide-react";
import React from "react";

interface CourtDetailsCardProps {
  court: {
    name: string;
    phone: string;
    email: string;
    nextHearing: string | null;
  };
}

function CourtDetailsCard({ court }: CourtDetailsCardProps) {
  return (
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
  );
}

export default CourtDetailsCard;
