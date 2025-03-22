
function EditButton(){
    return(
      <button
        className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]"
      >
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
      <button
        className="p-2 rounded-md text-[#2E2A5C] hover:bg-[#E8E4FF]"
      >
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
      <div className="hidden md:flex justify-end p-4">
        <button
          onClick={() => router.push("/?action=add")}
          className="bg-[#2E2A5C] hover:bg-[#3D3878] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
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
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
          New Bill
        </button>
      </div>
    )
}

function NewBillButtonMobile(){
  return(
    <div>
      <button
        className="bg-[#2E2A5C] hover:bg-[#3D3878] text-white px-4 py-2 rounded-md flex items-center gap-2"
      >
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
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
        New Bill
      </button>


      <button
        onClick={() => router.push("/?action=add")}
        className="md:hidden fixed bottom-6 right-6 bg-[#2E2A5C] hover:bg-[#3D3878] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      </button>
    </div>

    
  )
}

function CloseButton(){
  return(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  )
}
function SaveButton({ saveIsLoading }: { saveIsLoading:(value: boolean) => boolean }){
  return(
    <button
      type="submit"
      disabled={saveIsLoading}
      className="px-4 py-2 bg-[#2E2A5C] text-white rounded-md hover:bg-[#3D3878] disabled:opacity-50"
    >
      {saveIsLoading ? "Saving..." : "Save"}
    </button>
  )
}
function CancelButton({ showDialogStatus }: { showDialogStatus:(value: boolean) => void }){
  return(
    <button
      type="button"
      onClick={() => showDialogStatus(false)}
      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
    >
      Cancel
    </button>
  )
}

export {EditButton, DeleteButton, NewBillButton, CloseButton, SaveButton, CancelButton}