export const getGlobalData = () => {

  const name = process.env.BLOG_NAME ? decodeURI(process.env.BLOG_NAME) : "Chronist.netfly.app";
  const blogTitle = process.env.BLOG_TITLE ? decodeURI(process.env.BLOG_TITLE) : "Chronist.netfly.app";
  const footerText = process.env.BLOG_FOOTER_TEXT ? decodeURI(process.env.BLOG_FOOTER_TEXT) : "@2023 Chronist.netfly.app";

  return {
    name,
    blogTitle,
    footerText
  };
};