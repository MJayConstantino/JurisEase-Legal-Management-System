// Compiled here are all the useState functions used in billings 

import { useState } from "react"
import { Bill, BillStatus, Client, PaymentFrequency, SortDirection, SortField, StatusFilter, TimeFilter } from  "@/types/billing.type"

// temporary
const mockClients: Client[] = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Wayne Enterprises" },
  { id: "3", name: "Stark Industries" },
  { id: "4", name: "Umbrella Corporation" },
]

export function BillingStates(){
    // Add and Edit
    const [clientId, setClientId] = useState("")
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [dateBilled, setDateBilled] = useState<Date>(new Date())
    const [status, setStatus] = useState<BillStatus>("Active")
    const [frequencyType, setFrequencyType] = useState<PaymentFrequency["type"]>("Monthly")
    const [customFrequency, setCustomFrequency] = useState("")


    // billing items
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // billing list header
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    // billing page
    const [bills, setBills] = useState<Bill[]>([])
    const [clients, setClients] = useState<Client[]>(mockClients)
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
        name, setName, clientId, setClientId, amount, setAmount, dateBilled, setDateBilled, 
        status, setStatus, frequencyType, setFrequencyType, customFrequency, setCustomFrequency, 
        
        isEditDialogOpen, setIsEditDialogOpen, isDeleteDialogOpen, setIsDeleteDialogOpen,

        isDropdownOpen, setIsDropdownOpen,

        bills, setBills, filteredBills, setFilteredBills, clients, setClients, currentDateTime, setCurrentDateTime, isNewBillDialogOpen, 
        setIsNewBillDialogOpen, isLoading, setIsLoading, timeFilter, setTimeFilter, sortField, setSortField, sortDirection, setSortDirection,
        statusFilter, setStatusFilter
    }
}