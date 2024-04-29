import { useAccount, useReadContract } from "wagmi";
import NoWallet from "./no-wallet";
import { wagmiContractConfig } from "@/lib/contracts";
import Search from "./search";
import HabitCard from "./habit-card";
import NoHabits from "./no-habits";
import { Loader2 } from "lucide-react";

export default function AppContainer() {
  const { address, isConnected } = useAccount();
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getHabitsIDs",
    account: address,
  });

  if (isConnected) {
    if (data == undefined || data.length == 0) {
      return <NoHabits />;
    }

    if (isLoading) {
      return (
        <>
          <div className="flex space-x-2">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
            transaction
          </div>
        </>
      );
    }

    return (
      <>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Habits</h2>
          <p className="text-muted-foreground">
            Manage your account habits and check your progress. Remember <b>you can only add one entry per habit per day.</b>
          </p>
        </div>
        <Search onHabitCreated={refetch} refetch={refetch} />
        <div className="grid lg:grid-cols-2 gap-4">
          {data.map((tokenId) => (
            <HabitCard key={tokenId} tokenId={tokenId} />
          ))}
        </div>
      </>
    );
  }
  return <NoWallet />;
}
