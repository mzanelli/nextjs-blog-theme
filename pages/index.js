import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ImageGallery from '../components/ImageGallery';
import { dummyPosts } from "../public/dumyPosts";
import TagsComponent from '../components/TagComponent';
import { useRouter } from 'next/router';

import { useState,useEffect } from 'react';
import Filters from '../components/Filters';

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

  console.log(selectedTag)
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      
      <main className="w-full">
        <h1 className="title text-3xl lg:text-5xl text-center mb-3" >
          {globalData.blogTitle}
        </h1>
        <Filters selectedTag={selectedTag} handleTagRemove={handleTagRemove} />
        <ul className="w-full">
        {clientPosts.map((post, index) => (
            <li
              key={post.slug}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                as={`/posts/${post.slug}`}
                href={`/posts/[slug]`}
              >
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                  {post.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.description}
                    </p>
                  )}
                  <ImageGallery images={post.images}></ImageGallery>
                  <ArrowIcon className="mt-4" />
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
  );
}

export function getStaticProps(context) {
  const globalData = getGlobalData();
  const posts = dummyPosts;
  return { props: {  posts,globalData } };
}
