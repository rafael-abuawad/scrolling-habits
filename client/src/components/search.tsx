import { AddHabitButton } from "./add-habit-button";
import { Input } from "./ui/input";

export default function Search() {
  return (
    <div className="flex w-full my-6">
      <div className="grid w-full flex md:grid md:grid-cols-7 items-center gap-4">
        <Input className="md:col-span-6" placeholder="Search" type="email" />
        <div className="md:col-span-1">
          <AddHabitButton />
        </div>
      </div>
    </div>
  );
}
