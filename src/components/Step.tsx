import React from 'react';
import Checkbox, { CheckboxProps } from 'components/Checkbox';

export type StepProps = {
  disabled?: boolean;
  complete?: boolean;
  title: string;
  stepInputsData?: {
    [key: string]: boolean; // TODO: allow more types of values
  };
  children: React.ReactElement<CheckboxProps>[] | React.ReactElement<CheckboxProps>;
  index?: number;
  handleChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

function renderInput(
  inputElement: React.ReactElement<CheckboxProps>,
  props: Partial<CheckboxProps>
) {
  // TODO: allow more types of input elements
  return inputElement.type === Checkbox
    ? React.cloneElement(inputElement, {
        ...props,
      })
    : inputElement;
}

export default function Step({
  disabled = false,
  complete = false,
  title,
  stepInputsData,
  children,
  index,
  handleChange,
}: StepProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold my-2 flex items-center">
          <span className="flex justify-center items-center rounded-full w-6 h-6 bg-slate-800 text-white text-xs flex-shrink-0 mr-3">
            {index! + 1}
          </span>{' '}
          <span className="text-lg flex-shrink">{title}</span>
        </h3>
        {complete && <span className="font-extrabold text-3xl">✓</span>}
      </div>
      {React.Children.map(children, (child) =>
        renderInput(child, {
          handleChange,
          checked: stepInputsData?.[child.props.name] ?? false,
          disabled,
        })
      )}
    </div>
  );
}
