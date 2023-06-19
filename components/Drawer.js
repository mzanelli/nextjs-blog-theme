import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { fetchData } from '../api/Posts';

const Drawer = ({ close }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = async () => {
    try {
      const data = await fetchData();
      const tagsSet = new Set();
      data.forEach((post) => {
        post.fields.tags.forEach((tag) => {
          tagsSet.add(tag.label);
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

  const handleTagClick = (tag) => {
    const queryParams = new URLSearchParams({ tag: tag }).toString();
    router.push(`/?${queryParams}`);
    close();
  };

  return (
    <div className="drawer">
      <header className="drawer-head">
        <FontAwesomeIcon onClick={handleClose} icon={faClose} />
      </header>
      <hr />
      <div className="drawer-menu">
        <div className="drawer-column">
          <ul className="drawer-list">
            {tags.map((tag, index) => index % 2 === 0 && (
              <li key={index} className="drawer-item">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                  <FontAwesomeIcon className="right-arrow" icon={faArrowRight} />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="drawer-column">
          <ul className="drawer-list">
            {tags.map((tag, index) => index % 2 !== 0 && (
              <li key={index} className="drawer-item">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                  <FontAwesomeIcon className="right-arrow" icon={faArrowRight} />
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
