import fs from 'fs';
import {sync} from 'glob';
import matter from 'gray-matter';
import path from 'path';

import {FileContent} from '@/models';

export type ContentDirectory = 'posts' | 'projects' | 'snippets';

export const getSlugs = (dir: ContentDirectory): string[] => {
  const paths = sync(path.join(process.cwd(), `content/${dir}/*.mdx`));

  return paths.map((path) => {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    const [slug, ext] = fileName.split('.');
    return slug;
  });
};

export const getAllFiles = (dir: ContentDirectory) => {
  const files = getSlugs(dir)
    .map((slug) => getFileFromSlug(dir, slug))
    .sort((a, b) => {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });
  return files;
};

export const getFileFromSlug = (dir: ContentDirectory, slug: string): FileContent => {
  const filePath = path.join(process.cwd(), `content/${dir}`, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const {content, data} = matter(source);

  return {
    content,
    meta: {
      slug,
      excerpt: data.excerpt ?? '',
      title: data.title ?? slug,
      date: (data.date ?? new Date()).toString(),
      topics: (data.topics ?? []).sort(),
      cover_image: data.cover_image ?? '',
    },
  };
};
