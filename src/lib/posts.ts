import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { cache, type ReactNode } from "react";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

type PostFrontmatter = {
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  tags: string[];
};

export type PostSummary = PostFrontmatter & {
  slug: string;
};

export type PostDocument = PostSummary & {
  content: ReactNode;
};

function getSlugFromFilename(fileName: string): string {
  return fileName.replace(/\.mdx$/, "");
}

function normalizeDateValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  throw new Error("publishedAt frontmatter must be a date string.");
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeFrontmatter(slug: string, data: Record<string, unknown>): PostSummary {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const excerpt = typeof data.excerpt === "string" ? data.excerpt.trim() : "";
  const publishedAt = normalizeDateValue(data.publishedAt);
  const readingTime = typeof data.readingTime === "string" ? data.readingTime.trim() : "";
  const featured = typeof data.featured === "boolean" ? data.featured : false;
  const tags = normalizeTags(data.tags);

  if (!title) {
    throw new Error(`"${slug}.mdx" is missing a title frontmatter value.`);
  }

  if (!excerpt) {
    throw new Error(`"${slug}.mdx" is missing an excerpt frontmatter value.`);
  }

  if (!readingTime) {
    throw new Error(`"${slug}.mdx" is missing a readingTime frontmatter value.`);
  }

  return {
    slug,
    title,
    excerpt,
    publishedAt,
    readingTime,
    featured,
    tags,
  };
}

function parsePostSource(slug: string, source: string) {
  const { content, data } = matter(source);

  return {
    metadata: normalizeFrontmatter(slug, data as Record<string, unknown>),
    body: content.trim(),
  };
}

async function getPostFileNames(): Promise<string[]> {
  const entries = await fs.readdir(POSTS_DIRECTORY, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);
}

async function readPostSource(slug: string): Promise<string | null> {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);

  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

function sortPosts(posts: PostSummary[]): PostSummary[] {
  return posts.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
  const fileNames = await getPostFileNames();

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = getSlugFromFilename(fileName);
      const source = await fs.readFile(path.join(POSTS_DIRECTORY, fileName), "utf8");

      return parsePostSource(slug, source).metadata;
    }),
  );

  return sortPosts(posts);
});

export const getFeaturedPosts = cache(async (): Promise<PostSummary[]> => {
  const posts = await getAllPosts();

  return posts.filter((post) => post.featured);
});

export const getPostBySlug = cache(async (slug: string): Promise<PostDocument | null> => {
  const source = await readPostSource(slug);

  if (!source) {
    return null;
  }

  const { metadata, body } = parsePostSource(slug, source);
  const { content } = await compileMDX({
    source: body,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    ...metadata,
    content,
  };
});

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}
