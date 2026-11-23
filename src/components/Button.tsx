
import type { ComponentProps } from "react";
import { cn } from "../utils/cn";

type ButtonProps = ComponentProps<'button'> & {
    // children: ReactNode;
    variant?: 'primary' | 'danger' | 'secondary' | 'tertiary';
    // disabled?: boolean;
    // onClick?: () => void;
    // className?: string;
    onlyIcon?: boolean
}

const Button = ({ variant = 'primary', onlyIcon, ...props }: ButtonProps) => {

    return (
        <button
            {...props}
            className={cn(
                "h-12 enabled:cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex gap-2 items-center justify-center",
                // variant === 'primary' && "bg-blue-500",
                // variant === 'danger' && "bg-red-500",
                onlyIcon ? 'aspect-square' : 'px-8',
                {
                    "bg-blue-500": variant === 'primary',
                    "bg-red-500": variant === 'danger',
                    "bg-gray-200": variant === 'secondary',
                    "border border-gray-200": variant === 'tertiary',
                },
                props.className,
            )}
        >
            {props.children}
        </button>
    )
}

export default Button
