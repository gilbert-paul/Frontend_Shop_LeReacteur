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
}: {
  placeholder?: string;
  type: string;
  name: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
  autoFocus?: boolean
}) => {
  return (
    <input
      autoFocus={autoFocus}
      className="border"
      type={type ?? "text"}
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      checked={checked}
      onChange={onChange}
      {...(typeof value === 'string' && { value })}
    />
  );
};

export { Input };
