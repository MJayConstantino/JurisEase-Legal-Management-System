import { useCallback, useMemo } from "react";
import type {
    Bill,
    SortDirection,
    SortField
} from "@/types/billing.type";
import { BillingStates } from "./billingsStates";
import { startOfWeek, endOfWeek, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { format } from "path";



export function BillingsFunctions(){
    const {
        bills,
        filteredBills,
        sortField,
        setSortField,
        setSortDirection,
        matters,
        setSelectedMatterId,
    } = BillingStates();


    const sortBills = useCallback(
        (billsToSort: Bill[], field: SortField, direction: SortDirection) => {
          return [...billsToSort].sort((a, b) => {
            let comparison = 0;
    
            switch (field) {
              case "matterName":
                const matterA =
                  matters.find((m) => m.matter_id === a.matter_id)?.name || "";
                const matterB =
                  matters.find((m) => m.matter_id === b.matter_id)?.name || "";
                comparison = matterA.localeCompare(matterB);
                break;
              case "name":
                comparison = a.name.localeCompare(b.name);
                break;
              case "amount":
                comparison = a.amount - b.amount;
                break;
              case "created_at":
                comparison =
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime();
                break;
              case "status":
                comparison = a.status.localeCompare(b.status);
                break;
              case "remarks":
                comparison = (a.remarks || "").localeCompare(b.remarks || "");
                break;
            }
    
            return direction === "asc" ? comparison : -comparison;
          });
        },
        [matters]
      );



      
  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleMatterFilterChange = (matterId: string) => {
    setSelectedMatterId(matterId === "all" ? null : matterId);
  };

  const totalRevenue = useMemo(() => {
    return filteredBills.reduce((sum, bill) => sum + Number(bill.amount), 0);
  }, [filteredBills]);

  const todayRevenue = useMemo(() => {
    const today = new Date();
    return bills
      .filter((bill) => {
        const billDate = new Date(bill.created_at);
        return format(billDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
      })
      .reduce((sum, bill) => sum + Number(bill.amount), 0);
  }, [bills]);

  const weekRevenue = useMemo(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);

    return bills
      .filter((bill) => {
        const billDate = new Date(bill.created_at);
        return isWithinInterval(billDate, { start: weekStart, end: weekEnd });
      })
      .reduce((sum, bill) => sum + Number(bill.amount), 0);
  }, [bills]);

  const monthRevenue = useMemo(() => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);

    return bills
      .filter((bill) => {
        const billDate = new Date(bill.created_at);
        return isWithinInterval(billDate, { start: monthStart, end: monthEnd });
      })
      .reduce((sum, bill) => sum + Number(bill.amount), 0);
  }, [bills]);

    return{sortBills, handleSortChange, handleMatterFilterChange, totalRevenue, todayRevenue, weekRevenue, monthRevenue}
}