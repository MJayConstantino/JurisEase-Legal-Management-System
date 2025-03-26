
function EditButton(){
    return(
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

    )
} 

function DeleteButton(){
    return(
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
    )
}

function NewBillButton(){
    return(
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
function SaveButton({ saveIsLoading }: { saveIsLoading: any}){
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
function CancelButton({ showDialogStatus }: { showDialogStatus : any}){
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