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
import { useState } from "react";

export interface AddHabitButtonProps {
  onHabitCreated: () => void;
}

export function AddHabitButton(props: AddHabitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleHabitCreated() {
    setIsOpen(false);
    props.onHabitCreated();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
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
        <NewHabitForm onHabitCreated={handleHabitCreated} />
      </DialogContent>
    </Dialog>
  );
}
