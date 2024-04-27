import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AddHabitButton } from "./add-habit-button";

export default function NoHabits() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>You haven't created any habits</CardTitle>
        <CardDescription>
          Go ahead and create your first habbit!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="w-full flex justify-center items-center">
          <AddHabitButton onHabitCreated={() => {}} />
        </div>
      </CardFooter>
    </Card>
  );
}
