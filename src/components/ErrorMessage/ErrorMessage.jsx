import { forwardRef } from 'react';
import './ErrorMessage.css';
import fail from '../../assets/fail.svg';

const ErrorMessage = forwardRef(({ message, className, ...rest }, ref) => {
  if (message)
    return (
      <div ref={ref} className={`error-message ${className}`} {...rest}>
        <img src={fail} />
        <p>{message}</p>
        <img src={fail} />
      </div>
    );
  else return <></>;
});

ErrorMessage.displayName = 'ErrorMessage';
export default ErrorMessage;
