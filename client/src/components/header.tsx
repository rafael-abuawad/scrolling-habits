import { ConnectKitButton } from "connectkit";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
        <nav
          className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 md:px-8 mx-auto"
          aria-label="Global"
        >
          <div className="md:col-span-3">
            <h1
              className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
              aria-label="Preline"
            >
              📜 Scrolling Habits
            </h1>
          </div>

          <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
            <ConnectKitButton theme="soft" />
          </div>

          <div className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"></div>
        </nav>
      </header>
      <Separator />
    </>
  );
}
