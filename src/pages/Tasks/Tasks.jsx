
import useTaskService from '../../hooks/useTaskService.js';

export default function Tasks({
    role,
    projectId
})
{
  const [data, setData] = useState([]);
  const taskService=useTaskService();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const result = await taskService.getTasks(projectId);
      setData(result);
      setLoading(false);
      setOriginal(result);
    }
    fetchData();
  }, []);
  
return(
    <div className="toolbar">
        
    </div>
);
  
}