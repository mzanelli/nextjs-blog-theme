import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import {fetchData} from '../api/Posts'

const Drawer = ({ close }) => {
  const  getAllTags = async () => {
    const tagsSet = new Set();
    let post2 = null;
    try {
      const data = await fetchData();
      post2 = data;
    } catch (error) {
      console.error(error);
    }
    post2.forEach((post) => {
      post.tags.forEach((tag) => {
        tagsSet.add(tag.label);
      });
    });

    const tagsArray = Array.from(tagsSet);
    tagsArray.sort();

    return tagsArray;
  };

  const tags = getAllTags();
  const router = useRouter();

  const handleClose = () => {
    close();
  };

  const handleTagClick = (tag) => {
    console.log(tag);
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
            {tags.map((tag, index) => (
              index % 2 === 0 && (
                <li key={index} className="drawer-item">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                    <FontAwesomeIcon className="right-arrow" icon={faArrowRight} />
                  </span>
                </li>
              )
            ))}
          </ul>
        </div>
        <div className="drawer-column">
          <ul className="drawer-list">
            {tags.map((tag, index) => (
              index % 2 !== 0 && (
                <li key={index} className="drawer-item">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                    <FontAwesomeIcon className="right-arrow" icon={faArrowRight} />
                  </span>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
