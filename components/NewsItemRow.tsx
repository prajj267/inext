import type { NewsTag } from '@/lib/types';
import { parseBold } from '@/lib/boldText';

// Accept both DB uppercase and legacy lowercase tags
type AnyTag = NewsTag | string;

const tagLabels: Record<string, string> = {
  PAPER: 'Paper', AWARD: 'Award', TALK: 'Talk', EVENT: 'Event', MISC: 'Misc',
  paper: 'Paper', award: 'Award', talk:  'Talk', event: 'Event', misc: 'Misc',
};

const tagClass: Record<string, string> = {
  PAPER: 'tag-paper', AWARD: 'tag-award', TALK: 'tag-talk', EVENT: 'tag-event', MISC: 'tag-misc',
  paper: 'tag-paper', award: 'tag-award', talk:  'tag-talk', event: 'tag-event', misc: 'tag-misc',
};

interface Props {
  item: { date: string; tag: AnyTag; body: string };
}

export default function NewsItemRow({ item }: Props) {
  return (
    <li>
      <span className="news-date">{item.date}</span>
      <div className="news-body">
        <span className={`news-tag ${tagClass[item.tag] ?? 'tag-misc'}`}>
          {tagLabels[item.tag] ?? item.tag}
        </span>
        {parseBold(item.body)}
      </div>
    </li>
  );
}
