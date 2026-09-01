import React from 'react';
import { ItemCondition } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'terracotta' | 'emerald' | 'amber' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', size = 'sm' }) => {
  const styles = {
    terracotta: 'bg-[#FEE9E1] text-[#C4623A] border-[#FCD5C7]',
    emerald: 'bg-[#E8F5E9] text-[#2D6A4F] border-[#C8E6C9]',
    amber: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]',
    neutral: 'bg-[#F0EBE3] text-[#6B6258] border-[#E6E1DA]',
    outline: 'bg-transparent text-[#756D65] border-[#D8D2C9]',
  };

  const sizes = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold',
  };

  return (
    <span className={`inline-flex items-center rounded-full border ${styles[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

export const ConditionBadge: React.FC<{ condition: ItemCondition }> = ({ condition }) => {
  const getVariant = (c: ItemCondition) => {
    switch (c) {
      case 'Nuevo / Sin Usar':
        return 'emerald';
      case 'Como Nuevo':
        return 'terracotta';
      case 'Buen Estado':
        return 'neutral';
      default:
        return 'outline';
    }
  };

  return <Badge variant={getVariant(condition)}>{condition}</Badge>;
};
