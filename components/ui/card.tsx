import React from "react";

export function Card({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-xl border-2 border-amber-400 bg-[#f9f6ee] shadow-lg p-0 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`bg-amber-500 text-white text-center py-3 text-2xl font-bold ${className}`}>{children}</div>
  );
}

export function CardTitle({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`text-2xl font-bold ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`p-6 pt-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`px-6 pb-4 pt-2 ${className}`}>{children}</div>;
} 