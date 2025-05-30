
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold ring-offset-background transition-all duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-[#CCFF00] text-black hover:bg-[#b8e600] transition-colors duration-150 ease-in-out",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-150 ease-in-out",
        outline:
          "border border-gray-300 bg-white hover:bg-gray-50 hover:text-accent-foreground transition-colors duration-150 ease-in-out",
        secondary:
          "bg-black text-white hover:bg-gray-800 transition-colors duration-150 ease-in-out",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-colors duration-150 ease-in-out",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-150 ease-in-out",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-full px-4",
        lg: "h-14 rounded-full px-8",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
