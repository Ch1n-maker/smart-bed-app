interface SectionTitleProps {
  title: string;
  action?: { label: string; onClick: () => void };
}

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      {action && (
        <button onClick={action.onClick} className="text-xs text-primary font-medium hover:underline">
          {action.label}
        </button>
      )}
    </div>
  );
}
