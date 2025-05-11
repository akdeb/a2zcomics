import React from "react";

export function RadioGroup({ children, name, className = "", ...props }: React.PropsWithChildren<{ name: string; className?: string } & React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div role="radiogroup" className={className} {...props}>
      {React.Children.map(children, child => {
        if (
          React.isValidElement(child) &&
          (child.type as any).displayName === "RadioGroupItem"
        ) {
          const childProps = child.props || {};
          return React.cloneElement(child, {
            ...childProps,
            name: childProps.name || name,
          });
        }
        return child;
      })}
    </div>
  );
}

export function RadioGroupItem({ value, children, name, className = "", ...props }: { value: string; name?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`inline-flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        className="form-radio text-amber-500 focus:ring-amber-500"
        {...props}
      />
      <span>{children}</span>
    </label>
  );
}

RadioGroupItem.displayName = "RadioGroupItem"; 