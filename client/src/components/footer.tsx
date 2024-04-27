import { Github, Linkedin, TwitterIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center">
        <div>
          <span
            className="flex-none text-xl font-semibold text-black dark:text-white"
            aria-label="📜Scrolling Habits"
          >
            📜 Scrolling Habits
          </span>
        </div>

        <div className="mt-3">
          <p className="text-gray-500 dark:text-neutral-500">
            Developed by{" "}
            <Button asChild variant="link" className="px-0">
              <a href="https://twitter.com/rabuawad_" target="_blank">
                Rafael Abuawad
              </a>
            </Button>
          </p>
          <p className="text-gray-500 dark:text-neutral-500 text-md">
            Free & Open Source, you can learn more about it{" "}
            <Button asChild variant="link" className="px-0">
              <a
                href="https://github.com/rafael-abuawad/scrolling-habits/"
                target="_blank"
              >
                here
              </a>
            </Button>
            .
          </p>
        </div>

        <div className="mt-3 space-x-2">
          <a
            className="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            href="https://github.com/rafael-abuawad/"
            target="_blank"
          >
            <Github />
          </a>
          <a
            className="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            href="https://www.linkedin.com/in/rafael-abuawad-vivanco-783648260/"
            target="_blank"
          >
            <Linkedin />
          </a>
          <a
            className="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700"
            href="https://twitter.com/rabuawad_"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
