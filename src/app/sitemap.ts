import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/posts";

const baseUrl = "https://blog-lab.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    ...posts,
  ];
}
