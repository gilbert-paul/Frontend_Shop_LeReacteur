import { ChangeEvent } from "react";

const Input = ({
  placeholder,
  type,
  name,
  checked,
  onChange,
  disabled,
  value,
  autoFocus,
  className
}: {
  placeholder?: string;
  type: string;
  name: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  autoFocus?: boolean;
  className?:string;
}) => {
  return (
    <input
      className={`border-secondary border-b-2 bg-transparent focus-visible:outline-0 focus:border-primary ${className}`}
      autoFocus={autoFocus}
      type={type ?? "text"}
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      checked={checked}
      onChange={onChange}
      {...(typeof value === "string" && { value })}
    />
  );
};

export { Input };
