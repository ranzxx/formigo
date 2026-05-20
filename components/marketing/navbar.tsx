import Link from "next/link";
import { Button } from "../ui/button";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-border">
      <div className="font-semibold text-lg">
        formigo<span className="text-emerald-600">.</span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle size={'icon'} />
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">sign in</Link>
        </Button>
        <Button
          size="sm"
          className="bg-emerald-600 hover:bg-emerald-700"
          asChild
        >
          <Link href="/register">get started</Link>
        </Button>
      </div>
    </nav>
  );
}
