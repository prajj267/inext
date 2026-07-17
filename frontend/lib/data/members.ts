import type { Member } from '@/lib/types';

export const faculty: Member[] = [
  {
    name: 'Dr. Arijit Roy',
    role: 'Lead',
    category: 'FACULTY',
    focus: 'Internet of Things (IoT), Sensor-Cloud, UAV Networks, Healthcare and Agriculture applications',
    order: 0,
    links: [
      { label: 'Email',    href: 'mailto:arijitroy@iitp.ac.in' },
      { label: 'Scholar',  href: 'https://scholar.google.com/citations?user=9Ww29AcAAAAJ' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arijit-roy-75518833/' },
      { label: 'Website',  href: 'https://arijit-iitkgp.github.io/' },
    ],
  },
];

export const phdStudents: Member[] = [
  { name: 'Arjun Singh',  role: 'PhD', category: 'PHD', order: 0, focus: 'Vision-language grounding and cross-modal retrieval',                        links: [{ label: 'Email', href: 'mailto:arjun@iitp.ac.in' }] },
  { name: 'Meera Pillai', role: 'PhD', category: 'PHD', order: 1, focus: 'Continual learning and catastrophic forgetting in neural networks',           links: [{ label: 'Email', href: 'mailto:meera@iitp.ac.in' }] },
  { name: 'Ravi Kumar',   role: 'PhD', category: 'PHD', order: 2, focus: 'Efficient transformer architectures for low-resource NLP',                    links: [{ label: 'Email', href: 'mailto:ravi@iitp.ac.in' }] },
  { name: 'Priya Sharma', role: 'PhD', category: 'PHD', order: 3, focus: 'Generative models for medical image synthesis and segmentation',              links: [{ label: 'Email', href: 'mailto:priya@iitp.ac.in' }] },
  { name: 'Suresh Nair',  role: 'PhD', category: 'PHD', order: 4, focus: 'Adversarial robustness and certified defenses in vision models',              links: [{ label: 'Email', href: 'mailto:suresh@iitp.ac.in' }] },
  { name: 'Divya Menon',  role: 'PhD', category: 'PHD', order: 5, focus: 'Graph neural networks for molecular property prediction',                     links: [{ label: 'Email', href: 'mailto:divya@iitp.ac.in' }] },
];

export const mastersStudents: Member[] = [
  { name: 'Tanvi Joshi', role: 'M.Tech', category: 'MASTERS', order: 0, focus: 'Self-supervised representation learning for video understanding', links: [{ label: 'Email', href: 'mailto:tanvi@iitp.ac.in' }] },
  { name: 'Anil Verma',  role: 'M.Tech', category: 'MASTERS', order: 1, focus: 'Dialogue systems and task-oriented conversational AI',           links: [{ label: 'Email', href: 'mailto:anil@iitp.ac.in' }] },
  { name: 'Sneha Rao',   role: 'M.Tech', category: 'MASTERS', order: 2, focus: 'Federated learning with privacy guarantees',                     links: [{ label: 'Email', href: 'mailto:sneha@iitp.ac.in' }] },
];

export const ugResearchers: Member[] = [
  {
    name: 'Rachit Panwar',
    role: 'B.Tech',
    category: 'UNDERGRAD',
    order: 0,
    focus: 'Roll No: 2201CS56 · Batch: 2022–2026',
    links: [{ label: 'Email', href: 'mailto:2201cs56@iitp.ac.in' }],
  },
  {
    name: 'Bhavik Netam',
    role: 'B.Tech',
    category: 'UNDERGRAD',
    order: 1,
    focus: 'SARQ: Symmetry Aware Rao-Blackwellized Quantum Estimators for Reinforcement Learning — IEEE ANTS 2026 · Roll No: 2201CS84 · Batch: 2022–2026',
    links: [{ label: 'Email', href: 'mailto:2201cs84@iitp.ac.in' }],
  },
  {
    name: 'Amitesh Raj',
    role: 'B.Tech',
    category: 'UNDERGRAD',
    order: 2,
    focus: 'Fair and Restricted Resource Allocation — Entanglement Routing · Roll No: 2201CS14 · Batch: 2022–2026',
    links: [{ label: 'Email', href: 'mailto:2201cs14@iitp.ac.in' }],
  },
  {
    name: 'Vinayak Goyal',
    role: 'B.Tech',
    category: 'UNDERGRAD',
    order: 3,
    focus: 'Malicious Drone in Swarm of Drones · Roll No: 2201AI52 · Batch: 2022–2026',
    links: [{ label: 'Email', href: 'mailto:2201ai52@iitp.ac.in' }],
  },
  {
    name: 'M. Umesh Chandra',
    role: 'B.Tech',
    category: 'UNDERGRAD',
    order: 4,
    focus: 'Roll No: 2201AI24 · Batch: 2022–2026',
    links: [{ label: 'Email', href: 'mailto:2201ai24@iitp.ac.in' }],
  },
  {
    name: 'Yashvant Saroj',
    role: 'B.Tech',
    category: 'UNDERGRAD',
    order: 5,
    focus: 'Development of Chatbot · Roll No: 2201AI46 · Batch: 2022–2026',
    links: [{ label: 'Email', href: 'mailto:2201ai46@iitp.ac.in' }],
  },
];

export const alumni: Member[] = [
  { name: 'Dr. Vikram Rao',  role: 'PhD Alumni',    category: 'ALUMNI', order: 0, focus: 'Now: Research Scientist, DeepMind London',        links: [{ label: 'Scholar',  href: 'https://scholar.google.com' }] },
  { name: 'Nisha Agarwal',   role: 'M.Tech Alumni', category: 'ALUMNI', order: 1, focus: 'Now: ML Engineer, Placeholder Corp Bangalore', links: [{ label: 'LinkedIn', href: 'https://linkedin.com' }] },
];
