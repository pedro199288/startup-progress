import React from 'react';

export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  label: string;
  name: string;
  disabled?: boolean;
  handleChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  id,
  name,
  label,
  handleChange,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <div className={`${disabled && 'opacity-50'}`}>
      <label htmlFor={id || name} className="space-x-2">
        <input
          type="checkbox"
          name={name}
          id={id || name}
          className="accent-violet-500"
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
}
