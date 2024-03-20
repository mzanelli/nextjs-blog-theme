import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { fetchData } from '../api/Posts';

const Drawer = ({ close ,handleTagClick }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = async () => {
    try {
      const data = await fetchData();
      const tagsSet = new Set();
      data.forEach((post) => {
        post.fields.tags.myArrayList.forEach((tag) => {
          tagsSet.add(tag.map.label);
        });
      });

      const tagsArray = Array.from(tagsSet).sort();
      setTags(tagsArray);
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();

  const handleClose = () => {
    close();
  };

  const handleTagClickDrawer = (tag) => {
    let aTag = {
      map: {
          label : tag
      }
    }


    handleTagClick(aTag);
    //const queryParams = new URLSearchParams({ tag: tag }).toString();
    //router.push(`/?${queryParams}`);
    close();
  };

  return (
    <div className="drawer">
      <header className="drawer-head">
        <FontAwesomeIcon onClick={handleClose} icon={faClose} />
      </header>
      <hr />
      <div className='tag-title'>Tags</div>
      <div className="drawer-menu">
        <div className="drawer-column">
          <ul className="drawer-list">
            {tags.map((tag, index) => (
              <li key={index} className="drawer-item">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTagClickDrawer(tag)}
                >
                  {tag}
                 
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
