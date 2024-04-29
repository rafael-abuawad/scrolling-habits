import { useAccount, useReadContract, useWriteContract } from "wagmi";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "./ui/card";
import { ResponsiveTimeRange } from "@nivo/calendar";
import { wagmiContractConfig } from "@/lib/contracts";
import { timestampToDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Loader2, LucideRefreshCcw } from "lucide-react";

export interface Entry {
  value: number;
  day: string;
}

export interface Habit {
  title: string;
  metric: string;
  entries: Entry[];
}

export interface HabitCardProps {
  tokenId: bigint;
}

// https://nivo.rocks/time-range/
export default function HabitCard({ tokenId }: HabitCardProps) {
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const { data: habit } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getHabit",
    args: [BigInt(tokenId)],
    account: address,
  });
  const { data: entries, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getEntries",
    args: [BigInt(tokenId)],
    account: address,
  });
  const { data: canAddEntry, refetch: canAddEntryRefetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "canAddNewEntry",
    args: [BigInt(tokenId)],
    account: address,
  });
  const { writeContractAsync, isPending } = useWriteContract();

  async function addEntry() {
    if (habit?.metric == "") {
      await writeContractAsync(
        {
          ...wagmiContractConfig,
          functionName: "entry",
          args: [BigInt(tokenId)],
        },
        {
          onSuccess() {
            refetch();
            canAddEntryRefetch();
            setAmount(0);
          },
        },
      );
    } else {
      await writeContractAsync(
        {
          ...wagmiContractConfig,
          functionName: "entry",
          args: [BigInt(tokenId), BigInt(amount)],
        },
        {
          onSuccess() {
            refetch();
            canAddEntryRefetch();
            setAmount(0);
          },
        },
      );
    }
  }

  function reloadAllQueries() {
    refetch();
    canAddEntryRefetch();
  }

  if (habit == undefined) {
    return (
      <>
        <div className="flex flex-row space-x-2 text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading habit...</span>
        </div>
      </>
    );
  }

  if (entries == undefined) {
    return (
      <>
        <div className="flex flex-row space-x-2 text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading habit...</span>
        </div>
      </>
    );
  }

  return (
    <Card className="h-full w-full max-w-2xl dark:bg-white">
      <CardHeader className="flex flex-row">
        <div className="grid gap-1.5">
          <CardTitle>{habit.title}</CardTitle>
          {habit.metric !== "" && (
            <CardDescription>
              {" "}
              This habit is measured in <b>{habit.metric}</b>
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video flex items-center">
          <ResponsiveTimeRange
            data={entries.map((entry) => ({
              value: Number(entry.amount),
              day: timestampToDate(entry.timestamp),
            }))}
            from="2024-01-01"
            to="2024-08-31"
            emptyColor="#eeeeee"
            colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            weekdayTicks={[1, 3, 5]}
            weekdayLegendOffset={1}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "row",
                justify: true,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 42,
                itemsSpacing: 14,
                itemDirection: "right-to-left",
              },
            ]}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row space-x-2">
          {habit.metric !== "" && canAddEntry && (
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.valueAsNumber))}
              placeholder={habit.metric}
            />
          )}
          <Button onClick={addEntry} disabled={!canAddEntry || isPending}>
            {isPending && (
              <span className="flex flex-row space-x-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing transaction
              </span>
            )}
            {!isPending && "Add entry"}
          </Button>
          <Button onClick={reloadAllQueries}>
            <LucideRefreshCcw />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
