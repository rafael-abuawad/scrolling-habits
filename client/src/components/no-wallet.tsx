import { ConnectKitButton } from "connectkit";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function NoWallet() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle>No Wallet Connected</CardTitle>
        <CardDescription>
          Connect your wallet to interact with application.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="w-full flex justify-center items-center">
          <ConnectKitButton theme="soft" />
        </div>
      </CardFooter>
    </Card>
  );
}
