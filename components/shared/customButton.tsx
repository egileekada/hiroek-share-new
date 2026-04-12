"use client";

import { Button } from "@heroui/react";
import { ArrowIcon } from "../../svg";

interface IProps {
  hasBackIcon?: boolean;
  hasFrontIcon?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  bgColor?: string;
  color?: string;
  width?: string;
  height?: string;
  rounded?: string;
  fontSize?: string;
  type?: "submit" | "reset" | "button";
  borderWidth?: string;
  borderColor?: string;
  noshadow?: boolean;
  isDisabled?: boolean;
  hasIcon?: boolean;
  [x: string]: any;
}

export default function CustomButton(props: IProps) {
  const {
    hasFrontIcon,
    hasIcon,
    children,
    bgColor,
    icon,
    color,
    width,
    height,
    rounded,
    loading,
    fontSize,
    type,
    borderWidth,
    borderColor,
    noshadow,
    isDisabled,
    ...rest
  } = props;

  return (
    <Button
      {...rest}
      type={type}
      isPending={loading}
      isDisabled={loading || isDisabled}
      className={`flex items-center justify-center gap-2 font-semibold ${
        noshadow ? "shadow-none" : ""
      }`}
      style={{
        background: bgColor ?? "#37137f",
        color: color ?? "white",
        borderRadius: rounded ?? "8px",
        height: height ?? "54px",
        width: width ?? "100%",
        fontSize: fontSize ?? "14px",
        borderWidth: borderWidth ?? "0px",
        borderColor: borderColor ?? "transparent",
      }}
    >
      {/* Left Icon */}
      {hasFrontIcon && !loading && (icon ?? <ArrowIcon />)}

      {/* Text */}
      <span>{loading ? "Loading..." : children}</span>

      {/* Right Icon */}
      {hasIcon && !loading && (icon ?? <ArrowIcon />)}
    </Button>
  );
}