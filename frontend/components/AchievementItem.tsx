import type { Achievement } from '@/lib/types';

interface Props {
  achievement: Achievement;
}

export default function AchievementItem({ achievement }: Props) {
  return (
    <li>
      <span className="ach-year">{achievement.year}</span>
      <div className="ach-body">
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>
      </div>
    </li>
  );
}
