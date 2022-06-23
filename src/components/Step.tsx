import React from 'react';
import { useStepsForm } from './StepsForm';

export type StepProps = {
  title: string;
  children: React.ReactElement[] | React.ReactElement;
};

export default function Step({ title, children }: StepProps) {
  const {
    stepsFormState: { stepsInfo },
  } = useStepsForm();

  const stepIndex = stepsInfo.findIndex((stepInfo) => stepInfo.title === title);
  const stepComplete = stepsInfo[stepIndex].complete;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-semibold my-2 flex items-center">
          <span className="flex justify-center items-center rounded-full w-6 h-6 bg-slate-800 text-white text-xs flex-shrink-0 mr-3">
            {stepIndex! + 1}
          </span>{' '}
          <span className="text-lg flex-shrink">{title}</span>
        </h3>
        {stepComplete && <span className="font-extrabold text-3xl">✓</span>}
      </div>
      {children}
    </div>
  );
}
