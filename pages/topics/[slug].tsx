import type {GetStaticPaths, GetStaticProps} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';

import PostList from '@/components/blog/PostList';
import NoData from '@/components/share/NoData';
import TopicList from '@/components/share/TopicList';
import {getAllFiles} from '@/lib/file';
import {FileMeta} from '@/models';

export default function TopicPage({topic, topics, files}: {topic: string; topics: string[]; files: FileMeta[]}) {
  const router = useRouter();

  function updateQuery(topic: string) {
    router.push(`${topic}`, undefined);
  }

  return (
    <>
      <Head>
        <title>Topic: {topic}</title>
      </Head>
      <section className="bg-white dark:bg-gray-900" id="project">
        <div className="container m-auto space-y-6 py-10 px-6 lg:space-y-10 lg:py-20">
          <div className="space-y-4">
            <label className="text-xl">Search posts by topics</label>
            <TopicList topics={topics} currentTopicChange={updateQuery} currentTopic={topic} />
          </div>

          <h2 className="text-center text-2xl lg:mb-10 lg:text-left lg:text-5xl">
            Topic<strong className="ml-6 text-king-500">{topic}</strong>
          </h2>

          {files.length === 0 ? <NoData /> : <PostList posts={files} syncInputWithQuery={updateQuery} term={topic} />}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug} = params as {slug: string};
  const files = getAllFiles('posts');

  const topics = Array.from(new Set(files.map((f) => f.meta.topics).flat()));

  const filteredFiles = files.filter((f) => f.meta.topics?.includes(slug));

  return {
    props: {
      topics,
      topic: slug,
      files: filteredFiles.map((f) => f.meta),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = getAllFiles('posts');
  const topics = new Set(files.map((f) => f.meta.topics).flat());
  const paths = Array.from(topics).map((topic) => ({params: {slug: topic}}));

  return {
    paths,
    fallback: false,
  };
};
