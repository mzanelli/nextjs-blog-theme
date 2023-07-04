import React, { useState } from 'react';
const TagsComponent = ({ tags, handleTagClick,selectedTag }) => {
  const handleClick = (tag) => {
    handleTagClick(tag);
   };
  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`tag ${selectedTag?.label === tag.label ? 'selected' : ''}`}
          onClick={() => handleClick(tag)}>
          {tag.label}
        </div>
      ))}
    </div>
  );
};
export default TagsComponent;
