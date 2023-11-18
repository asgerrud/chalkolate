import { type ReactNode } from "react";

interface StatProps {
  label: string;
  children: ReactNode;
}

export function Stat({ label, children }: StatProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-3 w-full">
      <p className="text-sm">{label}</p>
      <p className="text-xl font-medium">{children}</p>
    </div>
  );
}
