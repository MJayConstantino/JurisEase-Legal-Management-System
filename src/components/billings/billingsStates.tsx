"use client"

import { useState } from "react"
import { Bill, BillStatus, SortDirection, SortField, StatusFilter, TimeFilter } from  "@/types/billing.type"
import { Matter } from "@/types/matter.type"
import { format } from "date-fns"


export function BillingStates(){
    // Add and Edit
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [created_at, setCreated_at] = useState<Date>(new Date())
    const [status, setStatus] = useState<BillStatus>(BillStatus.unpaid)
    const [remarks, setRemarks] = useState("")
    const [matter_id, setMatterId] = useState("")
    const [dateString, setDateString] = useState(format(new Date(), "yyyy-MM-dd"))
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [negativeAmountError, setNegativeAmountError] = useState(false)
    const [isMaxFieldError, setIsMaxFieldError] = useState(false)
    const [visibleMatters, setVisibleMatters] = useState<Matter[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [nameError, setNameError] = useState(false)
    const [amountError, setAmountError] = useState(false)
    const [matterError, setMatterError] = useState(false)

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
    const [matters, setMatters] = useState<Matter[]>([])
    const [selectedMatterId, setSelectedMatterId] = useState<string | null>(null)
    const [currentMatter, setCurrentMatter] = useState<Matter | null>(null)

    // matter-billing page
    const [isLoadingMatters, setIsLoadingMatters] = useState(true)
    const [isLoadingBills, setIsLoadingBills] = useState(false)

    return{
        name, setName, remarks, setRemarks, amount, setAmount, created_at, setCreated_at, 
        status, setStatus, matter_id, setMatterId, dateString, setDateString, isSubmitting, 
        setIsSubmitting, visibleMatters, setVisibleMatters, currentPage, setCurrentPage,
        isMaxFieldError, setIsMaxFieldError, nameError, setNameError, amountError, setAmountError,
        matterError, setMatterError, negativeAmountError, setNegativeAmountError,
        
        isEditDialogOpen, setIsEditDialogOpen, isDeleteDialogOpen, setIsDeleteDialogOpen,

        isDropdownOpen, setIsDropdownOpen,

        bills, setBills, filteredBills, setFilteredBills, currentDateTime, setCurrentDateTime, isNewBillDialogOpen, 
        setIsNewBillDialogOpen, isLoading, setIsLoading, timeFilter, setTimeFilter, sortField, setSortField, sortDirection, setSortDirection,
        statusFilter, setStatusFilter, matters, setMatters, selectedMatterId, setSelectedMatterId, currentMatter, setCurrentMatter,

        isLoadingMatters, setIsLoadingMatters, isLoadingBills, setIsLoadingBills
    }
}