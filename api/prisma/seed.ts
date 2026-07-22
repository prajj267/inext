/**
 * prisma/seed.ts
 * Seeds the database with the current hardcoded content.
 * Run with: npx prisma db seed
 */
import { PrismaClient, MemberCategory, ProjectStatus, NewsTag, AchievementCategory } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Admin user ──────────────────────────────────────────────
  // Change this password before deploying!
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? 'changeme123', 12);
  await prisma.adminUser.upsert({
    where:  { email: 'arijitroy@iitp.ac.in' },
    update: { passwordHash },
    create: { email: 'arijitroy@iitp.ac.in', passwordHash },
  });
  console.log('✓ Admin user');

  // ─── Members ─────────────────────────────────────────────────
  await prisma.memberLink.deleteMany();
  await prisma.member.deleteMany();

  const members: Array<{
    name: string; role: string; category: MemberCategory;
    focus: string; photo?: string; order: number;
    links: Array<{ label: string; href: string }>;
  }> = [
    {
      name: 'Dr. Arijit Roy', role: 'Lead', category: MemberCategory.FACULTY,
      focus: 'Internet of Things (IoT), Sensor-Cloud, UAV Networks, Healthcare and Agriculture applications',
      order: 0,
      photo: '/images/members/arijit_roy.jpeg',
      links: [
        { label: 'Email',    href: 'mailto:arijitroy@iitp.ac.in' },
        { label: 'Scholar',  href: 'https://scholar.google.com/citations?user=9Ww29AcAAAAJ' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arijit-roy-75518833/' },
        { label: 'Website',  href: 'https://arijit-iitkgp.github.io/' },
      ],
    },
    { name: 'Arti',            role: 'M.Tech Alumni', category: MemberCategory.ALUMNI, order: 0,
      focus: 'Enhancing Soccer Analytics with Real-Time Deep Vision Systems · Batch: 2023–2025',
      links: [{ label: 'Email', href: 'mailto:2311ai12@iitp.ac.in' }] },
    { name: 'Ayush',           role: 'M.Tech Alumni', category: MemberCategory.ALUMNI, order: 1,
      focus: 'HFSDN: Hierarchical Federated Learning Based SDN Architecture for Fault-Tolerance · Batch: 2023–2025',
      links: [{ label: 'Email', href: 'mailto:2311cs01@iitp.ac.in' }] },
    { name: 'Bharat',          role: 'M.Tech Alumni', category: MemberCategory.ALUMNI, order: 2,
      focus: 'Batch: 2023–2025',
      links: [{ label: 'Email', href: 'mailto:2311ai63@iitp.ac.in' }] },
    { name: 'Manas Dubey',     role: 'M.Tech Alumni', category: MemberCategory.ALUMNI, order: 3,
      focus: 'Pricing-Aware Optimal Fog UAV Selection for Fog-enabled UAV-as-a-Service · Batch: 2022–2024',
      links: [{ label: 'Email', href: 'mailto:2211ai21@iitp.ac.in' }] },
    { name: 'Vicky Jeswani',   role: 'M.Tech Alumni', category: MemberCategory.ALUMNI, order: 4,
      focus: 'Batch: 2022–2024',
      links: [{ label: 'Email', href: 'mailto:2211cs17@iitp.ac.in' }] },
    { name: 'Karan Yadav',     role: 'M.Tech', category: MemberCategory.MASTERS, order: 0,
      focus: 'AI, UAV, IoT, Machine Learning',
      photo: '/images/members/karan_yadav.jpeg',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karanydv/' }
      ] },
    { name: 'Mudita Gamre',    role: 'M.Tech', category: MemberCategory.MASTERS, order: 1,
      focus: 'IoT, Agentic AI, Large Language Models (LLM)',
      photo: '/images/members/mundita.jpeg',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mudita-gamre-2b3515216/' }
      ] },
    {
      name: 'Abhishek Kumar Pandey', role: 'PhD', category: MemberCategory.PHD, order: 0,
      focus: 'Computer Networks, UAV-Assisted Wireless Communications, 5G/6G Networks',
      photo: '/images/members/PHD/abhishek.jpeg',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abhishek-pandey-545157230/' }
      ],
    },
    {
      name: 'Rudra Pratap Singh', role: 'PhD', category: MemberCategory.PHD, order: 1,
      focus: 'IoT, Quantum IoT, and UAV Systems',
      photo: '/images/members/PHD/rudra.jpeg',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rudra-pratap-singh-a87024213' }
      ],
    },
    {
      name: 'Prince Kumar', role: 'PhD', category: MemberCategory.PHD, order: 2,
      focus: 'IoT, UAVs, Game Theory, Distributed Machine Learning',
      photo: '/images/members/PHD/prince.jpg',
      links: [
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prince80/' }
      ],
    },
    { name: 'Deepanker Jauhari',     role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 0,
      focus: 'Roll No: 2101CS23 · Batch: 2021–2025',
      links: [{ label: 'Email', href: 'mailto:2101cs23@iitp.ac.in' }] },
    { name: 'Ankith Kumar',          role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 1,
      focus: 'Roll No: 2101AI12 · Batch: 2021–2025',
      links: [{ label: 'Email', href: 'mailto:2101ai12@iitp.ac.in' }] },
    { name: 'Vineet Kumar',          role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 2,
      focus: 'Roll No: 2101CS83 · Batch: 2021–2025',
      links: [{ label: 'Email', href: 'mailto:2101cs83@iitp.ac.in' }] },
    { name: 'Jasmine Shrivastava',   role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 3,
      focus: 'Roll No: 2101CS33 · Batch: 2021–2025',
      links: [{ label: 'Email', href: 'mailto:2101cs33@iitp.ac.in' }] },
    { name: 'Haritha Reddy',         role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 4,
      focus: 'Roll No: 2101AI20 · Batch: 2021–2025',
      links: [{ label: 'Email', href: 'mailto:2101ai20@iitp.ac.in' }] },
    { name: 'Jayanth Marupaka',      role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 5,
      focus: 'Roll No: 2101CS44 · Batch: 2021–2025',
      links: [{ label: 'Email', href: 'mailto:2101cs44@iitp.ac.in' }] },
    { name: 'Harshvardhan Singh',    role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 6,
      focus: 'DL-based Math Predictor Module · Roll No: 2201CS92 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201cs92@iitp.ac.in' }] },
    { name: 'Rahul Chandu Nikhate',  role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 7,
      focus: 'Resource-Adaptive Trust Grading for Unlearning-Assisted Resilient Distributed Learning · Roll No: 2201CS57 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201cs57@iitp.ac.in' }] },
    { name: 'Rachit Panwar',         role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 8,
      focus: 'Roll No: 2201CS56 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201cs56@iitp.ac.in' }] },
    { name: 'Bhavik Netam',          role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 9,
      focus: 'SARQ: Symmetry Aware Rao-Blackwellized Quantum Estimators for Reinforcement Learning — Conference Paper submitted in IEEE ANTS 2026 · Roll No: 2201CS84 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201cs84@iitp.ac.in' }] },
    { name: 'Amitesh Raj',           role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 10,
      focus: 'Fair and Restricted Resource Allocation — Entanglement Routing · Roll No: 2201CS14 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201cs14@iitp.ac.in' }] },
    { name: 'Vinayak Goyal',         role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 11,
      focus: 'Malicious Drone in Swarm of Drones · Roll No: 2201AI52 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201ai52@iitp.ac.in' }] },
    { name: 'M. Umesh Chandra',      role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 12,
      focus: 'Roll No: 2201AI24 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201ai24@iitp.ac.in' }] },
    { name: 'Yashvant Saroj',        role: 'B.Tech', category: MemberCategory.UNDERGRAD, order: 13,
      focus: 'Development of Chatbot · Roll No: 2201AI46 · Batch: 2022–2026',
      links: [{ label: 'Email', href: 'mailto:2201ai46@iitp.ac.in' }] },
    // ── Interns ──────────────────────────────────────────────
    { name: 'Veera Manikantha Rayudu Tummala', role: 'Research Intern', category: MemberCategory.INTERN, order: 0,
      focus: 'CuPric: Customer Segment-Based Pricing in Mobile Sensors-as-a-Service — Paper in IEEE TSC · Year: 2024 · IIIT SriCity',
      links: [] },
    { name: 'Anshu Kumar', role: 'Research Intern', category: MemberCategory.INTERN, order: 1,
      focus: 'Collaborative Task Execution for UAV-as-a-Service using Stackelberg Game · Year: 2024 · NIT Warangal',
      links: [] },
    { name: 'Aryan Garv', role: 'Research Intern', category: MemberCategory.INTERN, order: 2,
      focus: 'DESTIN: Dynamic Device Selection for Mobile Sensors-as-a-Service Platforms — Publication in IEEE WCNC 2026 · Year: 2024 · Manipal University Jaipur',
      links: [] },
    { name: 'Swoyam Swarup Nanda', role: 'Research Intern', category: MemberCategory.INTERN, order: 3,
      focus: 'DESTIN: Dynamic Device Selection for Mobile Sensors-as-a-Service Platforms — Publication in IEEE WCNC 2026 · Year: 2024 · IIIT Bhubaneswar',
      links: [] },
    { name: 'Mohd Asif', role: 'Research Intern', category: MemberCategory.INTERN, order: 4,
      focus: 'Year: 2024 · Guru Gobind Singh Indraprastha University',
      links: [] },
    { name: 'Harshita Srivastava', role: 'Research Intern', category: MemberCategory.INTERN, order: 5,
      focus: 'Year: 2024 · Harcourt Butler Technical University',
      links: [] },
    { name: 'Aritra Paul', role: 'Research Intern', category: MemberCategory.INTERN, order: 6,
      focus: 'QACE-Champion: A Multi-Scale Quantum Ensemble Framework for Non-Linear Clustering — Manuscript ready for journal submission · Year: 2025 · Brainware University, Kolkata',
      links: [] },
    { name: 'Dr. Rajendrani Mukherjee', role: 'Research Intern', category: MemberCategory.INTERN, order: 7,
      focus: 'Quantum Computing: A Perspective of Decade for Users and Experts — Manuscript ready for journal submission · Year: 2025 · UEM Kolkata',
      links: [] },
    { name: 'Soujash Banerjee', role: 'Research Intern', category: MemberCategory.INTERN, order: 8,
      focus: 'QR-NOVA: Quantum Routing with Noncommutative Operators and Variational Adaptation — Manuscript ready for journal submission · Year: 2025 · IEM Kolkata',
      links: [] },
    { name: 'Ujjwal Kumar Singh', role: 'Research Intern', category: MemberCategory.INTERN, order: 9,
      focus: 'Energy-Efficient Task Management Using Reinforcement Learning for UAV-as-a-Service — Paper submitted in IEEE ANTS 2026 · Year: 2025 · NIT Arunachal Pradesh',
      links: [] },
    { name: 'Kusumlata Kumari', role: 'Research Intern', category: MemberCategory.INTERN, order: 10,
      focus: "Year: 2025 · Vinayaka Mission's Kirupananda Variyar Engineering College, Salem, Tamil Nadu",
      links: [] },
    { name: 'Khushi', role: 'Research Intern', category: MemberCategory.INTERN, order: 11,
      focus: 'Year: 2025 · Ramgarh Engineering College, Jharkhand',
      links: [] },
    { name: 'Sumit Kumar', role: 'Research Intern', category: MemberCategory.INTERN, order: 12,
      focus: 'Year: 2025 · Chandigarh University, Punjab',
      links: [] },
    // ── 2026 Interns ─────────────────────────────────────────
    { name: 'Anuj Tejas', role: 'Research Intern', category: MemberCategory.INTERN, order: 13,
      focus: 'Federated Learning, UAV Networks, Edge AI · Year: 2026',
      links: [] },
    { name: 'Sristi Samanta', role: 'Research Intern', category: MemberCategory.INTERN, order: 14,
      focus: 'UAV Networks, Machine Learning · Year: 2026',
      links: [] },
    { name: 'Joshika Parijat', role: 'Research Intern', category: MemberCategory.INTERN, order: 15,
      focus: 'UAV-Assisted Edge Computing, Wireless Networks & Intelligent Task Offloading · Year: 2026',
      links: [] },
    { name: 'Prajjwal Patel', role: 'Research Intern', category: MemberCategory.INTERN, order: 16,
      focus: 'UAV Swarm Intelligence, Coalition Formation, and Multi-Agent Coordination · Year: 2026',
      links: [] },
  ];

  for (const m of members) {
    const { links, ...data } = m;
    await prisma.member.create({ data: { ...data, links: { create: links } } });
  }
  console.log(`✓ ${members.length} members`);

  // ─── Publications ─────────────────────────────────────────────
  await prisma.publicationAuthor.deleteMany();
  await prisma.publication.deleteMany();

  type PubInput = { title: string; year: number; venue: string; pubType: string; authors: [string, boolean][]; pdfPath?: string };

  const AR: [string, boolean] = ['Arijit Roy', true];

  const pubs: PubInput[] = [
    // ── Journals ─────────────────────────────────────────────────
    { title: 'CuPric: Customer Segment-Based Pricing in Mobile Sensors-As-a-Service',
      year: 2025, pubType: 'Journal', venue: 'IEEE Transactions on Services Computing',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/abstract/document/11184879' },
    { title: 'OCUS: A Game-Theoretic Approach to Optimal UAV Coalitions in UAV-as-a-Service Platforms',
      year: 2025, pubType: 'Journal', venue: 'Ad Hoc Networks (Elsevier)',
      authors: [AR],
      pdfPath: 'https://www.sciencedirect.com/science/article/pii/S1570870525002781' },
    { title: 'MitiCon: Mitigating Model Contamination in Distributed Machine Learning for UAV-as-a-Service',
      year: 2025, pubType: 'Journal', venue: 'IEEE Transactions on Vehicular Technology',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/abstract/document/11165136' },
    { title: 'TOFU: Trust-Based Task Offloading in UAV-As-a-Service',
      year: 2025, pubType: 'Journal', venue: 'IEEE Transactions on Vehicular Technology',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/abstract/document/11145885' },
    { title: 'Building Sustainable Federated Learning Models in Fog-enabled UAV-as-a-Service for Aerial Image Classification',
      year: 2025, pubType: 'Journal', venue: 'Sustainable Computing: Informatics and Systems (Elsevier)',
      authors: [AR],
      pdfPath: 'https://www.sciencedirect.com/science/article/pii/S221053792500054X' },
    { title: 'Con-Fog: Consensus-driven Fog Node Selection in FU-Serve Platform for IoT Applications',
      year: 2025, pubType: 'Journal', venue: 'IEEE Internet of Things Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/10949608' },
    { title: 'Serv-HU: Service Hand-off for UAV-as-a-Service',
      year: 2024, pubType: 'Journal', venue: 'IEEE Transactions on Services Computing',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/abstract/document/10814719' },
    { title: 'PCAM: Optimal Pricing Scheme for Rendering Camera-Network-as-a-Service',
      year: 2023, pubType: 'Journal', venue: 'IEEE Transactions on Network Science and Engineering',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/abstract/document/10308612' },
    { title: 'i-AVR: IoT-based Ambulatory Vitals Monitoring and Recommender System',
      year: 2023, pubType: 'Journal', venue: 'IEEE Internet of Things Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/10026876' },
    { title: 'I2M: Intelligent Information Management for Rendering IoE Services in Society 5.0',
      year: 2022, pubType: 'Journal', venue: 'IEEE Transactions on Network Science and Engineering',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9779650' },
    { title: 'B2H: Enabling Delay-Tolerant Blockchain Network in Healthcare for Society 5.0',
      year: 2022, pubType: 'Journal', venue: 'Computer Networks',
      authors: [AR],
      pdfPath: 'https://www.sciencedirect.com/science/article/pii/S1389128622000706' },
    { title: 'Softwarized Management of 6G Network for Green Internet of Things',
      year: 2022, pubType: 'Journal', venue: 'Computer Communications',
      authors: [AR],
      pdfPath: 'https://www.sciencedirect.com/science/article/pii/S0140366422000329' },
    { title: 'Edge Intelligence for Rendering Green Camera-Network-as-a-Service',
      year: 2021, pubType: 'Journal', venue: 'IEEE Transactions on Green Communications and Networking',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9606213/' },
    { title: 'AI-based Communication-as-a-Service for Network Management in Society 5.0',
      year: 2021, pubType: 'Journal', venue: 'IEEE Transactions on Network and Service Management',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9569743' },
    { title: 'CASE: A Context-Aware Security Scheme for Preserving Data Privacy in IoT-enabled Society 5.0',
      year: 2021, pubType: 'Journal', venue: 'IEEE Internet of Things Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/abstract/document/9501039' },
    { title: 'Mobile Sensor-Cloud for Rendering Sensors-as-a-Service',
      year: 2021, pubType: 'Journal', venue: 'IEEE Systems Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/abstract/document/9482601' },
    { title: 'DEFT: Decentralized Multiuser Computation Offloading in a Fog-enabled IoV Environment',
      year: 2020, pubType: 'Journal', venue: 'IEEE Transactions on Vehicular Technology',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9266123' },
    { title: 'Blockchain at the Edge: Performance of Resource-Constrained IoT Networks',
      year: 2020, pubType: 'Journal', venue: 'IEEE Transactions on Parallel and Distributed Systems',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9158540' },
    { title: 'Range-Price Trade-off in Sensor-Cloud for Provisioning Sensors-as-a-Service',
      year: 2020, pubType: 'Journal', venue: 'IEEE Transactions on Cloud Computing',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9222319' },
    { title: 'PRIME: An Optimal Pricing Scheme for Mobile Sensors-as-a-Service',
      year: 2020, pubType: 'Journal', venue: 'IEEE Transactions on Mobile Computing',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9195797' },
    { title: 'Drops: Dynamic Radio Protocol Selection for Energy-Constrained Wearable IoT Healthcare',
      year: 2020, pubType: 'Journal', venue: 'IEEE Journal on Selected Areas in Communications',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9181524' },
    { title: 'UAV Virtualization for Enabling Heterogeneous and Persistent UAV-as-a-Service',
      year: 2020, pubType: 'Journal', venue: 'IEEE Transactions on Vehicular Technology',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/9072443' },
    { title: 'ORCID: Opportunistic Reconnectivity for Network Management in the Presence of Dumb Nodes in Wireless Sensor Networks',
      year: 2019, pubType: 'Journal', venue: 'IEEE Systems Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/8935523' },
    { title: 'Dynamic Pricing for Sensor-Cloud Platform in the Presence of Dumb Nodes',
      year: 2019, pubType: 'Journal', venue: 'IEEE Transactions on Cloud Computing',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/8887200' },
    { title: 'MEGAN: Multipurpose Energy-Efficient, Adaptable, and Low-Cost Wireless Sensor Node for the Internet of Things',
      year: 2019, pubType: 'Journal', venue: 'IEEE Systems Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/8743432' },
    { title: 'Big-Sensor-Cloud Infrastructure: A Holistic Prototype for Provisioning Sensors-as-a-Service',
      year: 2019, pubType: 'Journal', venue: 'IEEE Transactions on Cloud Computing',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/8680690' },
    { title: 'Dynamic Trust Enforcing Pricing Scheme for Sensors-as-a-Service in Sensor-Cloud Infrastructure',
      year: 2018, pubType: 'Journal', venue: 'IEEE Transactions on Services Computing',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/8481588' },
    { title: 'Knowledge Discovery for Enabling Smart Internet of Things: A Survey',
      year: 2018, pubType: 'Journal', venue: 'Wiley Interdisciplinary Reviews: Data Mining and Knowledge Discovery',
      authors: [AR],
      pdfPath: 'https://wires.onlinelibrary.wiley.com/doi/10.1002/widm.1276' },
    { title: 'Safe-aaS: Decision Virtualization for Effecting Safety-as-a-Service',
      year: 2018, pubType: 'Journal', venue: 'IEEE Internet of Things Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/8305454' },
    { title: 'Topology Control for Self-Adaptation in Wireless Sensor Networks with Temporary Connection Impairment',
      year: 2017, pubType: 'Journal', venue: 'ACM Transactions on Autonomous and Adaptive Systems',
      authors: [AR],
      pdfPath: 'https://dl.acm.org/doi/10.1145/2979680' },
    { title: 'D3: Distributed Approach for the Detection of Dumb Nodes in Wireless Sensor Networks',
      year: 2017, pubType: 'Journal', venue: 'International Journal of Communication Systems',
      authors: [AR],
      pdfPath: 'https://onlinelibrary.wiley.com/doi/10.1002/dac.2913' },
    { title: 'On the Effects of Communication Range Shrinkage of Sensor Nodes in Mobile Wireless Sensor Networks Due to Adverse Environmental Conditions',
      year: 2016, pubType: 'Journal', venue: 'IEEE Systems Journal',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/7572950' },
    { title: 'Connectivity Reestablishment in Self-Organizing Sensor Networks with Dumb Nodes',
      year: 2016, pubType: 'Journal', venue: 'ACM Transactions on Autonomous and Adaptive Systems',
      authors: [AR],
      pdfPath: 'https://dl.acm.org/doi/10.1145/2816820' },
    { title: 'Existence of Dumb Nodes in Stationary Wireless Sensor Networks',
      year: 2014, pubType: 'Journal', venue: 'Journal of Systems and Software',
      authors: [AR],
      pdfPath: 'https://www.sciencedirect.com/science/article/pii/S0164121214000120' },
    // ── Conferences ──────────────────────────────────────────────
    { title: 'DESTIN: Dynamic Device Selection for Mobile Sensors-as-a-Service Platforms',
      year: 2026, pubType: 'Conference', venue: 'IEEE Wireless Communications and Networking Conference (IEEE WCNC)',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/11555178' },
    { title: 'LISKI: A Lightweight Secret Key Generation Scheme for Resource-Constrained IoT Devices',
      year: 2026, pubType: 'Conference', venue: 'IEEE Wireless Communications and Networking Conference (IEEE WCNC)',
      authors: [AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/11555752' },
    { title: 'VisionStack: Multi-Layered Object Detection and Classification Framework',
      year: 2025, pubType: 'Conference', venue: 'IEEE International Conference on Advanced Networks and Telecommunications Systems (ANTS)',
      authors: [['Akhil Kumar Tiwari', false], ['Prince Kumar', false], AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/11430018' },
    { title: 'FU-Serve: Fog-enabled UAV-as-a-Service for IoT Applications',
      year: 2023, pubType: 'Conference', venue: 'IEEE Global Communications Conference (IEEE GLOBECOM)',
      authors: [['Raju Imandi', false], AR],
      pdfPath: 'https://ieeexplore.ieee.org/document/10437547' },
    { title: 'FoMS: Fog-enabled Mobile Sensor Virtualization Architecture for IoT Applications',
      year: 2023, pubType: 'Conference', venue: 'IEEE Global Communications Conference (IEEE GLOBECOM)',
      authors: [AR, ['K. Krovvidi', false], ['A. Kiran Padala', false], ['Farid Nait-Abdesselam', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/10437642' },
    { title: 'Programming Edge-based 6TiSCH Networks for Control-Loop Communication',
      year: 2023, pubType: 'Conference', venue: 'IEEE Global Communications Conference (IEEE GLOBECOM)',
      authors: [['Nurzaman Ahmed', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/10437380' },
    { title: 'Opti-U: Optimal UAV Selection for Enabling UAV-as-a-Service',
      year: 2022, pubType: 'Conference', venue: 'IEEE International Conference on Communications (IEEE ICC)',
      authors: [AR, ['Pascal Bouvry', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/9839188' },
    { title: 'ServEx: Service Exchange Among Multiple SCSPs in Sensor-Cloud for IoT Applications',
      year: 2021, pubType: 'Conference', venue: 'IEEE Global Communications Conference (IEEE GLOBECOM)',
      authors: [['Timam Ghosh', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/9685915' },
    { title: 'SDN-Based Link Recovery Scheme for Large-Scale Internet of Things',
      year: 2021, pubType: 'Conference', venue: 'IEEE International Conference on High Performance Switching and Routing (IEEE HPSR)',
      authors: [['Nurzaman Ahmed', false], AR, ['Ayan Mondal', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/9481842' },
    { title: 'QoI-Aware Camera Network-as-a-Service for Social Behavior Analysis',
      year: 2021, pubType: 'Conference', venue: 'IEEE International Conference on Communications (IEEE ICC)',
      authors: [['Meetha V Shenoy', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/9500453' },
    { title: 'Programmable IEEE 802.11ah Network for Internet of Things',
      year: 2021, pubType: 'Conference', venue: 'IEEE International Conference on Communications (IEEE ICC)',
      authors: [['Nurzaman Ahmed', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/9500610' },
    { title: 'QSens: QoS-Aware Sensor Node Selection in Sensor-Cloud Architecture',
      year: 2021, pubType: 'Conference', venue: 'Progress in Advanced Computing and Intelligent Engineering',
      authors: [AR, ['Sudip Misra', false], ['Aditya Kotasthane', false]],
      pdfPath: 'https://link.springer.com/chapter/10.1007/978-981-33-4299-6_44' },
    { title: 'OptiCam: Optimal Camera Selection for Provisioning Camera-Network-as-a-Service',
      year: 2020, pubType: 'Conference', venue: 'IEEE Global Communications Conference (IEEE GLOBECOM)',
      authors: [['Ningombam Anandshree Singh', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/9348228' },
    { title: 'OPTIVE: Optimal Configuration of Virtual Sensor in Mobile Sensor-Cloud',
      year: 2019, pubType: 'Conference', venue: 'IEEE Wireless Communications and Networking Conference (IEEE WCNC)',
      authors: [AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/8885626' },
    { title: 'Care: Criticality-Aware Data Transmission in CPS-based Healthcare Systems',
      year: 2018, pubType: 'Conference', venue: 'International Conference on Communications Workshops (IEEE ICC Workshops)',
      authors: [AR, ['Chandana Roy', false], ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/8403540' },
    { title: 'DIVISOR: Dynamic Virtual Sensor Formation for Overlapping Region in IoT-based Sensor-Cloud',
      year: 2018, pubType: 'Conference', venue: 'IEEE Wireless Communications and Networking Conference (IEEE WCNC)',
      authors: [['Chandana Roy', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/8377221' },
    { title: 'QoS-aware Dynamic Caching for Destroyed Virtual Machines in Sensor-Cloud Architecture',
      year: 2018, pubType: 'Conference', venue: 'International Conference on Distributed Computing and Networking',
      authors: [AR, ['Sudip Misra', false], ['Sayan Ghosh', false]],
      pdfPath: 'https://dl.acm.org/doi/10.1145/3154273.3154341' },
    { title: 'AID: A Prototype for Agricultural Intrusion Detection using Wireless Sensor Network',
      year: 2015, pubType: 'Conference', venue: 'IEEE International Conference on Communications (IEEE ICC)',
      authors: [['Sanku Kumar Roy', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/7249452' },
    { title: 'Energy-efficient Connectivity Re-establishment in WSN in the Presence of Dumb Nodes',
      year: 2015, pubType: 'Conference', venue: 'IEEE International Conference on Communications Workshop (IEEE ICCW)',
      authors: [['Pushpendu Kar', false], AR, ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/7247389' },
    { title: 'Detection of Dumb Nodes in a Stationary Wireless Sensor Network',
      year: 2014, pubType: 'Conference', venue: 'Annual IEEE India Conference (IEEE INDICON)',
      authors: [AR, ['Pushpendu Kar', false], ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/7030668' },
    { title: 'Connectivity Re-establishment in the Presence of Dumb Nodes in Sensor-Cloud Infrastructure: A Game Theoretic Approach',
      year: 2014, pubType: 'Conference', venue: 'International Conference on Cloud Computing Technology and Science',
      authors: [AR, ['Ayan Mondal', false], ['Sudip Misra', false]],
      pdfPath: 'https://ieeexplore.ieee.org/document/7037772' },
  ];

  // ── Batch insert: publications first, then authors ────────────
  // Step 1: insert all publications without authors
  const createdPubs = await Promise.all(
    pubs.map((p) => {
      const { authors: _, ...data } = p;
      return prisma.publication.create({ data, select: { id: true, title: true } });
    })
  );

  // Step 2: build a title→id map, then batch insert all authors
  const titleToId = Object.fromEntries(createdPubs.map((p) => [p.title, p.id]));
  const allAuthors = pubs.flatMap((p) =>
    p.authors.map(([text, bold], order) => ({
      text,
      bold,
      order,
      publicationId: titleToId[p.title],
    }))
  );
  await prisma.publicationAuthor.createMany({ data: allAuthors });

  console.log(`✓ ${pubs.length} publications`);

  // ─── Projects ────────────────────────────────────────────────
  await prisma.project.deleteMany();
  await prisma.project.createMany({ data: [
    {
      title: 'Facilitating Adoption of IoT-Edge AI-based Technologies for Natural Disaster Management in Bihar',
      description: 'This project focuses on developing IoT and Edge AI-based technologies to assist in natural disaster management across Bihar. The work involves building real-time sensing, communication, and decision-making systems deployable in disaster-prone regions.',
      status: ProjectStatus.ONGOING,
      category: 'Funded',
      role: 'Principal Investigator',
      funding: 'Bihar State Disaster Management Authority (BSDMA), Bihar Government, India',
      amount: 'INR 2,69,31,450',
      period: 'October 2023 – Ongoing',
    },
    {
      title: 'Digital Twin for City-based Air Pollutant Distribution Framework',
      description: 'This project aims to develop a digital twin framework for modelling and monitoring air pollutant distribution across urban environments, enabling city planners and policymakers to simulate and respond to air quality challenges.',
      status: ProjectStatus.ONGOING,
      category: 'Funded',
      role: 'Co-Principal Investigator',
      funding: 'Department of Science and Technology, India (Granted)',
      period: 'October 2023 – Ongoing',
    },
    {
      title: 'SportMitra: Real-Time, Multimodal & Multilingual AI Agents for India\'s Sports',
      description: 'This project develops real-time, multimodal and multilingual AI agents tailored for Indian sports, enabling intelligent commentary, analytics, and fan engagement across multiple languages and sports disciplines.',
      status: ProjectStatus.ONGOING,
      category: 'Funded',
      role: 'Co-Principal Investigator',
      funding: 'Anusandhan National Research Foundation, Govt. of India',
      amount: 'INR 98,53,200',
      period: 'January 2026 – Ongoing (Fund yet to receive)',
    },
    {
      title: 'Development of an Air-Ground Data Acquisition System to Enable Virtualized Platform for IoT Applications',
      description: 'This project focuses on developing an integrated air-ground data acquisition system that enables a virtualized platform for IoT applications, combining aerial and ground-based sensing for comprehensive data collection and processing.',
      status: ProjectStatus.ONGOING,
      category: 'Funded',
      role: 'Principal Investigator',
      funding: 'Anusandhan National Research Foundation, Govt. of India',
      amount: 'INR 24,00,000',
      period: 'January 2026 – Ongoing (Fund yet to receive)',
    },
    {
      title: 'Simnovus Traffic Generator',
      description: 'Consultancy project with Simnovus India Pvt. Ltd. for development and testing of a traffic generation tool for network simulation and performance evaluation.',
      status: ProjectStatus.ONGOING,
      category: 'Consultancy',
      role: 'Principal Investigator',
      funding: 'Simnovus India Pvt. Ltd, Bangalore, India',
      amount: 'INR 11,18,286',
      period: 'October 2023 – Ongoing',
    },
    {
      title: 'Post Completion Inspection of ICCC-MSI (Muzaffarpur Smart City Ltd.)',
      description: 'Consultancy project for post-completion inspection and evaluation of the Integrated Command and Control Centre (ICCC) under Muzaffarpur Smart City initiative.',
      status: ProjectStatus.ONGOING,
      category: 'Consultancy',
      role: 'Co-Principal Investigator',
      funding: 'Muzaffarpur Smart City Ltd',
      amount: 'INR 17,54,780',
      period: 'October 2023 – Ongoing',
    },
  ]});
  console.log('✓ 4 projects');

  // ─── News ────────────────────────────────────────────────────
  await prisma.newsItem.deleteMany();
  await prisma.newsItem.createMany({ data: [
    { date: 'Jun 2025', tag: NewsTag.PAPER,  body: 'Two papers accepted at **ICML 2025** (Vienna, Austria) — congratulations to Arjun, Meera, and Ravi!' },
    { date: 'May 2025', tag: NewsTag.TALK,   body: 'Dr. Arijit Roy delivered an **invited talk** at the IISc AI Symposium, Bengaluru.' },
    { date: 'Apr 2025', tag: NewsTag.MISC,   body: 'Lab received the **DST-SERB Core Research Grant (CRG)** worth ₹48 lakhs for the project "Robust Multimodal Learning for Real-World Perception" (2024–2027).' },
    { date: 'Mar 2025', tag: NewsTag.AWARD,  body: "PhD student **Arjun Singh** has been awarded the prestigious **Prime Minister's Research Fellowship (PMRF)**. Congratulations!" },
    { date: 'Jan 2025', tag: NewsTag.PAPER,  body: 'Paper "Vision-Language Alignment Without Paired Data" accepted at **ICLR 2025** (Singapore).' },
    { date: 'Dec 2024', tag: NewsTag.EVENT,  body: 'i-NEXT hosted a **reading group workshop** on foundation models and in-context learning.' },
    { date: 'Nov 2024', tag: NewsTag.PAPER,  body: 'Paper "Graph-Based Molecular Property Prediction" accepted at **NeurIPS 2024** (Vancouver, Canada).' },
    { date: 'Sep 2024', tag: NewsTag.PAPER,  body: 'Paper "Diffusion-Based Synthesis of Chest X-Rays" accepted at **MICCAI 2024** (Marrakesh, Morocco).' },
  ]});
  console.log('✓ 8 news items');

  // ─── Achievements ─────────────────────────────────────────────
  await prisma.achievement.deleteMany();
  await prisma.achievement.createMany({ data: [
    { year: '2025', title: 'IIT Patna Excellence in Research Award', description: 'Awarded to Dr. Arijit Roy in recognition of outstanding contributions to IoT and AI research.', category: AchievementCategory.FACULTY },
    { year: '2024', title: 'INAE Young Engineer Award', description: 'Conferred by the Indian National Academy of Engineering to Dr. Arijit Roy for significant contributions to IoT systems.', category: AchievementCategory.FACULTY },
    { year: '2023', title: 'Google Research India Award', description: 'Awarded to Dr. Arijit Roy for the project "Self-Supervised Video Representation Learning".', category: AchievementCategory.FACULTY },
    { year: '2025', title: "Prime Minister's Research Fellowship (PMRF) — Arjun Singh", description: 'Awarded by MoE, Government of India, for outstanding research on vision-language grounding.', category: AchievementCategory.PHD },
    { year: '2024', title: 'Microsoft Research India PhD Fellowship — Meera Pillai', description: 'Competitive fellowship for doctoral research on continual and lifelong learning.', category: AchievementCategory.PHD },
    { year: '2025', title: 'Best M.Tech Thesis Award — Tanvi Joshi', description: 'Awarded by the Department of CSE, IIT Patna, for thesis on self-supervised video representation learning.', category: AchievementCategory.UG },
  ]});
  console.log('✓ 6 achievements');

  console.log('✅ Seed complete');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
