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
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Scrolling Habits",

    // Optional App Info
    appDescription:
      "Track your habits on-chain with beautiful calendar heat maps.",
    appUrl: "https://github.com/rafael-abuawad/scrolling-habits/", // your app's url
    appIcon:
      "https://scroll.io/static/media/Scroll_FullLogo.f99e4b7ab52f474105da.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
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
