import type { Project } from '@/lib/types';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const isCompleted = project.status === 'COMPLETED';

  return (
    <article className={`project-entry${isCompleted ? ' completed' : ''}`}>
      <h3>{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-meta">
        <span>
          <strong>Status:</strong>{' '}
          <span className={`badge badge-${isCompleted ? 'completed' : 'ongoing'}`}>
            {isCompleted ? 'Completed' : 'Ongoing'}
          </span>
        </span>

        {project.role && (
          <span><strong>Role:</strong> {project.role}</span>
        )}
        {project.funding && (
          <span><strong>Funded by:</strong> {project.funding}</span>
        )}
        {project.amount && (
          <span><strong>Amount:</strong> {project.amount}</span>
        )}
        {project.period && (
          <span><strong>Duration:</strong> {project.period}</span>
        )}
        {project.collaborators && (
          <span><strong>Collaborators:</strong> {project.collaborators}</span>
        )}
      </div>
    </article>
  );
}
