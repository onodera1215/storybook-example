export type Tier = 'free' | 'premium' | 'enterprise';

export interface Author {
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface RelatedArticle {
  id: string;
  title: string;
  excerpt: string;
}

export interface Article {
  id: string;
  tier: Tier;
  title: string;
  heroImageUrl: string;
  publishedAt: string;
  body: string[];
  tags: string[];
  author: Author;
  comments: Comment[];
  related: RelatedArticle[];
}

/**
 * Fetch article data from the API.
 * In Storybook, this request is intercepted by MSW handlers.
 * In production, it hits the real backend.
 */
export async function fetchArticle(id: string): Promise<Article> {
  const res = await fetch(`/api/articles/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch article ${id}: ${res.status}`);
  }
  return res.json();
}
