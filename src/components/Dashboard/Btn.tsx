import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link"
}

export const Button: React.FC<ButtonProps> = ({ variant = "default", className, children, ...props }) => {
    let buttonClassName =
        "rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    switch (variant) {
        case "outline":
            buttonClassName += " border border-gray-200 hover:bg-gray-100 focus:ring-gray-200"
            break
        case "ghost":
            buttonClassName += " hover:bg-gray-100 focus:ring-gray-200"
            break
        case "link":
            buttonClassName += " text-blue-500 underline hover:no-underline"
            break
        default:
            buttonClassName += " bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
    }

    buttonClassName += ` ${className || ""}`

    return (
        <button className={buttonClassName} {...props}>
            {children}
        </button>
    )
}

