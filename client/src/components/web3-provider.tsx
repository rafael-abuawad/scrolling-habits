import { WagmiProvider, createConfig } from "wagmi";
import { scrollSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [scrollSepolia],

    // Required API Keys
    walletConnectProjectId: "5770b42c91b106a9dff9a62d88e57225",

    // Required App Info
    appName: "Scrolling Habits",

    // Optional App Info
    appDescription:
      "Track your habits on-chain with beautiful calendar heat maps.",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export interface Web3ProviderProps {
  children?: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
