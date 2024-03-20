import React, { useState } from 'react';
const TagsComponent = ({ tags, handleTagClick,selectedTag }) => {
  const handleClick = (tag) => {
    handleTagClick(tag);
   };
  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <>
         <div
          key={tag.label}
          className={`tag ${selectedTag?.map?.label === tag.map.label ? 'selected' : ''}`}
          onClick={() => handleClick(tag)}>
          {tag.map.label}
        </div>
        </>
      ))}
    </div>
  );
};
export default TagsComponent;
