import { AddHabitButton } from "./add-habit-button";

export interface SearchProps {
  onHabitCreated: (hash: `0x${string}` | undefined) => void;
}

export default function Search(props: SearchProps) {
  return (
    <div className="flex w-full my-6">
      <div className="w-full flex md:grid md:grid-cols-8 items-center gap-4">
        <div className="md:col-start-8 md:col-span-2 w-full">
          <AddHabitButton onHabitCreated={props.onHabitCreated} />
        </div>
      </div>
    </div>
  );
}
