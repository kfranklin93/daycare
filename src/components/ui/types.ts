export type Size = 'sm' | 'md' | 'lg';

export type Color = 
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export type Variant = 
  | 'solid'
  | 'outline'
  | 'ghost';

export type Theme = {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
}

export const theme: Theme = {
  primary: '#3B82F6',   // blue-500
  secondary: '#6B7280', // gray-500
  success: '#10B981',   // green-500
  danger: '#EF4444',    // red-500
  warning: '#F59E0B',   // amber-500
  info: '#3B82F6',      // blue-500
};