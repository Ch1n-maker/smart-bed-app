import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  active?: boolean;
  variant?: 'default' | 'danger' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
}: IconButtonProps) {
  const sizeMap = { sm: 16, md: 20, lg: 28 };
  const padMap = { sm: 'p-1.5', md: 'p-2', lg: 'p-3' };

  const variantStyles = {
    default: active
      ? 'bg-primary text-white shadow-md'
      : 'bg-white text-text-secondary hover:bg-primary-light hover:text-primary border border-gray-200',
    danger: 'bg-danger text-white shadow-md hover:bg-red-700',
    primary: 'bg-primary text-white shadow-md hover:bg-primary-dark',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${padMap[size]} rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200 ${variantStyles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={label}
    >
      <Icon size={sizeMap[size]} />
      {size === 'lg' && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
