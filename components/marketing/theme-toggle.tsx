'use client'

import { useTheme } from "next-themes";
import { Button, buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon01Icon, Sun } from "@hugeicons/core-free-icons";
import { VariantProps } from "class-variance-authority";

type ThemeToggleProps = {
  size: VariantProps<typeof buttonVariants>["size"];
};

export default function ThemeToggle({ size }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      size={size}
      variant={"outline"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <HugeiconsIcon icon={Sun} />
      ) : (
        <HugeiconsIcon icon={Moon01Icon} />
      )}
    </Button>
  );
}