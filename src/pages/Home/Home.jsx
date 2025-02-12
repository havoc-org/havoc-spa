import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Tile from "../../components/Tile/Tile";
import ProjectTile from "../../components/ProjectTile/ProjectTile";
import "./Home.css";
import Loading from "../../components/Loading/Loading.jsx";
import Participant from "../../components/Patrticipant/Participant.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import useProjectService from "../../hooks/useProjectService.js";
import { ProjectContext } from "../../contexts/ProjectContext.jsx";
import JoinProjectPopup from "./Components/JoinProjectPopup.jsx";

export default function Home() {
  const context = useContext(ProjectContext);
  const [data, setData] = useState([]);
  const [original, setOriginal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProjectChosed, setIsProjectChosed] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [metaData, setMetaData] = useState("description");
  const [searchLoading, setSearchLoading] = useState(false);
  const [isJoinPopupOpen, setIsJoinPopupOpen] = useState(false);
  const projectService = useProjectService();

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const result = await projectService.getProjects();
      setData(result);
      setLoading(false);
      setOriginal(result);
    }
    fetchData();
  }, []);

  const ProjectList = data.map((project) => (
    <ProjectTile
      key={project.projectId}
      name={project.name}
      date={project.lastModified}
      id={"project-" + project.projectId}
      selected={project.projectId === selectedProject.projectId}
      onClick={() => {
        setIsProjectChosed(true);
        setSelectedProject(project);
      }}
      enterProjectClick={() => {
        context.setProject(project);
      }}
    />
  ));

  return (
    <div>
      <div className="toolbar">
        <Link to="create">
          <button className="yes-button">Create</button>
        </Link>
        <button className="yes-button" onClick={() => setIsJoinPopupOpen(true)}>
          Join
        </button>
        <SearchBar
          projects={data}
          original={original}
          className="searchbar"
          setResults={setData}
        />
      </div>
      <div className="projects-view">
        <Tile className="project-list-tile">
          <div className="column-names">
            <h4 className="project-name">Project</h4>
            <h4 className="last-mod">Last modified</h4>
          </div>
          <div className="project-list-wrapper">
            {!searchLoading && data.length !== 0 && ProjectList}
            {searchLoading && <Loading />}
            {!searchLoading && data.length === 0 && <NotFound />}
          </div>
        </Tile>
        <Tile className="meta-data">
          {isProjectChosed && (
            <>
              <nav className="meta-toolbar">
                <div
                  className={
                    "meta-nav-link" +
                    (metaData === "description" ? "-selected" : "")
                  }
                  onClick={() => setMetaData("description")}
                >
                  Description
                </div>
                <div
                  className={
                    "meta-nav-link" + (metaData === "members" ? "-selected" : "")
                  }
                  onClick={() => setMetaData("members")}
                >
                  Members
                </div>
              </nav>
              <div className="meta-content">
                {metaData === "description" && (
                  <Description project={selectedProject} />
                )}
                {metaData === "members" && (
                  <MembersList project={selectedProject} />
                )}
              </div>
            </>
          )}
          {!isProjectChosed && <p>Choose a project...</p>}
        </Tile>
      </div>


      {isJoinPopupOpen && <JoinProjectPopup onClose={() => setIsJoinPopupOpen(false)} />}
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
  const formatter = new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const deadline = formatter.format(new Date(project.deadline));
  const start = formatter.format(new Date(project.start));
  return (
    <>
      <div className="text-row-date">
        <h4 className="hdate">Name:</h4> <p>{project.name}</p>
      </div>
      <div className="text-row-date">
        <h4 className="hdate owner">Owner:</h4>{" "}
        <p>{project.creator.firstName + " " + project.creator.lastName}</p>
      </div>
      <div className="text-row-date">
        <h4 className="hdate start">Start:</h4> <p>{start}</p>
      </div>
      {!(project.deadline == undefined || project.deadline == null) && (
        <div className="text-row-date">
          <h4 className="hdate deadline">Deadline:</h4> <p>{deadline}</p>
        </div>
      )}
      <div className="text-row-date">
        <h4 className="hdate status">Status:</h4> <p>{project.projectStatus.name}</p>
      </div>
      <div >
        <h4>Description:</h4>
        <textarea name="description" className="text-row-input" value={project.description} maxLength="200" rows="4" />
      </div>

    </>
  );
}
