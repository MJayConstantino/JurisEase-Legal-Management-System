// Compiled here are all the useState functions used in billings 

import { useState } from "react"
import { Bill, BillStatus, SortDirection, SortField, StatusFilter, TimeFilter } from  "@/types/billing.type"


export function BillingStates(){
    // Add and Edit
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [created_at, setCreated_at] = useState<Date>(new Date())
    const [status, setStatus] = useState<BillStatus>("Active")
    const [remarks, setRemarks] = useState("")


    // billing items
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // billing list header
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // billing page
    const [bills, setBills] = useState<Bill[]>([])
    const [filteredBills, setFilteredBills] = useState<Bill[]>([])
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("all")
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const [isNewBillDialogOpen, setIsNewBillDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sortField, setSortField] = useState<SortField | null>(null)
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

    // Spacing here is based on above orientation for easy identification
    return{
        name, setName, remarks, setRemarks, amount, setAmount, created_at, setCreated_at, 
        status, setStatus,
        
        isEditDialogOpen, setIsEditDialogOpen, isDeleteDialogOpen, setIsDeleteDialogOpen,

        isDropdownOpen, setIsDropdownOpen,

        bills, setBills, filteredBills, setFilteredBills, currentDateTime, setCurrentDateTime, isNewBillDialogOpen, 
        setIsNewBillDialogOpen, isLoading, setIsLoading, timeFilter, setTimeFilter, sortField, setSortField, sortDirection, setSortDirection,
        statusFilter, setStatusFilter
    }
}