import {React, useState} from 'react';
import Tag from './Tag.jsx';
import useTagService from '../../../hooks/useTagService.js';
import useProject from '../../../hooks/useProject.js';
const TagList = ({task}) => {
    const tagService = useTagService();
    const projectContext = useProject();
    const isDeveloper=projectContext.isDeveloper();
    const [tags, setTags] = useState(task.tags||[]);
    async function HandleTagDelete(tagId) {
        try {
          console.log(task.taskId, tagId);
          const response = await tagService.deleteTag(projectContext.currentProject.projectId,task.taskId,tagId);
          if (response) {
            console.log('Tag deleted successfully:', response);
            setTags(tags.filter(tag => tag.tagId !== tagId));
          }
        } catch (error) {
          console.error('Error deleting tag:', error.message);
          alert('Failed to delete tag.');
        }
        
      }
    return (
        <div className='task-info-tag-list'>
            {tags.map((tag, index) => (
              isDeveloper ? (
                <Tag key={index} tag={tag} />
              ) : (
                <Tag key={index} tag={tag} OnDelete={HandleTagDelete} />
              )
            ))}
        </div>
    );
};

export default TagList;