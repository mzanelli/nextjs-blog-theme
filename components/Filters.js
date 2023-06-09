import React from 'react';

const Filters = ({ selectedTag, handleTagRemove }) => {
  if (!selectedTag) {
    return null; 
  }
  console.log(selectedTag)
  return (
    <div className="filters-container">
        <span>Filters: </span>
      <div className="tag selected">
        {selectedTag.label}
        <button className="remove-btn" onClick={() => handleTagRemove()}>
          x
        </button>
      </div>
    </div>
  );
};

export default Filters;
