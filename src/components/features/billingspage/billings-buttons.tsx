import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const handleEditClick = () => {
  console.log("Edit button clicked!");
};
const handleDeleteClick = () => {
  console.log("Delete button clicked!");
};

function EditButton(){
    return(
        <button className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                  <path d="m15 5 4 4"></path>
                </svg>
        </button>
    )
} 

function DeleteButton(){
    return(
        <button className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
        </button>
    )
}

function NewBillButton(){
    return(
        <Button className="bg-[#2E2A5C] hover:bg-[#3D3878] text-white flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New Bill
        </Button>
    )
}

export {EditButton, DeleteButton, NewBillButton}