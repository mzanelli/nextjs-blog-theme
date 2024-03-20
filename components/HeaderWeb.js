import React, { useEffect,useState } from 'react';
import Link from 'next/link';
import SVGLogoWeb from './SVGLogoWeb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBars } from '@fortawesome/free-solid-svg-icons';
import Drawer from './Drawer';
import Modal from 'react-modal';
import { useRouter } from 'next/router';


Modal.setAppElement('#root'); 
const HeaderWeb = ({ name, tags ,handleTagClick ,pageType}) => {

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const googleAnalyticsScript = document.createElement('script');
    googleAnalyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-0EQ65L7WPY';
    googleAnalyticsScript.async = true;
    document.body.appendChild(googleAnalyticsScript);

    const adsenseScript = document.createElement('script');
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1342088144413315';
    adsenseScript.crossOrigin = 'anonymous';
    document.body.appendChild(adsenseScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-0EQ65L7WPY');

    return () => {
      document.body.removeChild(googleAnalyticsScript);
      document.body.removeChild(adsenseScript);
    };
  }, []);

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
    };

    const handleOnClick = () => {
       console.log("click");
       handleTagClick(null)
       router.push({ pathname: '/'});
    }
    console.log("page",pageType)
  return (
    <>
      <Modal
       isOpen={isOpen} 
       onRequestClose={closeModal} 
       className="Modal" 
       overlayClassName="Overlay"
       >
         <Drawer handleTagClick={handleTagClick} close={closeModal}/>
      </Modal>
      <header className="navi-bar navi-container">
             <a href="#" onClick={() => handleOnClick()}>
                  <div className='navi-logo'> 
                    <SVGLogoWeb />
                    <div>
                      <div className='navi-cia'>{name}</div>
                      <div className='subtitle'>Shouth America News</div>
                    </div>
                  </div>
                  
              </a>
              {( <div className="hamburger-container">
                  <FontAwesomeIcon onClick={openModal} className="hamburger" icon={faBars} />
              </div>)}
             
      </header>
    </>
  );
};

export default HeaderWeb;
