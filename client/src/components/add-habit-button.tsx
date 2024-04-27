import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import NewHabitForm from "./new-habit-form";

export function AddHabitButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus /> Add Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
          <DialogDescription>
            Add a new habit to your collection.
          </DialogDescription>
        </DialogHeader>
        <NewHabitForm></NewHabitForm>
      </DialogContent>
    </Dialog>
  );
}
