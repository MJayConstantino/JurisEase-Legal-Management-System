"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useCallback } from "react";
import { BillingsAddDialog } from "@/components/billings/billingsAddDialog";
import { BillingsListHeader } from "@/components/billings/billingsListHeader";
import { BillingsList } from "@/components/billings/billingsList";
import { BillingStates } from "@/components/billings/billingsStates";
import type {
  Bill,
  SortDirection,
  SortField,
  StatusFilter,
} from "@/types/billing.type";
import { getMatters } from "@/actions/matters";
import {
  createBill as addBillToDb,
  updateBill as updateBillInDb,
  deleteBill as deleteBillFromDb,
  getBillsByMatterId,
} from "@/actions/billing";
import { toast } from "sonner";

export function MatterBillingPage() {
  const {
    bills,
    setBills,
    filteredBills,
    setFilteredBills,
    setCurrentDateTime,
    isNewBillDialogOpen,
    setIsNewBillDialogOpen,
    isLoading,
    setIsLoading,
    timeFilter,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    statusFilter,
    setStatusFilter,
    matters,
    setMatters,
    selectedMatterId,
  } = BillingStates();

  const params = useParams();
  const paramsMatterId = params.matterId as string;

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [billsData, mattersData] = await Promise.all([
          getBillsByMatterId(paramsMatterId),
          getMatters(),
        ]);
        setBills(billsData);
        setMatters(mattersData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [setBills, setIsLoading, setMatters, paramsMatterId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, [setCurrentDateTime]);

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

  useEffect(() => {
    let result = [...bills];

    if (statusFilter !== "all") {
      const statusMap: Record<StatusFilter, string> = {
        all: "",
        active: "active",
        paid: "paid",
        pending: "pending",
        overdue: "overdue",
      };

      const filterStatus = statusMap[statusFilter];
      if (filterStatus) {
        result = result.filter((bill) => bill.status === filterStatus);
      }
    }

    if (sortField) {
      result = sortBills(result, sortField, sortDirection);
    }

    setFilteredBills(result);
  }, [
    bills,
    timeFilter,
    statusFilter,
    sortField,
    sortDirection,
    selectedMatterId,
    setFilteredBills,
    sortBills,
  ]);

  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const addBill = async (bill: Omit<Bill, "bill_id">) => {
    setIsLoading(true);
    try {
      const newBill = await addBillToDb(bill);
      if (newBill) {
        setBills((prev) => [...prev, newBill]);
      }
      toast.success("Bill added successfully.");
    } catch (error) {
      console.error("Failed to add bill:", error);
      toast.error("Failed to add bill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateBill = async (updatedBill: Bill) => {
    setIsLoading(true);
    try {
      const result = await updateBillInDb(updatedBill);
      if (result) {
        setBills((prev) =>
          prev.map((bill) =>
            bill.bill_id === updatedBill.bill_id ? updatedBill : bill
          )
        );
      }
      toast.success("Bill updated successfully.");
    } catch (error) {
      console.error("Failed to update bill:", error);
      toast.error("Failed to update bill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBill = async (id: string) => {
    setIsLoading(true);
    try {
      const success = await deleteBillFromDb(id);
      if (success) {
        setBills((prev) => prev.filter((bill) => bill.bill_id !== id));
      }
      toast.success("Bill deleted successfully.");
    } catch (error) {
      console.error("Failed to delete bill:", error);
      toast.error("Failed to delete bill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="pb-4 md:pb-8 px-0 pt-0 overflow-auto">
      <div className="max-w-auto mx-auto">
        <div className="border dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 mt-0">
          <BillingsListHeader
            statusFilter={"all"}
            onStatusFilterChange={setStatusFilter}
            onNewBill={() => setIsNewBillDialogOpen(true)}
            matters={matters}
            selectedMatterId={paramsMatterId}
            onMatterFilterChange={() => {}}
            hideMatterFilter={true}
          />

          <div className="max-h-[600px] overflow-y-auto">
            <BillingsList
              bills={filteredBills}
              matters={matters}
              onUpdate={updateBill}
              onDelete={deleteBill}
              isLoading={isLoading}
              sortField={sortField}
              onSortChange={handleSortChange}
              hideMatterColumn={true}
            />
          </div>
        </div>

        <BillingsAddDialog
          open={isNewBillDialogOpen}
          onOpenChange={setIsNewBillDialogOpen}
          onSave={addBill}
          matters={matters}
          disableMatterColumn={true}
          matterBillingMatterId={paramsMatterId}
        />
      </div>
    </div>
  );
}
