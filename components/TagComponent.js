import React, { useState } from 'react';
const TagsComponent = ({ tags, handleTagClick }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const handleClick = (tag) => {
    console.log("selected tag:",tag);
    handleTagClick(tag);
    setSelectedTag(tag);
    window.history.pushState(null, '', `/?tag=${encodeURIComponent(tag.label)}`);  };

  console.log("selected tag",selectedTag)
  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`tag ${selectedTag?.label === tag ? 'selected' : ''}`}
          onClick={() => handleClick(tag)}>
          {tag.label}
        </div>
      ))}
    </div>
  );
};

export default TagsComponent;
