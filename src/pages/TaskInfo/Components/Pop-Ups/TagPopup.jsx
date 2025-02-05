import {React,useState} from 'react';
import useTagService from '../../../../hooks/useTagService';
import TagsSection from '../../../../components/TagsSection/TagsSection';
import TagList from './Components/TagList';
const TagPopup = ({projectId,task, setShowTagPopup}) => {
    const tagService = useTagService();
    const [selectedTags, setSelectedTags] = useState([]);
    const taskId=task.taskId;
    async function handleAddTags() {
        try {
          await tagService.addtags(selectedTags, projectId, taskId);
    
          setSelectedTags([]);
          setShowTagPopup(false);
        } catch (error) {
          console.error('Error adding tags:', error);
          alert('Failed to add tags.');
        }
      }

    return (
        <div className="popup-taskinfo-overlay">
          <div className="popup-taskinfo-content">
            <TagList task={task} />
            <TagsSection tags={selectedTags} setTags={setSelectedTags} />
            <div className="popup-taskinfo-footer">
              <button
                className="close-button"
                onClick={() => setShowTagPopup(false)}
              >
                Close
              </button>
              <button
                className="add-button"
                onClick={handleAddTags}
              >
                Add
              </button>
            </div>
          </div>
        </div>
    );
};

export default TagPopup;