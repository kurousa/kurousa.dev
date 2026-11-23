import { XMLParser } from 'fast-xml-parser';

export interface ZennArticle {
  title: string;
  link: string;
  pubDate: string;
  formattedDate: string;
  excerpt: string;
}

export interface ZennFeedResult {
  articles: ZennArticle[];
  failed: boolean;
}

interface RawRssItem {
  title?: unknown;
  link?: unknown;
  pubDate?: unknown;
  description?: unknown;
}

function toText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (value && typeof value === 'object' && '#text' in value) {
    const inner = (value as { '#text'?: unknown })['#text'];
    return typeof inner === 'string' ? inner : '';
  }
  return '';
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function formatExcerpt(rawDescription: string, maxLength = 110): string {
  const plain = decodeHtmlEntities(rawDescription.replace(/<[^>]*>/g, ' '))
    .replace(/^[\s!！]+/, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!plain) return '';
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
}

function formatJstDate(pubDate: string): string {
  const parsed = new Date(pubDate);
  if (Number.isNaN(parsed.getTime())) return '';

  const formatted = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsed);

  return formatted.replace(/\//g, '.');
}

export async function fetchZennArticles(
  feedUrl: string,
  limit = 6
): Promise<ZennFeedResult> {
  try {
    const response = await fetch(feedUrl, {
      signal: AbortSignal.timeout(8000),
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'kurousa.dev-portfolio-builder/1.0',
      },
    });

    if (!response.ok) {
      console.warn(
        `[zenn] Failed to fetch RSS (${response.status} ${response.statusText}) from ${feedUrl}`
      );
      return { articles: [], failed: true };
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
    });
    const parsed = parser.parse(xml) as {
      rss?: { channel?: { item?: RawRssItem | RawRssItem[] } };
    };

    const rawItems = parsed?.rss?.channel?.item;
    if (!rawItems) {
      return { articles: [], failed: false };
    }

    const itemList = Array.isArray(rawItems) ? rawItems : [rawItems];
    const articles: ZennArticle[] = [];

    for (const item of itemList.slice(0, limit)) {
      const title = toText(item.title).trim();
      const link = toText(item.link).trim();
      const pubDate = toText(item.pubDate).trim();
      const description = toText(item.description);

      if (!title || !link) continue;

      articles.push({
        title,
        link,
        pubDate,
        formattedDate: formatJstDate(pubDate),
        excerpt: formatExcerpt(description),
      });
    }

    return { articles, failed: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[zenn] Error fetching RSS from ${feedUrl}: ${message}`);
    return { articles: [], failed: true };
  }
}
