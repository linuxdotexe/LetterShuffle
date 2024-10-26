import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type?: string;
  name: string;
  isRequired?: boolean;
  value?: string;
  errorMessage?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    placeholder,
    type = "text",
    name,
    isRequired,
    value,
    onChange,
    errorMessage,
  },
  ref,
) {
  return (
    <>
      <label>
        <input
          className="rounded-s-md border-b-2 border-l-2 border-t-2 border-green-500 bg-white/30 p-2 font-medium text-slate-950 outline-2 placeholder:font-medium placeholder:text-slate-800 focus-visible:bg-white focus-visible:outline-none"
          type={type}
          value={value}
          placeholder={placeholder}
          name={name}
          required={isRequired}
          id={name}
          ref={ref as React.Ref<HTMLInputElement>}
          autoComplete="on"
          onChange={onChange}
        />
        {errorMessage ? (
          <p className="font-body mt-1 rounded-md bg-rose-200 p-2 text-sm text-rose-700">
            {errorMessage}
          </p>
        ) : (
          <></>
        )}
      </label>
    </>
  );
});

export default Input;
