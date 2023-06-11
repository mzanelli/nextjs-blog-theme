import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faClose,faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { dummyPosts } from "../public/dumyPosts";
import { useRouter } from 'next/router';


const Drawer = ({close}) => {
  
  const getAllTags = () => {
    const tagsSet = new Set();
  
    dummyPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagsSet.add(tag.label);
      });
    });
  
    const tagsArray = Array.from(tagsSet);
    tagsArray.sort();
  
    return tagsArray;
  }


  const tags = getAllTags(dummyPosts);
  const router = useRouter();

  const handleClose = () => {
    close();
  };

  const handleTagClick = (tag) => {
    console.log(tag)
    const queryParams = new URLSearchParams({ tag: tag }).toString();
    router.push(`/?${queryParams}`);
    close();
  };

  return (
    <div>
      <header className='drawer-head'>                 
         <FontAwesomeIcon onClick={handleClose}  icon={faClose} />
      </header>
      <hr/>
      <div className='drawer-menu-title'>Menu List</div>
      <ul style={{marginBottom:"20px",marginTop:"14px"}}>

      {tags.map((tag, index) => (
          <li key={index} className="drawer-item">
            <span style={{cursor:"pointer"}}
             onClick={() => handleTagClick(tag)}
            >
            {tag}<FontAwesomeIcon className="right-arrow" icon={faArrowRight} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drawer;
