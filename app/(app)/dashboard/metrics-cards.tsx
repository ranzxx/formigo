import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function MetricsCards({ title, value, icon, children, className }: MetricsCardProps) {
    return (
        <Card className={cn("bg-card text-card-foreground border-border p-6 flex flex-col gap-4 shadow-sm transition-all hover:bg-muted/50", className)}>
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <span className="text-sm font-medium">{title}</span>
            </div>
          <div className="flex items-end justify-between relative z-10">
            <div className="text-3xl font-bold text-foreground tracking-tight">
                {value}
            </div>
            {children}
          </div>
        </Card>
    )
}