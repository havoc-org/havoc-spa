import login from '../../assets/login.svg';
import './ProjectTile.css';
import { Link } from 'react-router-dom';


const EnterIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="#171717" xmlns="http://www.w3.org/2000/svg">
    <path fill='currentColor' d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H13.44L11.37 9.18C11.22 9.03 11.15 8.84 11.15 8.65C11.15 8.46 11.22 8.27 11.37 8.12C11.66 7.83 12.14 7.83 12.43 8.12L15.78 11.47C16.07 11.76 16.07 12.24 15.78 12.53L12.43 15.88C12.14 16.17 11.66 16.17 11.37 15.88C11.08 15.59 11.08 15.11 11.37 14.82L13.44 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" />
    <path fill='currentColor' d="M2.75 11.25C2.34 11.25 2 11.59 2 12C2 12.41 2.34 12.75 2.75 12.75H9V11.25H2.75Z" />
  </svg>
);

export default function ProjectTile({ name, date, id, onClick, enterProjectClick, selected }) {
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
        <div className='project-enter-button'>
          <EnterIcon />
        </div>
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
