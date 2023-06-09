import { getGlobalData } from '../../utils/global-data';
import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import { dummyPosts } from '../../public/dumyPosts';
import ImageGallery from '../../components/ImageGallery';
import { useRouter } from 'next/router';
import TagsComponent from '../../components/TagComponent';
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
    <Layout>
      <SEO
        title={`${post.title} - ${globalData.name}`}
        description={post.description}
      />
      <Header name={globalData.name} />

      <article className="px-6 md:px-0">
        <header>
          <h1 style={{opacity:"0.6"}} className="text-3xl md:text-5xl dark:text-white text-center mb-12">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-xl mb-4">{post.description}</p>
          )}
        </header>
        <ImageGallery images={post.images}></ImageGallery>
        <main>
          <article
            className="prose dark:prose-dark"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </main>
        <TagsComponent tags={post.tags} handleTagClick={handleTagClick} />
        <div className="grid md:grid-cols-2 lg:-mx-24 mt-12">
          {showPrevPostButton && (
            <Link href={`/posts/${prevPost.slug}`}>
              <a className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Previous
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {prevPost.title}
                </h4>
                <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
              </a>
            </Link>
          )}
          {showNextPostButton && (
            <Link href={`/posts/${nextPost.slug}`}>
              <a className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">
                  Next
                </p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">
                  {nextPost.title}
                </h4>
                <ArrowIcon className="mt-auto mx-auto md:ml-0" />
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
  );
}

export async function getStaticPaths() {
  const paths = dummyPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

function getPreviousPost(currentSlug) {
  const currentIndex = dummyPosts.findIndex(
    (post) => post.slug === currentSlug
  );
  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }
  return dummyPosts[currentIndex - 1];
}

function getNextPost(currentSlug) {
  const currentIndex = dummyPosts.findIndex(
    (post) => post.slug === currentSlug
  );
  if (currentIndex === -1 || currentIndex === dummyPosts.length - 1) {
    return null;
  }
  return dummyPosts[currentIndex + 1];
}

export async function getStaticProps({ params }) {
  const post = dummyPosts.find((post) => post.slug === params.slug);

  const prevPost = getPreviousPost(params.slug);
  const nextPost = getNextPost(params.slug);

  const globalData = await getGlobalData();

  return {
    props: {
      globalData,
      post: post,
      prevPost,
      nextPost,
    },
  };
}
