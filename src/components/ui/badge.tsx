import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-maroon-900 text-gold-100 shadow",
        secondary:
          "border-transparent bg-champagne-200 text-maroon-900",
        gold:
          "border border-gold-400/50 bg-gold-500/15 text-gold-700 font-medium",
        outline:
          "text-foreground border border-maroon-900/20",
        success:
          "border-transparent bg-emerald-100 text-emerald-800",
        featured:
          "border border-gold-400 bg-gradient-to-r from-gold-500/20 to-maroon-900/10 text-maroon-900 font-serif tracking-wide",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
