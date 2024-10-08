import React from 'react';

const TagsComponent = ({ tags, handleTagClick, selectedTag }) => {
  const handleClick = (tag) => {
    handleTagClick(tag);
  };

  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`tag ${selectedTag?.map?.label.toLowerCase() === tag.map.label.toLowerCase() ? 'selected' : ''}`}
          onClick={() => handleClick(tag)}
        >
          {tag.map.label}
        </div>
      ))}
    </div>
  );
};

export default TagsComponent;
