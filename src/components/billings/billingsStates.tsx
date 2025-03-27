import { useState } from "react"
import { BillStatus, PaymentFrequency } from "./billingsBillInterface"
import { Bill } from "./billingsBillInterface"



export function BillingStates(){
    // Add and Edit dialog box 
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [dateBilled, setDateBilled] = useState<Date>(new Date())
    const [status, setStatus] = useState<BillStatus>("Active")
    const [frequencyType, setFrequencyType] = useState<PaymentFrequency["type"]>("Monthly")
    const [customFrequency, setCustomFrequency] = useState("")

    // billing items
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    // billing page
    const [bills, setBills] = useState<Bill[]>([])
    const [filteredBills, setFilteredBills] = useState<Bill[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("all")
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const [isNewBillDialogOpen, setIsNewBillDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    // Spacing here is based on above orientation for easy identification
    return{
        name, setName, amount, setAmount, dateBilled, setDateBilled,status, setStatus,
        frequencyType, setFrequencyType, customFrequency, setCustomFrequency, 
        
        isEditDialogOpen, setIsEditDialogOpen, isDeleteDialogOpen, setIsDeleteDialogOpen,

        bills, setBills, filteredBills, setFilteredBills,searchQuery, setSearchQuery,
        activeTab, setActiveTab, currentDateTime, setCurrentDateTime, isNewBillDialogOpen, 
        setIsNewBillDialogOpen, isLoading, setIsLoading
    }
}