import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Web3Provider } from "@/components/web3-provider";
import Footer from "@/components/footer";
import AppContainer from "./components/app-container";

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Web3Provider>
          <Header />
          <div className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
            <div className="relative max-w-7xl w-full basis-full px-4 md:px-8 mx-auto">
              <AppContainer />
            </div>
          </div>
          <Footer />
        </Web3Provider>
      </ThemeProvider>
    </>
  );
}
