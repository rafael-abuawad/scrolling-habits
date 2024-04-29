import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AddHabitButton } from "./add-habit-button";
import { LucideRefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

export interface NoHabitsProps {
  onHabitCreated: () => void;
}

export default function NoHabits(props: NoHabitsProps) {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>You haven't created any habits</CardTitle>
        <CardDescription>
          Go ahead and create your first habbit!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="w-full flex justify-center items-center space-x-2">
          <Button onClick={props.onHabitCreated}>
            <LucideRefreshCcw />
          </Button>
          <AddHabitButton onHabitCreated={props.onHabitCreated} />
        </div>
      </CardFooter>
    </Card>
  );
}
