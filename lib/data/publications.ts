import type { Publication, AuthorSegment } from '@/lib/types';

function a(...segs: [string, boolean][]): AuthorSegment[] {
  return segs.map(([text, bold], order) => ({ text, bold, order }));
}

const PDF = '/assets/pdfs/placeholder.pdf';
const DOI = 'https://doi.org/10.0000/placeholder';

export const publicationsByYear: { year: number; entries: Publication[] }[] = [
  {
    year: 2025,
    entries: [
      {
        title: 'Grounding Vision and Language via Structured Scene Representations',
        authors: a(['Arjun Singh', true], ['Meera Pillai', true], ['John Doe', false], ['Placeholder Name', true]),
        venue: 'International Conference on Machine Learning (ICML 2025)',
        year: 2025, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Lightweight Continual Learning with Sparse Task-Specific Adapters',
        authors: a(['Meera Pillai', true], ['Ravi Kumar', true], ['Placeholder Name', true]),
        venue: 'International Conference on Machine Learning (ICML 2025)',
        year: 2025, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Cross-Lingual Transfer for Low-Resource Intent Detection Using Compressed Transformers',
        authors: a(['Ravi Kumar', true], ['Alice Patel', false], ['Placeholder Name', true]),
        venue: 'Annual Conference of the Association for Computational Linguistics (ACL 2025)',
        year: 2025, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Vision-Language Alignment Without Paired Data',
        authors: a(['Arjun Singh', true], ['Tanvi Joshi', true], ['Bob Li', false], ['Placeholder Name', true]),
        venue: 'International Conference on Learning Representations (ICLR 2025)',
        year: 2025, pdfPath: PDF, doiUrl: DOI,
      },
    ],
  },
  {
    year: 2024,
    entries: [
      {
        title: 'Certified Adversarial Robustness via Lipschitz-Constrained Training',
        authors: a(['Suresh Nair', true], ['Carol Zhang', false], ['Placeholder Name', true]),
        venue: 'Conference on Computer Vision and Pattern Recognition (CVPR 2024)',
        year: 2024, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Graph-Based Molecular Property Prediction with Equivariant Message Passing',
        authors: a(['Divya Menon', true], ['Placeholder Name', true], ['Eve Sharma', false]),
        venue: 'Advances in Neural Information Processing Systems (NeurIPS 2024)',
        year: 2024, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Diffusion-Based Synthesis of Chest X-Rays for Rare Pathology Augmentation',
        authors: a(['Priya Sharma', true], ['Frank Müller', false], ['Placeholder Name', true]),
        venue: 'Medical Image Computing and Computer Assisted Intervention (MICCAI 2024)',
        year: 2024, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Privacy-Preserving Federated Learning Under Non-IID Data Distributions',
        authors: a(['Sneha Rao', true], ['Placeholder Name', true], ['Grace Kim', false]),
        venue: 'AAAI Conference on Artificial Intelligence (AAAI 2024)',
        year: 2024, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Prompt Tuning for Multilingual Sentiment Analysis with Minimal Supervision',
        authors: a(['Ravi Kumar', true], ['Anil Verma', true], ['Placeholder Name', true]),
        venue: 'Empirical Methods in Natural Language Processing (EMNLP 2024)',
        year: 2024, pdfPath: PDF, doiUrl: DOI,
      },
    ],
  },
  {
    year: 2023,
    entries: [
      {
        title: 'Temporal Self-Supervised Learning for Action Recognition in Untrimmed Videos',
        authors: a(['Tanvi Joshi', true], ['Arjun Singh', true], ['Placeholder Name', true]),
        venue: 'IEEE/CVF International Conference on Computer Vision (ICCV 2023)',
        year: 2023, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Task-Incremental Learning Without Task Boundaries',
        authors: a(['Meera Pillai', true], ['Henry Brown', false], ['Placeholder Name', true]),
        venue: 'International Conference on Machine Learning (ICML 2023)',
        year: 2023, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Scalable Molecular Graph Neural Networks via Hierarchical Pooling',
        authors: a(['Divya Menon', true], ['Vikram Rao', true], ['Placeholder Name', true]),
        venue: 'Journal of Chemical Information and Modeling, 63(8), 2023',
        year: 2023, pdfPath: PDF, doiUrl: DOI,
      },
    ],
  },
  {
    year: 2022,
    entries: [
      {
        title: 'Multimodal Contrastive Learning with Hard Negative Mining',
        authors: a(['Vikram Rao', true], ['Placeholder Name', true], ['Ivan Chen', false]),
        venue: 'Conference on Computer Vision and Pattern Recognition (CVPR 2022)',
        year: 2022, pdfPath: PDF, doiUrl: DOI,
      },
      {
        title: 'Structured Pruning of Language Models for Efficient Deployment on Mobile Devices',
        authors: a(['Ravi Kumar', true], ['Nisha Agarwal', true], ['Placeholder Name', true]),
        venue: 'Findings of ACL 2022',
        year: 2022, pdfPath: PDF, doiUrl: DOI,
      },
    ],
  },
];
