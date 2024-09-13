import { useState, useEffect } from 'react';
import './TextInput.css';
import Instruction from '../Instrunction/Instruction';
import FailIcon from '../../assets/fail.svg?react';
import SuccesIcon from '../../assets/success.svg?react';
export default function TextInput({
  label,
  children,
  setOutsideData,
  setOutsideValidationState,
  validationFunc,
  id,
  autoComplete,
  type,
}) {
  const [validData, setValidData] = useState(false);
  const [dataFocus, setDataFocus] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    if (validationFunc) {
      setValidData(validationFunc(data));
      if (setOutsideValidationState)
        setOutsideValidationState(validationFunc(data));
    }
  }, [data, validationFunc, setOutsideValidationState]);

  return (
    <div className="flex-wrapper">
      <label htmlFor="name" className="label-wrap">
        {label}
        <div className="icon-wrap">
          {active &&
            (validData ? (
              <SuccesIcon fill="#bbd8eb" />
            ) : (
              <FailIcon fill="#d4776a" />
            ))}
        </div>
      </label>
      <input
        name={id}
        id={id}
        type={type}
        aria-describedby={id + '-instruction'}
        autoComplete={autoComplete}
        required
        onInput={(e) => {
          setData(e.target.value);
          if (setOutsideData) setOutsideData(e.target.value);
        }}
        onFocus={() => {
          setDataFocus(true);
          setActive(true);
        }}
        onBlur={() => setDataFocus(false)}
      />
      {(!validationFunc || (dataFocus && !validData)) && (
        <Instruction id="name-instruction">{children}</Instruction>
      )}
    </div>
  );
}
