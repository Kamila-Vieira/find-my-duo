import { InputHTMLAttributes } from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
import { PublishAdProps } from "..";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  registerProps?: RegisterOptions;
  registerName: keyof PublishAdProps;
  register: UseFormRegister<PublishAdProps>;
}

export function Input({ registerName, registerProps, register, ...inputProps }: InputProps) {
  return (
    <input
      {...register(registerName, { ...registerProps })}
      {...inputProps}
      className="bg-zinc-900 h-11 py-2 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
    />
  );
}
