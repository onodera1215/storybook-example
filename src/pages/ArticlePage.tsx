import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { fetchArticle, type Article } from '../api/articleApi';
import { ArticlePageView } from './ArticlePageView';

export interface ArticlePageProps {
  articleId: string;
}

/**
 * Container component. Fetches the article, handles loading/error,
 * and delegates rendering to ArticlePageView.
 *
 * In Storybook this `fetch` call is intercepted by MSW — the real
 * component code runs unchanged.
 */
export function ArticlePage({ articleId }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchArticle(articleId)
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [articleId]);

  const stateStyle: CSSProperties = {
    padding: 32,
    textAlign: 'center',
    color: 'var(--color-text-muted)',
    fontFamily: 'var(--font-sans)',
  };

  if (error) {
    return <div style={stateStyle}>エラー: {error}</div>;
  }
  if (!article) {
    return <div style={stateStyle}>読み込み中...</div>;
  }
  return <ArticlePageView article={article} />;
}
