export const getGlobalData = () => {

  const name = process.env.BLOG_NAME ? decodeURI(process.env.BLOG_NAME) : "The Chronist";
  const blogTitle = process.env.BLOG_TITLE ? decodeURI(process.env.BLOG_TITLE) : "The Chronist";
  const footerText = process.env.BLOG_FOOTER_TEXT ? decodeURI(process.env.BLOG_FOOTER_TEXT) : "@2023 Chronist.netlify.app";

  return {
    name,
    blogTitle,
    footerText
  };
};