import React, { useEffect } from 'react';
import Link from 'next/link';
import SVGLogoWeb from './SVGLogoWeb';
const HeaderWeb = ({ name }) => {
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
      // Clean up the scripts when the component unmounts
      document.body.removeChild(googleAnalyticsScript);
      //document.body.removeChild(adsenseScript);

    };
  }, []);

  return (
    <header className="navi-bar">
     <Link href="/">
        <a>
          <div className='navi-container'>
            <SVGLogoWeb />
            <div className='navi-cia'>{name}</div>
          </div>
        </a>
      </Link>  
    </header>
  );
};

export default HeaderWeb;
