export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'New Releases To Watch',
    excerpt: 'Explore the most anticipated literary releases of the season, from psychological thrillers to heart-wrenching memoirs.',
    date: 'Jan 01, 2026',
    author: 'Elena Vance',
    readTime: '5 min read',
    category: 'Latest',
    image: '/images/article/5.jpg'
  },
  {
    id: 'a2',
    title: 'Top Reads This Month',
    excerpt: 'Our curated selection of the finest reads that dominated the literary world this month. Essential additions to any library.',
    date: 'Jan 02, 2026',
    author: 'Julian Barnes',
    readTime: '7 min read',
    category: 'Trending',
    image: '/images/article/4.jpg'
  },
  {
    id: '1',
    title: 'The Art of Curating a Personal Library',
    excerpt: 'How to build a collection that speaks to your soul, from finding rare editions to organizing by emotional resonance.',
    date: 'Jan 12, 2026',
    author: 'Elena Vance',
    readTime: '8 min read',
    category: 'Lifestyle',
    image: '/images/article/1.jpg'
  },
  {
    id: '2',
    title: 'Why Physical Books Still Matter in a Digital Age',
    excerpt: 'The sensory experience of paper, the smell of ink, and the cognitive benefits of distraction-free reading.',
    date: 'Jan 10, 2026',
    author: 'Julian Barnes',
    readTime: '6 min read',
    category: 'Culture',
    image: '/images/article/2.jpg'
  },
  {
    id: '3',
    title: '10 Hidden Gems from the 20th Century Fiction',
    excerpt: 'Rediscovering masterpieces that fell through the cracks of time but remain more relevant than ever.',
    date: 'Jan 08, 2026',
    author: 'Sarah Chen',
    readTime: '12 min read',
    category: 'Literature',
    image: '/images/article/3.jpg'
  }
];
