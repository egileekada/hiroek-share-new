"use client";

import { useState } from "react";
import { useField } from "formik";
import { EyeIcon } from "../../svg";
import { Input, TextArea } from "@heroui/react";

interface IProps {
    isPassword?: boolean;
    name: string;
    type?:
        | "number"
        | "text"
        | "email"
        | "date"
        | "password"
        | "search"
        | "time"
        | "hidden"
        | "datetime-local"
        | "month"
        | "tel"
        | "url"
        | "week";
    placeholder?: string;
    disable?: boolean;
    icon?: React.ReactNode;
    hasIcon?: boolean;
    hasLeftIcon?: boolean;
    textarea?: boolean;
    label?: string;
    onClick?: () => void;
    color?: string;
    borderColor?: string;
    borderWidth?: string;
    height?: string;
}

export default function CustomInput({
    isPassword = false,
    name,
    textarea,
    type = "text",
    placeholder,
    disable,
    icon,
    hasIcon,
    hasLeftIcon,
    label,
    onClick,
    color,
    borderColor,
    borderWidth,
    height,
}: IProps) {
    const [field, meta, helpers] = useField(name);
    const [showText, setShowText] = useState(isPassword ? "password" : type);

    const togglePassword = () =>
        setShowText((prev) => (prev === "text" ? "password" : "text"));

    const formatDate = (val: any) => {
        if (!val) return "";
        const d = new Date(val);
        return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
    };

    const commonProps = {
        ...field,
        disabled: disable,
        placeholder,
        value: type === "date" ? formatDate(field.value) : field.value || "",
        onChange: (e: any) => helpers.setValue(e.target.value),
        onBlur: () => helpers.setTouched(true),
        style: {
            height: height ?? "50px",
            borderColor: borderColor ?? "#37137F80",
            borderWidth: borderWidth ?? "2px",
            color: color ?? "#37137f",
            paddingLeft: hasLeftIcon ? "40px" : "12px",
            paddingRight: isPassword || hasIcon ? "40px" : "12px",
        },
    };

    return (
        <div className="w-full flex flex-col gap-1 text-foreground relative">
            {label && (
                <label className="text-primary font-semibold text-sm">
                    {label}
                </label>
            )}

            {textarea ? (
                <TextArea
                    {...commonProps}
                    className="bg-transparent text-sm font-medium"
                />
            ) : (
                <div className="relative w-full">
                    <Input
                        {...commonProps}
                        type={showText}
                        className="bg-transparent text-sm text-foreground font-medium w-full"
                    />

                    {/* Left Icon */}
                    {hasLeftIcon && icon && (
                        <div className="absolute left-2 top-0 h-full flex items-center cursor-pointer">
                            {icon}
                        </div>
                    )}

                    {/* Right Icon / Password Toggle */}
                    {(isPassword || hasIcon) && (
                        <div
                            className="absolute right-2 top-0 h-full flex items-center cursor-pointer"
                            onClick={isPassword ? togglePassword : onClick}
                        >
                            {isPassword ? <EyeIcon /> : icon}
                        </div>
                    )}
                </div>
            )}

            {meta.touched && meta.error && (
                <p className="text-left text-xs text-red-500 font-semibold ">
                    {meta.error}
                </p>
            )}
        </div>
    );
}
