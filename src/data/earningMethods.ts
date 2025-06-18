import { EarningMethod } from '../types';

export const earningMethods: EarningMethod[] = [
  // Online Methods - Enhanced Dataset
  {
    id: '1',
    name: 'Dropshipping',
    category: 'online',
    minInvestment: 100,
    maxInvestment: 1000,
    minEarning: 200,
    maxEarning: 5000,
    description: 'Start an online store without inventory. Sell products directly from suppliers to customers.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.shopify.com/learn/dropshipping',
    platformLink: 'https://www.shopify.com',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Computer', 'Internet', 'Basic marketing knowledge']
  },
  {
    id: '2',
    name: 'YouTube Channel',
    category: 'online',
    minInvestment: 50,
    maxInvestment: 500,
    minEarning: 50,
    maxEarning: 10000,
    description: 'Create engaging video content and monetize through ads, sponsorships, and merchandise.',
    image: 'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://creatoracademy.youtube.com/page/education',
    platformLink: 'https://www.youtube.com',
    difficulty: 'beginner',
    timeToStart: '1-4 weeks',
    requirements: ['Camera/Phone', 'Video editing software', 'Consistent content creation']
  },
  {
    id: '3',
    name: 'AI Automation Consulting',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 200,
    minEarning: 500,
    maxEarning: 10000,
    description: 'Help businesses automate processes using AI tools and solutions.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/ai-automation-consulting/',
    platformLink: 'https://www.upwork.com',
    difficulty: 'advanced',
    timeToStart: '2-4 weeks',
    requirements: ['AI knowledge', 'Business consulting skills', 'Technical expertise']
  },
  {
    id: '4',
    name: 'Remote Cybersecurity Jobs',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 500,
    minEarning: 700,
    maxEarning: 9000,
    description: 'Work remotely in cybersecurity roles protecting digital assets.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.coursera.org/learn/intro-cyber-security',
    platformLink: 'https://www.turing.com',
    difficulty: 'advanced',
    timeToStart: '3-6 months',
    requirements: ['Cybersecurity certification', 'Technical skills', 'Security knowledge']
  },
  {
    id: '5',
    name: 'NFT Design & Minting',
    category: 'online',
    minInvestment: 50,
    maxInvestment: 500,
    minEarning: 200,
    maxEarning: 8000,
    description: 'Create and sell digital art as NFTs on blockchain platforms.',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/nft-art-and-blockchain/',
    platformLink: 'https://opensea.io',
    difficulty: 'intermediate',
    timeToStart: '2-4 weeks',
    requirements: ['Digital art skills', 'Blockchain knowledge', 'Crypto wallet']
  },
  {
    id: '6',
    name: 'Cryptocurrency Trading',
    category: 'online',
    minInvestment: 100,
    maxInvestment: 5000,
    minEarning: 100,
    maxEarning: 8000,
    description: 'Trade cryptocurrencies for profit using technical analysis.',
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://academy.binance.com',
    platformLink: 'https://www.binance.com',
    difficulty: 'advanced',
    timeToStart: '1-3 months',
    requirements: ['Market analysis skills', 'Risk management', 'Trading capital']
  },
  {
    id: '7',
    name: 'Web Development Freelancing',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 1000,
    minEarning: 300,
    maxEarning: 8000,
    description: 'Build websites and web applications for clients worldwide.',
    image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.freecodecamp.org',
    platformLink: 'https://www.freelancer.com',
    difficulty: 'intermediate',
    timeToStart: '3-6 months',
    requirements: ['Programming skills', 'Portfolio', 'Client communication']
  },
  {
    id: '8',
    name: 'Print-On-Demand',
    category: 'online',
    minInvestment: 20,
    maxInvestment: 200,
    minEarning: 150,
    maxEarning: 10000,
    description: 'Design and sell custom products without inventory management.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.shopify.com/learn/print-on-demand',
    platformLink: 'https://printful.com',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Design skills', 'Marketing knowledge', 'Online store']
  },
  {
    id: '9',
    name: 'Affiliate Marketing',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 500,
    minEarning: 50,
    maxEarning: 7000,
    description: 'Promote products and earn commissions on successful sales.',
    image: 'https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.shopify.com/learn/affiliate-marketing',
    platformLink: 'https://www.amazon.com/associates',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Content creation', 'Audience building', 'Marketing skills']
  },
  {
    id: '10',
    name: 'Online Course Creation',
    category: 'online',
    minInvestment: 50,
    maxInvestment: 1000,
    minEarning: 300,
    maxEarning: 7000,
    description: 'Create and sell educational courses on your expertise.',
    image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/create-online-course/',
    platformLink: 'https://www.teachable.com',
    difficulty: 'intermediate',
    timeToStart: '2-4 weeks',
    requirements: ['Subject expertise', 'Teaching skills', 'Video equipment']
  },
  {
    id: '11',
    name: 'Twitch Streaming',
    category: 'online',
    minInvestment: 100,
    maxInvestment: 1000,
    minEarning: 100,
    maxEarning: 5000,
    description: 'Stream games and content live to build an audience and monetize.',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/how-to-become-a-twitch-streamer/',
    platformLink: 'https://www.twitch.tv',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Gaming setup', 'Personality', 'Consistent schedule']
  },
  {
    id: '12',
    name: 'Substack Writing',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 100,
    minEarning: 100,
    maxEarning: 3000,
    description: 'Write newsletters and build a paid subscriber base.',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.skillshare.com/en/classes/Writing-on-Substack/184836743',
    platformLink: 'https://substack.com',
    difficulty: 'beginner',
    timeToStart: '1 week',
    requirements: ['Writing skills', 'Niche expertise', 'Consistency']
  },
  {
    id: '13',
    name: 'Virtual Assistant',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 200,
    minEarning: 200,
    maxEarning: 3000,
    description: 'Provide administrative support to businesses remotely.',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.skillshare.com/classes/How-to-Become-a-Virtual-Assistant/499182348',
    platformLink: 'https://www.upwork.com',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Computer', 'Internet', 'Organization skills']
  },
  {
    id: '14',
    name: 'Stock Photography',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 1000,
    minEarning: 50,
    maxEarning: 2000,
    description: 'Sell your photos to stock photography websites.',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/stock-photography-business/',
    platformLink: 'https://www.shutterstock.com',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Camera', 'Photography skills', 'Photo editing']
  },
  {
    id: '15',
    name: 'Freelance Writing',
    category: 'online',
    minInvestment: 0,
    maxInvestment: 100,
    minEarning: 200,
    maxEarning: 5000,
    description: 'Write articles, blogs, and content for businesses.',
    image: 'https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/freelance-writing/',
    platformLink: 'https://www.problogger.com/jobs/',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Writing skills', 'Research ability', 'Grammar knowledge']
  },

  // Offline Methods - Enhanced Dataset
  {
    id: '16',
    name: 'Local Tutoring',
    category: 'offline',
    minInvestment: 0,
    maxInvestment: 200,
    minEarning: 200,
    maxEarning: 4000,
    description: 'Provide in-person tutoring services in your local area.',
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/become-a-tutor/',
    platformLink: 'https://www.olx.com.pk',
    difficulty: 'beginner',
    timeToStart: '1 week',
    requirements: ['Subject expertise', 'Teaching materials', 'Local advertising']
  },
  {
    id: '17',
    name: 'Property Management',
    category: 'offline',
    minInvestment: 200,
    maxInvestment: 2000,
    minEarning: 500,
    maxEarning: 7000,
    description: 'Manage rental properties for property owners.',
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/property-management-course/',
    platformLink: 'https://www.zameen.com',
    difficulty: 'intermediate',
    timeToStart: '2-4 weeks',
    requirements: ['Real estate knowledge', 'Communication skills', 'Local network']
  },
  {
    id: '18',
    name: 'Water Plant Business',
    category: 'offline',
    minInvestment: 500,
    maxInvestment: 5000,
    minEarning: 500,
    maxEarning: 10000,
    description: 'Start a water purification and delivery business.',
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.youtube.com/watch?v=QvXbJW5csuM',
    platformLink: 'https://www.google.com/maps',
    difficulty: 'intermediate',
    timeToStart: '1-2 months',
    requirements: ['Equipment', 'Permits', 'Delivery vehicle']
  },
  {
    id: '19',
    name: 'Construction Material Store',
    category: 'offline',
    minInvestment: 500,
    maxInvestment: 10000,
    minEarning: 1000,
    maxEarning: 10000,
    description: 'Sell construction materials to builders and contractors.',
    image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/construction-business/',
    platformLink: 'https://www.locanto.pk',
    difficulty: 'advanced',
    timeToStart: '1-3 months',
    requirements: ['Large investment', 'Storage space', 'Supplier network']
  },
  {
    id: '20',
    name: 'Electrician Service',
    category: 'offline',
    minInvestment: 100,
    maxInvestment: 1000,
    minEarning: 300,
    maxEarning: 6000,
    description: 'Provide electrical installation and repair services.',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/electrical-wiring/',
    platformLink: 'https://www.thumbtack.com',
    difficulty: 'intermediate',
    timeToStart: '2-6 months',
    requirements: ['Electrical training', 'Tools', 'License']
  },
  {
    id: '21',
    name: 'Plumbing Service',
    category: 'offline',
    minInvestment: 150,
    maxInvestment: 1500,
    minEarning: 300,
    maxEarning: 7000,
    description: 'Offer plumbing installation and repair services.',
    image: 'https://images.pexels.com/photos/8486944/pexels-photo-8486944.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/plumbing-course/',
    platformLink: 'https://www.taskrabbit.com',
    difficulty: 'intermediate',
    timeToStart: '2-6 months',
    requirements: ['Plumbing training', 'Tools', 'License']
  },
  {
    id: '22',
    name: 'Event Planning',
    category: 'offline',
    minInvestment: 100,
    maxInvestment: 2000,
    minEarning: 300,
    maxEarning: 7000,
    description: 'Plan and coordinate events, parties, and weddings.',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.skillshare.com/en/classes/Event-Planning-Basics/154984987',
    platformLink: 'https://www.instagram.com',
    difficulty: 'intermediate',
    timeToStart: '2-4 weeks',
    requirements: ['Organization skills', 'Vendor network', 'Creative vision']
  },
  {
    id: '23',
    name: 'Catering Service',
    category: 'offline',
    minInvestment: 200,
    maxInvestment: 2000,
    minEarning: 300,
    maxEarning: 3000,
    description: 'Provide food services for events and special occasions.',
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/start-your-own-catering-business/',
    platformLink: 'https://www.thumbtack.com',
    difficulty: 'intermediate',
    timeToStart: '2-4 weeks',
    requirements: ['Cooking skills', 'Food safety certification', 'Equipment']
  },
  {
    id: '24',
    name: 'Fitness Trainer',
    category: 'offline',
    minInvestment: 100,
    maxInvestment: 1000,
    minEarning: 200,
    maxEarning: 4000,
    description: 'Provide personal training and fitness coaching services.',
    image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.nasm.org/',
    platformLink: 'https://www.trainerize.me',
    difficulty: 'beginner',
    timeToStart: '4-8 weeks',
    requirements: ['Fitness certification', 'Knowledge of exercise', 'Insurance']
  },
  {
    id: '25',
    name: 'Mobile Car Wash',
    category: 'offline',
    minInvestment: 100,
    maxInvestment: 1000,
    minEarning: 200,
    maxEarning: 2500,
    description: 'Provide car cleaning services at customer locations.',
    image: 'https://images.pexels.com/photos/3964704/pexels-photo-3964704.jpeg?auto=compress&cs=tinysrgb&w=800',
    learningLink: 'https://www.udemy.com/course/mobile-car-wash/',
    platformLink: 'https://www.yelp.com',
    difficulty: 'beginner',
    timeToStart: '1-2 weeks',
    requirements: ['Cleaning supplies', 'Transportation', 'Water source']
  }
];

// Filter functions for recommendations
export const filterMethods = (
  methods: EarningMethod[],
  investment: number,
  monthlyGoal: number,
  preference: 'online' | 'offline' | 'both'
): EarningMethod[] => {
  return methods
    .filter(method => {
      // Filter by category preference
      if (preference !== 'both' && method.category !== preference) {
        return false;
      }

      // Filter by investment range (allow some flexibility)
      const investmentMatches = 
        investment >= (method.minInvestment * 0.8) && 
        investment <= (method.maxInvestment * 1.2);

      // Filter by earning potential
      const earningPotential = method.maxEarning >= monthlyGoal * 0.5;

      return investmentMatches && earningPotential;
    })
    .sort((a, b) => {
      // Sort by how well they match the monthly goal
      const aScore = Math.abs(a.maxEarning - monthlyGoal);
      const bScore = Math.abs(b.maxEarning - monthlyGoal);
      return aScore - bScore;
    })
    .slice(0, 6); // Return top 6 matches
};