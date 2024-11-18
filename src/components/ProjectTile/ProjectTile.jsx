import login from '../../assets/login.svg';
import './ProjectTile.css';
import { Link } from 'react-router-dom';
export default function ProjectTile({ name, date, id, onClick,enterProjectClick, selected }) {
  let diff = time_diff(date);

  return (
    <div
      className={'project-tile' + (selected ? ' selected' : '')}
      id={id}
      onClick={onClick}
    >
      <div className="date-name">
        <p className="name">{name}</p>
        <p className="date">{diff}</p>
      </div>
      <Link className='project-button' to={"/tasks"} onClick={enterProjectClick}>
      <img src={login} alt="Login Icon"/>
      </Link>
    </div>
  );
}

function time_diff(date) {
  let interval = Date.now() - Date.parse(date);
  const timestamps = [];
  timestamps.push(interval / 1000);
  timestamps.push(timestamps[0] / 60);
  timestamps.push(timestamps[1] / 60);
  timestamps.push(timestamps[2] / 24);
  timestamps.push(timestamps[3] / 7);
  timestamps.push(timestamps[4] / 4.35);
  timestamps.push(timestamps[5] / 52.17);
  const time_measures = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ];
  for (let i = timestamps.length - 1; i > -1; i--) {
    if (timestamps[i] >= 1) {
      let diff = {
        number: Math.floor(timestamps[i]),
        time: time_measures[i],
      };
      const plural = diff.number == 1 ? '' : 's';
      const article = diff.number == 1 ? 'a' : diff.number;
      if (diff.time == 'day' && diff.number == 1) diff = 'yesterday';
      else diff = article + ' ' + diff.time + plural + ' ago';
      return diff;
    }
  }
  return 'now';
}
