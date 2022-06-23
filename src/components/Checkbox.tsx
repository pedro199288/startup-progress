import React from 'react';
import { useStepsForm } from './StepsForm';

export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  label: string;
  name: string;
};

export default function Checkbox({ id, name, label, ...props }: CheckboxProps) {
  const {
    stepsFormState: { formData, stepsInfo },
    handleCheckboxChange,
  } = useStepsForm();

  const checked = formData[name];
  const disabled = stepsInfo.find((stepInfo) => stepInfo.fieldsNames.includes(name))?.disabled;

  return (
    <div className={`${disabled && 'opacity-50'}`}>
      <label htmlFor={id || name} className="space-x-2">
        <input
          type="checkbox"
          name={name}
          id={id || name}
          className="accent-violet-500"
          onChange={handleCheckboxChange}
          disabled={disabled}
          checked={checked}
          {...props}
        />
        <span>{label}</span>
      </label>
    </div>
  );
}
