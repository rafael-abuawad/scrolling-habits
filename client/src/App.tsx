import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Web3Provider } from "@/components/web3-provider";
import Footer from "@/components/footer";
import Search from "@/components/search";
import Heatmap from "./components/heatmap";
import NoWallet from "./components/no-wallet";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Web3Provider>
          <Header />
          <div className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
            <div className="relative max-w-7xl w-full basis-full px-4 md:px-6 md:px-8 mx-auto">
              <NoWallet></NoWallet>

              <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Habits</h2>
                <p className="text-muted-foreground">
                  Manage your account habits and check your progress.
                </p>
              </div>

              <Search />
              <div className="grid lg:grid-cols-2 gap-4">
                <Heatmap></Heatmap>
                <Heatmap></Heatmap>
                <Heatmap></Heatmap>
                <Heatmap></Heatmap>
              </div>
            </div>
          </div>
          <Footer />
        </Web3Provider>
      </ThemeProvider>
    </>
  );
}
