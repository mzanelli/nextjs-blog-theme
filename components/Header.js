import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SVGLogo from './SVGLogo';

const Header = ({ name }) => {
  useEffect(() => {
    const googleAnalyticsScript = document.createElement('script');
    googleAnalyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-VG0DJG638B';
    googleAnalyticsScript.async = true;
    document.body.appendChild(googleAnalyticsScript);

    const adsenseScript = document.createElement('script');
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1342088144413315';
    adsenseScript.crossOrigin = 'anonymous';
    document.body.appendChild(adsenseScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-VG0DJG638B');

    return () => {
      // Clean up the scripts when the component unmounts
      document.body.removeChild(googleAnalyticsScript);
      document.body.removeChild(adsenseScript);
    };
  }, []);

  return (
    <header className="pt-2 pb-2">
     <Link href="/">
        <a>
          <SVGLogo />
        </a>
      </Link>
      {name && 
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
      }
    </header>
  );
};

export default Header;
