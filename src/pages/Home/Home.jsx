import Tile from '../../components/Tile/Tile';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div className="toolbar">
        <Link to="create">
          <button className="yes-button">Create</button>
        </Link>
        <button className="yes-button">Join</button>
        <input type="text" placeholder="Search" />
      </div>
      <div className="projects-view">
        <Tile className="project-list-tile">
          <div className="column-names">
            <p className="project-name">Project</p>
            <p className="last-mod">Last modiefied</p>
          </div>
          <ProjectTile />
          <ProjectTile />
          <ProjectTile />
          <ProjectTile />
          <ProjectTile />
          <ProjectTile />
          <ProjectTile />
          <ProjectTile />
        </Tile>
        <Tile>
          <nav className="meta-toolbar">
            <div>Members</div>
            <div>Description</div>
          </nav>
        </Tile>
      </div>
    </div>
  );
}
