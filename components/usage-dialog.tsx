import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"


export function UsageDialog({open}: {open: boolean}) {
  return (
    <Dialog open={open} onOpenChange={() => window.location.reload()}>
      <DialogContent className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Usage Limit Reached</DialogTitle>
          <DialogDescription>
            Unfortunately Functionaizer has hit its daily usage limit. Either try again tomorrow, or download the project and run locally, see <a className="text-blue-600 underline" href="https://github.com/johnpolacek/functionaizer">the project page</a> for instructions.
          </DialogDescription>
        </DialogHeader>
        <Button className="px-16 mt-4 block" onClick={() => window.location.reload()}>OK</Button>
      </DialogContent>
    </Dialog>
  )
}
