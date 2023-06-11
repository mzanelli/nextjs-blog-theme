import Link from 'next/link';
import Footer from '../components/Footer';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ImageGallery from '../components/ImageGallery';
import { dummyPosts } from "../public/dumyPosts";
import TagsComponent from '../components/TagComponent';
import { useRouter } from 'next/router';

import { useState,useEffect } from 'react';
import HeaderWeb from '../components/HeaderWeb';

export default function Index({ posts, globalData }) {

  const [clientPosts, setClientPosts] = useState(posts);
  const [selectedTag, setSelectedTag] = useState(null);
  const router = useRouter();

  const { query } = router;

  const handleTagClick = (tag) => {
    let filterdPosts = filterPostsByTag(tag);
    setClientPosts(filterdPosts);
    setSelectedTag(tag);
  };

  const handleTagRemove = () => {
    setSelectedTag(null);
    setClientPosts(posts)
  }

  const filterPostsByTag = (tag) => {
    if (tag) {
      let filter = [];
      for (const post of posts) {
        for (const aTag of post.tags){
            if(aTag.label === tag.label){
              console.log(aTag.label)
              filter.push(post)
            }
        }
      }
      return filter;
    }
  };

  useEffect(() => {
    let filterdPost = null;
    if (query.tag) {

      let requestTag = {
        label:query.tag
      }

      setSelectedTag(requestTag);

      filterdPost = filterPostsByTag(requestTag);
      setClientPosts(filterdPost)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.tag,query]);

  return (
   <div >
     <HeaderWeb name={globalData.name} />    
   <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
     
      <main className="w-full">
        <ul className="w-full">
        {clientPosts.map((post, index) => (
            <li
              key={post.slug}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <ImageGallery images={post.images}></ImageGallery>
              <Link
                as={`/posts/${post.slug}`}
                href={`/posts/[slug]`}
              >
                <a className="py-2 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.title && <h2 className="text-2xl md:text-3xl mt-2 ">{post.title}</h2>}
                  {post.date && (
                    <p style={{fontSize:"13px"}} className='opacity-20'>
                      {post.date}
                    </p>
                  )}
                  {post.description && (
                    <p className="text-lg mt-4">
                      {post.description}
                    </p>
                  )}
                  <ArrowIcon right={true} className="mt-4" />
                </a>
              </Link>
              <TagsComponent handleTagClick={handleTagClick} tags={post.tags} />
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
   </Layout>
   </div>
  );
}

export function getStaticProps(context) {
  const globalData = getGlobalData();
  const posts = dummyPosts;
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { props: {  posts,globalData } };
}
