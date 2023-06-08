import React from 'react';

const Filters = ({ selectedTag, handleTagRemove }) => {
  if (!selectedTag) {
    return null; // If no tag is selected, don't display the filters
  }

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
