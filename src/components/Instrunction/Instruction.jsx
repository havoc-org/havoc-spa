import './Instruction.css';
import info from '../../assets/info.svg';

export default function Instruction({ className, children, ...props }) {
  if (children)
    return (
      <p className={`instruction ${className}`} {...props}>
        <img src={info} className="info-icon" />
        {children}
      </p>
    );
  else return <></>;
}
