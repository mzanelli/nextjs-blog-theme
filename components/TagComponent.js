import React, { useState } from 'react';
import { useRouter } from 'next/router';
const TagsComponent = ({ tags, handleTagClick }) => {
  const [selectedTag, setSelectedTag] = useState(null);
  const router = useRouter();
  const handleClick = (tag) => {
    handleTagClick(tag);
    setSelectedTag(tag);
    //router.push({ pathname: '/', query: { tag: tag.label } });
  };

  return (
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`tag ${selectedTag === tag ? 'selected' : ''}`}
          onClick={() => handleClick(tag)}
        >
          {tag.label}
        </div>
      ))}
    </div>
  );
};

export default TagsComponent;
