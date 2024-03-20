import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const Drawer = ({ close, handleTagClick }) => {
  const [tags, setTags] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllTags();
  }, []);

  const getAllTags = async () => {
    const topics = [
      { label: "Agriculture", value: "agriculture" },
      { label: "Economy", value: "economy" },
      { label: "Energy & Oil", value: "energy-oil" },
      { label: "Entertainment", value: "entertainment" },
      { label: "Environment", value: "environment" },
      { label: "Fisheries", value: "fisheries" },
      { label: "Health & Science", value: "health-science" },
      { label: "Investments", value: "investments" },
      { label: "Politics", value: "politics" },
      { label: "Real Estate", value: "real-estate" },
      { label: "Tourism", value: "tourism" }
    ];

    const tags = [
      { label: "Antarctica", value: "antarctica" },
      { label: "Argentina", value: "argentina" },
      { label: "Brazil", value: "brazil" },
      { label: "Chile", value: "chile" },
      { label: "Falkland Islands", value: "falkland-islands" },
      { label: "International", value: "international" },
      { label: "Latin America", value: "latin america" },
      { label: "Mercosur", value: "mercosur" },
      { label: "Pacific Alliance", value: "pacific alliance" },
      { label: "Paraguay", value: "paraguay" },
      { label: "Unasur", value: "unasur" },
      { label: "United States", value: "united states" },
      { label: "Uruguay", value: "uruguay" },
      { label: "Venezuela", value: "venezuela" }
    ];

    setTags(tags);
    setTopics(topics);
  };

  const router = useRouter();

  const handleClose = () => {
    close();
  };

  const handleTagClickDrawer = (tag) => {
    const aTag = {
      map: {
        label: tag.value
      }
    };
    handleTagClick(aTag);
    close();
  };

  return (
    <div className="drawer">
      <header className="drawer-head">
        <FontAwesomeIcon onClick={handleClose} icon={faClose} />
      </header>
      <hr />
      <div className='drawer-cont'>
        <div>
          <div className='tag-title'>Topics</div>
          <div className="drawer-menu topics">
            <ul className="drawer-list">
              {topics.map((tag, index) => (
                <li key={index} className="drawer-item">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTagClickDrawer(tag)}
                  >
                    {tag.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
        <div className='tag-title'>Regions</div>
        <div className="drawer-menu regions">
          <div className="drawer-column">
            <ul className="drawer-list">
              {tags.map((tag, index) => (
                <li key={index} className="drawer-item">
                  <span
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTagClickDrawer(tag)}
                  >
                    {tag.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </div>
      </div>
                
    
  );
};

export default Drawer;
