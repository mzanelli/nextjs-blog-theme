import React from 'react';

const TagsComponent = ({ tags }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {tags.map((tag, index) => (
        <div
          key={index}
          className='tags'
        >
          {tag.label}
        </div>
      ))}
    </div>
  );
};

export default TagsComponent;
