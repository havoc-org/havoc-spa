import { forwardRef } from 'react';
import './Message.css';
import FailIcon from '../../assets/fail.svg?react';
import SuccessIcon from '../../assets/success.svg?react';

const Message = forwardRef(
  ({ message, className, success = false, ...rest }, ref) => {
    if (message)
      return (
        <div
          ref={ref}
          className={`${success ? 'success' : 'fail'} message ${className}`}
          {...rest}
        >
          {success ? <SuccessIcon fill="#0d1134" /> : <FailIcon />}
          <p>{message}</p>
          {success ? <SuccessIcon fill="#0d1134" /> : <FailIcon />}
        </div>
      );
    else return <></>;
  }
);

Message.displayName = 'Message';
export default Message;
