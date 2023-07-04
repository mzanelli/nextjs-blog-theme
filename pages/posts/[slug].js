import { getGlobalData } from '../../utils/global-data';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import HeaderWeb from '../../components/HeaderWeb';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import ImageGallery from '../../components/ImageGallery';
import { useRouter } from 'next/router';
import TagsComponent from '../../components/TagComponent';
import {fetchData} from '../../api/Posts'

const components = {
  a: CustomLink,
  Head,
};

export default function PostPage({
  post,
  prevPost,
  nextPost,
  globalData,
}) {
  const showPrevPostButton = prevPost !== null;
  const showNextPostButton = nextPost !== null;
  const router = useRouter();
  const handleTagClick = (tag) => {
    const queryParams = new URLSearchParams({ tag: tag.label }).toString();
    router.push(`/?${queryParams}`);
  };

  return (
    <div>
      <HeaderWeb name={globalData.name} />
      <Layout>
      <SEO
        title={`${post.fields.entryTitle} - ${globalData.name}`}
        description={post.fields.description.content[0].content[0].value}
      />
      
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-8 mt-4 opacity-60">
            {post.fields.entryTitle}
          </h1>
         
            <p className="text-xl mb-8 opacity-60">{post.fields.description.content[0].content[0].value}</p>
        
        </header>
        {post.fields.images.myArrayList ? 
            ( <ImageGallery images={post.fields.images.myArrayList}></ImageGallery>) 
            :( <ImageGallery images={post.fields.images}></ImageGallery>)}

        <main>
        {post.fields.content.content.map((item, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: item.content[0]?.value }} />
        ))}
        </main>
        
        <div className="grid md:grid-cols-2 lg:-mx-24 mt-12">
          {showPrevPostButton && (
            <Link href={`/posts/${prevPost.fields?.slug}`}>
              <a className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Previous
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white opacity-60">
                  {prevPost.fields.entryTitle}
                </h4>
                <ArrowIcon right={false} className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
              </a>
            </Link>
          )}
          {showNextPostButton && (
            <Link href={`/posts/${nextPost.fields?.slug}`}>
              <a className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Next
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white opacity-60">
                {nextPost.fields.entryTitle}
                </h4>
                <ArrowIcon right={true} className="mt-auto mx-auto md:ml-0" />
              </a>
            </Link>
          )}
        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="absolute -top-32 opacity-30 dark:opacity-50"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
    </div>
  );
}

export async function getStaticPaths() {

  let post2 = null;
  try {
    const data = await fetchData();
    post2 = data;
  } catch (error) {
    console.error(error);
  }
  const paths = post2.map((post) => ({
    params: { slug: post.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

function getPreviousPost(currentSlug,posts) {
  const currentIndex = posts.findIndex(
    (post) => post.fields.slug === currentSlug
  );
  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }
  return posts[currentIndex - 1];
}

function getNextPost(currentSlug,posts) {
  const currentIndex = posts.findIndex(
    (post) => post.fields.slug === currentSlug
  );

  if (currentIndex === -1 || currentIndex === posts.length - 1) {
    return null;
  }
  let value = posts[currentIndex + 1];
  return value;
}

export async function getStaticProps({ params }) {
  let post2 = null;
  try {
    const data = await fetchData();
    post2 = data; 
  } catch (error) {
    console.error(error);
  }

  let postSlug = post2.find((post) => post.fields.slug === params.slug);

  const prevPost = getPreviousPost(params.slug,post2);
  const nextPost = getNextPost(params.slug,post2);

  const globalData = await getGlobalData();

  return {
    props: {
      globalData,
      post: postSlug,
      prevPost,
      nextPost,
    },
  };
}
