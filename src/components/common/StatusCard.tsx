import type { ReactNode } from 'react';

interface StatusCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function StatusCard({ title, children, className = '', icon }: StatusCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">{title}</h3>
      </div>
      <div className="text-lg font-semibold text-text">{children}</div>
    </div>
  );
}
