import React from "react";

type RadioGroupContextType = {
  value: string;
  onValueChange: (value: string) => void;
  name: string;
};

const RadioGroupContext = React.createContext<RadioGroupContextType | undefined>(undefined);

export function RadioGroup({
  children,
  value,
  onValueChange,
  name,
  className = "",
  ...props
}: React.PropsWithChildren<{
  value: string;
  onValueChange: (value: string) => void;
  name: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
      <div role="radiogroup" className={className} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export function RadioGroupItem({
  value,
  children,
  className = "",
  ...props
}: {
  value: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const context = React.useContext(RadioGroupContext);
  if (!context) throw new Error("RadioGroupItem must be used within a RadioGroup");

  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="radio"
        name={context.name}
        value={value}
        checked={context.value === value}
        onChange={() => context.onValueChange(value)}
        className="form-radio text-amber-500 focus:ring-amber-500"
        {...props}
      />
      <span>{children}</span>
    </label>
  );
}

RadioGroupItem.displayName = "RadioGroupItem"; 