import type { CSSProperties } from 'react';
import type { Article } from '../api/articleApi';
import { ArticleHeader } from '../components/page-sections/ArticleHeader';
import { ArticleHero } from '../components/page-sections/ArticleHero';
import { ArticleBody } from '../components/page-sections/ArticleBody';
import { AuthorCard } from '../components/page-sections/AuthorCard';
import { CommentsSection } from '../components/page-sections/CommentsSection';
import { RelatedArticles } from '../components/page-sections/RelatedArticles';
import { getSectionVisibility } from './sectionVisibility';

export interface ArticlePageViewProps {
  article: Article;
}

/**
 * Presentational page component.
 *
 * Takes fully-resolved data via props and renders the page.
 * Has zero knowledge of data fetching, routing, or global state —
 * which makes it trivially storybook-able and VRT-friendly.
 */
export function ArticlePageView({ article }: ArticlePageViewProps) {
  const v = getSectionVisibility(article.tier);

  const containerStyle: CSSProperties = {
    maxWidth: 800,
    margin: '0 auto',
    padding: '24px 16px',
    fontFamily: 'var(--font-sans)',
  };

  return (
    <article style={containerStyle}>
      <ArticleHeader
        title={article.title}
        tier={article.tier}
        publishedAt={article.publishedAt}
        tags={article.tags}
      />

      <ArticleHero imageUrl={article.heroImageUrl} alt={article.title} />

      <ArticleBody paragraphs={article.body} locked={v.paywall} />

      <AuthorCard author={article.author} />

      {v.comments && <CommentsSection comments={article.comments} />}

      {v.related && <RelatedArticles articles={article.related} />}
    </article>
  );
}
