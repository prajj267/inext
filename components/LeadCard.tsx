import Image from 'next/image';
import type { Member } from '@/lib/types';

interface Props {
  member: Member;
}

export default function LeadCard({ member }: Props) {
  return (
    <div className="lead-card">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`Photo of ${member.name}`}
          width={200}
          height={240}
          className="lead-photo"
        />
      ) : (
        <div
          className="lead-photo-placeholder"
          role="img"
          aria-label={`Photo of ${member.name}`}
        >
          200×240
        </div>
      )}

      <div className="lead-info">
        <h3>{member.name}</h3>
        
        {member.role && <p className="lead-role">{member.role}</p>}
        
        {member.focus && (
          <p className="lead-focus">{member.focus}</p>
        )}
        
        {member.supervisor && (
          <p className="lead-supervisor">
            <strong>Supervisor:</strong> {member.supervisor}
          </p>
        )}
        
        {member.coSupervisor && (
          <p className="lead-cosupervisor">
            <strong>Co-Supervisor:</strong> {member.coSupervisor}
          </p>
        )}
        
        {member.organization && (
          <p className="lead-organization">
            <strong>Organization:</strong> {member.organization}
          </p>
        )}
        
        {member.thesisTitle && (
          <p className="lead-thesis">
            <strong>Thesis Title:</strong> {member.thesisTitle}
          </p>
        )}
        
        {member.batch && (
          <p className="lead-batch">
            <strong>Year:</strong> {member.batch}
          </p>
        )}

        {member.links.length > 0 && (
          <div className="lead-links">
            {member.links.map((link, index) => (
              <a
                key={`${link.href}-${index}`}
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
    </div>
  );
}
