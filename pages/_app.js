import GoogleAnalytics from '../components/GoogleAnalytics';
import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

import Modal from 'react-modal';



function MyApp({ Component, pageProps }) {
  return (
    <div id="root">
      <span className="theme-bejamas" />
      <Component {...pageProps} />
      <GoogleAnalytics/>
    </div>
  );
}

export default MyApp;
