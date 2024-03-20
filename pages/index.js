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

export default function Index({ globalData,data }) {

  const [posts, setPosts] = useState(data);
  const [selectedTag, setSelectedTag] = useState("")
const router = useRouter();
  const { query } = router;

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const filterPostsByTag = (tag) => {
    if (tag) {
      let filter = [];
      for (const post of data) {
        for (const aTag of post.fields.tags.myArrayList){
            if(aTag.map.label === tag.map.label){
              filter.push(post)
            }
        }
      }
      return filter;
    }
  };

useEffect(() => {
    if(selectedTag){
          const filteredPosts = filterPostsByTag(selectedTag);
          setPosts(filteredPosts);
    }else{
      
        setPosts(data)
    }
  }, [selectedTag]);
  

useEffect(() => {
  let tag = {
    map: {
      label: query.tag
    }
  };

    if(query?.tag){
        setSelectedTag(tag)
    }else{
      setSelectedTag(null)
    }

  }, [query]);
 
  return (
   <div >
     <HeaderWeb pageType={"index"} handleTagClick={handleTagClick} name={globalData.name} />    
   <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <main className="w-full">
        <ul className="w-full">
        {posts.map((post, index) => (
            <li
              key={post.fields.slug}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >

            {post.fields.images.myArrayList ? 
            ( <ImageGallery images={post.fields.images.myArrayList}></ImageGallery>) 
            :( <ImageGallery images={post.fields.images}></ImageGallery>)}

              <Link
                as={`/posts/${post.fields.slug}`}
                href={`/posts/[slug]`}
              >
                <a className="py-2 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                {post.fields.entryTitle && <h2 className="text-2xl md:text-3xl mt-2 ">
                  {post.fields.entryTitle.slice(0, 140)}</h2>}                  
                  {post.fields.dateCreated && (
                    <p style={{ fontSize: "13px" }} className="opacity-20">
                      {new Date(post.fields.dateCreated).toLocaleDateString()}
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
             
              <TagsComponent selectedTag={selectedTag} handleTagClick={handleTagClick} tags={post.fields.tags.myArrayList} />             

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
  const data = await fetchData(); 
  return { props: { globalData, data } }; 
}

