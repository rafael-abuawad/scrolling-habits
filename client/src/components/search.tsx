import { LucideRefreshCcw } from "lucide-react";
import { AddHabitButton } from "./add-habit-button";
import { Button } from "./ui/button";

export interface SearchProps {
  onHabitCreated: () => void;
  refetch: () => void;
}

export default function Search(props: SearchProps) {
  return (
    <div className="flex w-full my-6">
      <div className="w-full flex flex-row justify-end space-x-2">
        <Button onClick={props.refetch}>
          <LucideRefreshCcw />
        </Button>
        <AddHabitButton onHabitCreated={props.onHabitCreated} />
      </div>
    </div>
  );
}
