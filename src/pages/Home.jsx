import Tile from '../components/Tile/Tile';
import ProjectTile from '../components/ProjectTile/ProjectTile';

export default function Home() {
  return (
    <div>
      <div className="toolbar">
        <button className="yes-button">Create</button>
        <button className="yes-button">Join</button>
        <input type="text" placeholder="Search" />
      </div>
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
    </div>
  );
}
