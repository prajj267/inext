import type { Publication } from '@/lib/types';

interface Props {
  pub: Publication;
}

export default function PublicationEntry({ pub }: Props) {
  return (
    <article className="pub-entry">
      <p className="pub-title">{pub.title}</p>

      <p className="pub-authors">
        {pub.authors.map((seg, i) => (
          <span key={i}>
            {i > 0 && ', '}
            {seg.bold ? <strong>{seg.text}</strong> : seg.text}
          </span>
        ))}
      </p>

      <p className="pub-venue">{pub.venue}</p>

      <div className="pub-links">
        {pub.pdfPath && (
          <a href={pub.pdfPath} target="_blank" rel="noopener">
            PDF
          </a>
        )}
        {pub.doiUrl && (
          <a href={pub.doiUrl} target="_blank" rel="noopener">
            DOI
          </a>
        )}
      </div>
    </article>
  );
}
