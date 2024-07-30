import Tile from '../../components/Tile/Tile';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import './Home.css';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading.jsx';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProjectChosed, setIsProjectChosed] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [metaData, setMetaData] = useState('description');

  useEffect(() => {
    async function fetchData() {
      const result = await apiService.get('/projects', {});
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  const ProjectList = data.map((project) => (
    <ProjectTile
      key={project.projectId}
      name={project.name}
      date={project.lastModified}
      id={project.projectId}
      selected={project.projectId === selectedProjectId}
      onClick={() => {
        setIsProjectChosed(true);
        setSelectedProjectId(project.projectId);
      }}
    />
  ));

  if (loading) return <Loading />;

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
          <div className="project-list-wrapper">{ProjectList}</div>
        </Tile>
        <Tile className="meta-data">
          {isProjectChosed && (
            <>
              <nav className="meta-toolbar">
                <div
                  className={
                    'meta-nav-link' +
                    (metaData == 'description' ? '-selected' : '')
                  }
                  onClick={() => setMetaData('description')}
                >
                  Description
                </div>
                <div
                  className={
                    'meta-nav-link' + (metaData == 'members' ? '-selected' : '')
                  }
                  onClick={() => setMetaData('members')}
                >
                  Members
                </div>
              </nav>
              <div className="meta-content">
                {metaData == 'description' && <Description />}
                {metaData == 'members' && <MembersList />}
              </div>
            </>
          )}
          {!isProjectChosed && <p>Choose a project...</p>}
        </Tile>
      </div>
    </div>
  );
}

function MembersList() {
  return <p>Lorem Ipsum Mebmerum</p>;
}

function Description() {
  return <p>Loerm Ipsum Descriptorum</p>;
}
