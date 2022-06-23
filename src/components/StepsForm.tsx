import React from 'react';
import Step, { type StepProps } from 'components/Step';
import Checkbox from 'components/Checkbox';
import RandomFact from 'components/RandomFact';
import useLocalStorage from 'hooks/useLocalstorage';

type stepsInfo = Array<{
  fieldsNames: string[];
  title: string;
  complete: boolean;
  disabled: boolean;
}>;

type formData = {
  [key: string]: boolean;
};

type stepsFormState = {
  stepsInfo: stepsInfo;
  formData: formData;
  showRandomFact: boolean;
};

function getInitialFormState(steps: React.ReactElement<StepProps>[]): stepsFormState {
  const stepsInfo: stepsInfo = [];
  const initialFormData: formData = {};

  steps.forEach((formStep, index) => {
    if (formStep.type !== Step) {
      throw new Error('only "Step" component is alloed as StepsForm child');
    }
    stepsInfo[index] = {
      fieldsNames: [],
      title: formStep.props.title,
      complete: false,
      disabled: index === 0 ? false : true,
    };
    const formStepChildren = Array.isArray(formStep.props.children)
      ? formStep.props.children
      : formStep.props.children
      ? [formStep.props.children]
      : null;

    formStepChildren?.forEach((stepChild) => {
      // TODO: allow more types of input elements
      if (stepChild.type === Checkbox) {
        if (initialFormData[stepChild.props.name] !== undefined)
          throw new Error(
            `name property "${stepChild.props.name}" has been used more than once. Repeated "name" property is not alled in ${StepsForm.name}`
          );
        stepsInfo[index].fieldsNames.push(stepChild.props.name);
        initialFormData[stepChild.props.name] = false;
      }
    });
  });
  return {
    stepsInfo,
    formData: initialFormData,
    showRandomFact: false,
  };
}

function renderStep(stepElement: React.ReactElement<StepProps>, props: Partial<StepProps>) {
  return stepElement.type === Step
    ? React.cloneElement(stepElement, {
        ...props,
      })
    : stepElement;
}

type StepsFormProps = {
  title: string;
  children: React.ReactElement<StepProps>[];
};

export default function StepsForm({ title, children: steps }: StepsFormProps) {
  const [stepsFormState, setStepsFormState] = useLocalStorage<stepsFormState>(
    'stepsFormState',
    () => getInitialFormState(steps)
  );

  // TODO: add event handler functionality for other types of inputs
  const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target as HTMLInputElement;
    setStepsFormState((prevState: stepsFormState) => {
      const newStepsInfo = [...prevState.stepsInfo];
      const newFormData = { ...prevState.formData, [name]: checked };
      let showRandomFact = false;

      let clearNextStages = false;
      newStepsInfo.forEach((stepInfo, idx) => {
        if (clearNextStages) {
          newStepsInfo[idx].fieldsNames.forEach((fieldName) => {
            newFormData[fieldName] = false;
          });
          newStepsInfo[idx].disabled = true;
          newStepsInfo[idx].complete = false;
          return;
        }

        if (stepInfo.fieldsNames.includes(name)) {
          const stepComplete = stepInfo.fieldsNames.every(
            (fieldName) => newFormData[fieldName] === true
          );
          newStepsInfo[idx].complete = stepComplete;
          if (stepComplete) {
            if (idx === newStepsInfo.length - 1) {
              showRandomFact = true;
            } else {
              newStepsInfo[idx + 1].disabled = false;
            }
          } else {
            clearNextStages = true;
          }
        }
      });

      return {
        formData: newFormData,
        stepsInfo: newStepsInfo,
        showRandomFact,
      };
    });
  };

  return (
    <div className="w-60">
      <h2 className="text-xl font-bold my-4">{title}</h2>
      {React.Children.map(steps, (step, idx) => {
        return renderStep(step, {
          handleChange: handleCheckboxChange,
          stepInputsData: stepsFormState.stepsInfo[idx].fieldsNames.reduce(
            (inputsData, fieldName) => {
              return { ...inputsData, [fieldName]: stepsFormState.formData[fieldName] };
            },
            {}
          ),
          complete: stepsFormState.stepsInfo[idx].complete,
          disabled: stepsFormState.stepsInfo[idx].disabled,
          index: idx,
        });
      })}
      {stepsFormState.showRandomFact && (
        <div className="mt-8 text-center">
          <h4 className="font-medium">Random fact:</h4>
          {stepsFormState.showRandomFact && (
            <React.Suspense
              fallback={<span className="inline-block mx-auto animate animate-spin">⌛</span>}
            >
              <RandomFact />
            </React.Suspense>
          )}
        </div>
      )}
    </div>
  );
}
