'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createMatter } from '@/actions/matters'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GetFormSteps } from '@/components/matters/formSteps/getFormSteps'

interface AddMatterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMatterDialog({ open, onOpenChange }: AddMatterDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [matterData, setMatterData] = useState({
    name: '',
    client: '',
    status: 'open',
    description: '',
    created_at: new Date().toISOString(),
    date_opened: new Date().toISOString().split('T')[0],
    case_number: '',
    client_phone: '',
    client_email: '',
    client_address: '',
    assigned_attorney: '',
    assigned_staff: '',
    opposing_council: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
    court: {
      name: '',
      phone: '',
      email: '',
    },
  })

  const handleChange = (field: string, value: string) => {
    setMatterData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (parent: string, field: string, value: string) => {
    setMatterData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const form = e?.currentTarget as HTMLFormElement
    if (form && !form.checkValidity()) {
      return
    }
    setIsSubmitting(true)

    try {
      await createMatter({ ...matterData })
      toast.success('New matter has been created successfully.')

      // Reset form
      setMatterData({
        name: '',
        client: '',
        status: 'open',
        description: '',
        created_at: new Date().toISOString(),
        date_opened: new Date().toISOString().split('T')[0],
        case_number: '',
        client_phone: '',
        client_email: '',
        client_address: '',
        assigned_attorney: '',
        assigned_staff: '',
        opposing_council: {
          name: '',
          phone: '',
          email: '',
          address: '',
        },
        court: {
          name: '',
          phone: '',
          email: '',
        },
      })
      setCurrentStep(0)
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to create matter. Please try again.' + error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formSteps = GetFormSteps(matterData, handleChange, handleNestedChange)

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isLastStep = currentStep === formSteps.length - 1
  const isFirstStep = currentStep === 0

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          setTimeout(() => setCurrentStep(0), 300)
        }
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Matter</DialogTitle>
          <DialogDescription>
            Create a new legal matter or case for your client.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              {formSteps[currentStep].title}
            </h3>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {formSteps.length}
            </div>
          </div>

          <div className="min-h-[300px]">
            {formSteps[currentStep].component}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isFirstStep}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>

              {isLastStep ? (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Matter'}
                </Button>
              ) : (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
