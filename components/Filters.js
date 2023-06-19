import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Filters = ({ selectedTag, handleTagRemove }) => {
  if (!selectedTag) {
    return null; 
  }
  return (
    <div className="filters-container">
        <span style={{color:"#000", marginLeft:"24px",opacity:"0.6"}}>Filters: </span>
      <div className="tag selected" style={{width:"115px"}}>
        {selectedTag.label}
      </div>
      <button className="remove-filter-button" onClick={handleTagRemove}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
    </div>
  );
};

export default Filters;
