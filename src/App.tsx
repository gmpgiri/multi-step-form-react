import { FormEvent, useState } from "react";
import { AccountForm } from "./AccountForm";
import { AddressForm } from "./AddressForm";
import "./App.css";
import { FormData, INITIAL_DATA } from "./constants";
import { useMultistepForm } from "./useMultistepForm";
import { UserForm } from "./UserForm";

function App() {
  const [data, setData] = useState(INITIAL_DATA);
  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next()
    }
    console.log(data);
    alert('Successfully Created Account')
  }

  return (
    <div className="main">
      <form onSubmit={onSubmit}>
        <div className="stepContainer">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className="navigationContainer">
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  );
}

export default App;
