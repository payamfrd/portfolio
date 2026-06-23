import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);

  return files.map((file) => {
    const slug = file.replace(".mdx", "");

    const fullPath = path.join(postsDirectory, file);

    const fileContent = fs.readFileSync(fullPath, "utf8");

    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    };
  });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  const fileContent = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContent);

  const stats = readingTime(content);

  return {
    slug,
    content,
    readingTime: stats.text,
    ...data,
  };
}

export function getFeaturedPosts() {
  const posts = getAllPosts();

  return posts.slice(0, 3);
}

export function getRelatedPosts(currentSlug) {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)

    .slice(0, 3);
}
