import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-700 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-maroon-900 text-gold-100 shadow-md hover:bg-maroon-800 hover:shadow-lg border border-gold-500/20",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
        outline:
          "border border-maroon-900/30 bg-transparent text-maroon-900 shadow-sm hover:bg-maroon-50 hover:text-maroon-950",
        gold:
          "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-950 font-semibold shadow-md hover:opacity-90 border border-gold-300",
        secondary:
          "bg-champagne-200 text-maroon-900 shadow-sm hover:bg-champagne-300",
        ghost: "hover:bg-maroon-50 hover:text-maroon-900",
        link: "text-maroon-900 underline-offset-4 hover:underline",
        whatsapp:
          "bg-[#25D366] text-white font-semibold shadow-md hover:bg-[#20bd5a] hover:shadow-lg border border-white/10",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
