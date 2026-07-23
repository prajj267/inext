import Image from 'next/image';
import type { Member } from '@/lib/types';

interface Props {
  member: Member;
}

export default function MemberCard({ member }: Props) {
  return (
    <div className="member-card">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}`}
          width={100}
          height={120}
          className="member-photo"
        />
      ) : (
        <div
          className="member-photo-placeholder"
          role="img"
          aria-label={`Photo of ${member.name}`}
        >
          100×120
        </div>
      )}

      <h3>{member.name}</h3>
      
      {/* Show role only if it exists */}
      {member.role && <p className="member-role">{member.role}</p>}
      
      {/* Show focus */}
      <p className="member-focus">{member.focus}</p>
      
      {/* Show optional fields if they exist */}
      {member.organization && (
        <p className="member-organization">
          <strong>Organization:</strong> {member.organization}
        </p>
      )}
      {member.thesisTitle && (
        <p className="member-thesis">
          <strong>Thesis Title:</strong> {member.thesisTitle}
        </p>
      )}
      {member.batch && (
        <p className="member-batch">
          <strong>Batch:</strong> {member.batch}
        </p>
      )}

      {member.links.length > 0 && (
        <div className="member-links">
          {member.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener'}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
