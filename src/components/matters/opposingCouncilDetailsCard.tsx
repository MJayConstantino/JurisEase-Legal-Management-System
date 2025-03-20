import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

interface OpposingCouncil {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface OpposingCouncilDetailsCardProps {
  opposingCouncil: OpposingCouncil;
}

function OpposingCouncilDetailsCard({
  opposingCouncil,
}: OpposingCouncilDetailsCardProps) {
  return (
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
    </div>
  );
}

export default OpposingCouncilDetailsCard;
