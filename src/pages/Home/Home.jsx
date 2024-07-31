import Tile from '../../components/Tile/Tile';
import ProjectTile from '../../components/ProjectTile/ProjectTile';
import './Home.css';
import { Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading.jsx';
import Participant from '../../components/Patrticipant/Participant.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProjectChosed, setIsProjectChosed] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [metaData, setMetaData] = useState('description');
  const [searchLoading, setSearchLoading] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const result = await apiService.get('/projects', {});
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setSearchLoading(true);
    setIsProjectChosed(false);
    setSelectedProject({});
    async function fetchSearchData() {
      const result = await apiService.get('/projects', {});
      if (result == '') setData(result);
      else {
        if (
          result.filter(
            (p) =>
              p.name.toLowerCase().includes(input.toLowerCase()).length == 0
          )
        )
          setData(
            result.filter((p) =>
              p.name.toLowerCase().includes(input.toLowerCase())
            )
          );
      }
      setSearchLoading(false);
    }
    fetchSearchData();
  }, [input]);

  const ProjectList = data.map((project) => (
    <ProjectTile
      key={project.projectId}
      name={project.name}
      date={project.lastModified}
      id={'project-' + project.projectId}
      selected={project.projectId === selectedProject.projectId}
      onClick={() => {
        setIsProjectChosed(true);
        setSelectedProject(project);
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
        <input
          type="search"
          placeholder="Search"
          onInput={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <div className="projects-view">
        <Tile className="project-list-tile">
          <div className="column-names">
            <h4 className="project-name">Project</h4>
            <h4 className="last-mod">Last modiefied</h4>
          </div>
          <div className="project-list-wrapper">
            {!searchLoading && data.length != 0 && ProjectList}
            {!searchLoading && data.length == 0 && <NotFound />}
            {searchLoading && <Loading />}
          </div>
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
                {metaData == 'description' && (
                  <Description project={selectedProject} />
                )}
                {metaData == 'members' && (
                  <MembersList project={selectedProject} />
                )}
              </div>
            </>
          )}
          {!isProjectChosed && <p>Choose a project...</p>}
        </Tile>
      </div>
    </div>
  );
}

function MembersList({ project }) {
  const userList = project.participations.map((p) => (
    <Participant
      key={p.user.userId}
      name={p.user.firstName}
      surname={p.user.lastName}
      role={p.user.role.name}
      type="with-role"
    />
  ));
  return (
    <div>
      <div className="column-names">
        <h4>Name</h4>
        <h4>Role</h4>
      </div>
      {userList}
    </div>
  );
}

function Description({ project }) {
  const formatter = new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const deadline = formatter.format(new Date(project.deadline));
  const start = formatter.format(new Date(project.start));
  return (
    <>
      <div className="text-row">
        <h4>Name:</h4> <p>{project.name}</p>
      </div>
      <div className="text-row">
        <h4>Owner:</h4>{' '}
        <p>{project.creator.firstName + ' ' + project.creator.lastName}</p>
      </div>
      <div className="text-row">
        <h4>Start:</h4> <p>{start}</p>
      </div>
      {!(project.deadline == undefined || project.deadline == null) && (
        <div className="text-row">
          <h4>Deadline:</h4> <p>{deadline}</p>
        </div>
      )}
      <div className="text-row">
        <h4>Status:</h4> <p>{project.projectStatus.name}</p>
      </div>
      <h4>Description:</h4>
      <p>{project.description}</p>
    </>
  );
}
