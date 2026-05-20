import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface PricingCardProps {
  className?: string;
  plan: string;
  price: number;
  description: string;
  features: {
    text: string | undefined,
    included: boolean,
  }[];
  btnClassName?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  titleBtn: string;
}

export default function PricingCard({
  className,
  plan,
  price,
  description,
  btnClassName,
  features,
  variant,
  titleBtn,
}: PricingCardProps) {
  return (
    <>
      <div className={cn("border rounded-xl p-6", className)}>
        <div className="text-xs bg-emerald-50 dark:bg-emerald-950 text-emerald-600 px-3 py-1 rounded-full inline-block mb-4">
          {plan}
        </div>
        <div className="text-3xl font-medium mb-1">
          ${price}{" "}
          <span className="text-sm text-muted-foreground font-normal">
            /month
          </span>
        </div>
        <div className="text-xs text-muted-foreground mb-6">
          {description}
          {/* for teams and growing products */}
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "text-xs flex items-center gap-2 transition-colors",
                feature.included
                  ? "text-muted-foreground"
                  : "text-muted-foreground/40",
              )}
            >
              {feature.included ? (
                <span className="text-emerald-600">✓</span>
              ) : (
                <span>
                  ✕
                </span>
              )}
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
        <Button
          className={cn("w-full", btnClassName)}
          variant={variant}
          asChild
        >
          <Link href="/register">{titleBtn}</Link>
        </Button>
      </div>
    </>
  );
}
