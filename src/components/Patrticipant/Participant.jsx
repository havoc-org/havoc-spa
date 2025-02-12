import './Participant.css';
export default function Participant({ name, surname, type, role }) {
  if (type === 'with-role')
    return (
      <div className="participant with-role">
        <p className="name">{name + ' ' + surname}</p>
        <p className="name role">{role}</p>
      </div>
    );
  else
    return (
      <div className="participant">
        <p className="name">{name + ' ' + surname}</p>
      </div>
    );
}
