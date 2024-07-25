import login from '../../assets/login.svg';
import './ProjectTile.css';
export default function ProjectTile() {
  return (
    <div className="project-tile">
      <div className="date-name">
        <p className="name">Project name</p>
        <p className="date">0000.01.01</p>
      </div>
      <img src={login} className="icon" />
    </div>
  );
}
