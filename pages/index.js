import Link from 'next/link';
import Footer from '../components/Footer';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import ImageGallery from '../components/ImageGallery';
import TagsComponent from '../components/TagComponent';
import { useRouter } from 'next/router';
import {fetchData} from '../api/Posts'
import { useState,useEffect } from 'react';
import HeaderWeb from '../components/HeaderWeb';

export default function Index({ globalData,post2 }) {

  const [clientPosts2, setClientPosts2] = useState(post2);
  const router = useRouter();
  const { query } = router;

  const handleTagClick = (tag) => {
    console.log("filter tag: " + tag)
    let filterdPosts = filterPostsByTag(tag);
    setClientPosts2(filterdPosts);
  };

  const filterPostsByTag = (tag) => {
    console.log("filter 1")
    if (tag) {
          console.log("filter 2")

      let filter = [];
      for (const post of post2) {
        for (const aTag of post.fields.tags){
            if(aTag.label === tag.label){
              filter.push(post)
            }
        }
      }
      return filter;
    }
  };

  useEffect(() => {
    let filterdPost = null;
    console.log("efect 1")
    if (query.tag !== "All") {
      let requestTag = {
        label:query.tag
      }
      console.log("efect 2 ", query.tag)

      filterdPost = filterPostsByTag(requestTag);
      setClientPosts2(filterdPost)
    }else{
      fetchData().then(data => {
        setClientPosts2(data)
      }).catch(error => {
        console.error(error);
      });
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
        {clientPosts2.map((post, index) => (
            <li
              key={post.fields.slug}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
             <ImageGallery images={post.fields.images}></ImageGallery>
              <Link
                as={`/posts/${post.fields.slug}`}
                href={`/posts/[slug]`}
              >
                <a className="py-2 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.fields.entryTitle && <h2 className="text-2xl md:text-3xl mt-2 ">{post.fields.entryTitle}</h2>}
                  {post.fields.dateCreated && (
                    <p style={{fontSize:"13px"}} className='opacity-20'>
                      {post.fields.dateCreated}
                    </p>
                  )}
                  {post.fields.description.content && (
                    <p className="text-lg mt-4">
                      {post.fields.description.content[0].content[0].value}
                    </p>
                  )}
                  <ArrowIcon right={true} className="mt-4" />
                </a>
              </Link>
              <TagsComponent handleTagClick={handleTagClick} tags={post.fields.tags} />

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

export async function getStaticProps(context) {
  const globalData = getGlobalData();
  let post2 = null;
  try {
    const data = await fetchData();
    post2 = data;
  } catch (error) {
    console.error(error);
  }
  return { props: { globalData, post2 } };
}

