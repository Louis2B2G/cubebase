import { KPI, Activity, Conversation } from '@/types/types';
import { Prospect, LinkedInPost, NewsArticle } from './types';

export const generateKPIs = (): KPI => ({
  totalProspects: Math.floor(Math.random() * 10000),
  activeConversations: Math.floor(Math.random() * 1000),
  meetingsBooked: Math.floor(Math.random() * 100),
  conversionRate: Number((Math.random() * 10).toFixed(2))
});

export const generateConversations = (): Conversation[] => [
  { id: 1, sender: "Frank Wilson", message: "Thanks for reaching out! I'd love to learn more about your services.", timestamp: "2024-10-07T10:00:00Z", prospect: "Frank Wilson", company: "Tech Innovators", lastMessage: "Thanks for reaching out! I'd love to learn more about your services.", date: "2024-10-07" },
  { id: 2, sender: "Grace Taylor", message: "Can we schedule a demo next week?", timestamp: "2024-10-06T14:30:00Z", prospect: "Grace Taylor", company: "Global Solutions", lastMessage: "Can we schedule a demo next week?", date: "2024-10-06" },
  { id: 3, sender: "Henry Davis", message: "I've reviewed your proposal and have a few questions.", timestamp: "2024-10-05T11:15:00Z", prospect: "Henry Davis", company: "Future Corp", lastMessage: "I've reviewed your proposal and have a few questions.", date: "2024-10-05" },
  { id: 4, sender: "Isabella Martinez", message: "Your AI-driven approach sounds interesting. Tell me more.", timestamp: "2024-10-04T16:45:00Z", prospect: "Isabella Martinez", company: "Innovate Inc.", lastMessage: "Your AI-driven approach sounds interesting. Tell me more.", date: "2024-10-04" },
  { id: 5, sender: "Jack Thompson", message: "Looking forward to our call tomorrow!", timestamp: "2024-10-03T09:20:00Z", prospect: "Jack Thompson", company: "NextGen Systems", lastMessage: "Looking forward to our call tomorrow!", date: "2024-10-03" },
];

export function generateProspects(): Prospect[] {
  return [
    {
      id: '1',
      name: 'Frank Wilson',
      company: 'Tech Innovators',
      title: 'Chief Innovation Officer',
      email: 'frank.wilson@techinnovators.com',
      phone: '+1 (555) 234-5678',
      linkedIn: 'https://www.linkedin.com/in/frankwilson',
      location: 'Boston, MA',
      industry: 'Technology',
      companySize: '1000-5000 employees',
      revenue: '$100M - $500M',
      notes: 'Interested in AI-powered solutions for product development.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('Tech Innovators'),
      avatar: '/frank.png',
      status: 'hot',
      reachedOn: 'linkedin',
      messagesSent: 5,
      lastMessageSentAt: '2024-10-05',
    },
    {
      id: '2',
      name: 'Grace Taylor',
      company: 'Global Solutions',
      title: 'VP of Operations',
      email: 'grace.taylor@globalsolutions.com',
      phone: '+1 (555) 345-6789',
      linkedIn: 'https://www.linkedin.com/in/gracetaylor',
      location: 'Chicago, IL',
      industry: 'Consulting',
      companySize: '5000-10000 employees',
      revenue: '$500M - $1B',
      notes: 'Looking for solutions to streamline global operations.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('Global Solutions'),
      avatar: '/grace.png',
      status: 'warm',
      reachedOn: 'email',
      messagesSent: 3,
      lastMessageSentAt: '2024-10-03',
    },
    {
      id: '3',
      name: 'Henry Davis',
      company: 'Future Corp',
      title: 'Director of Strategy',
      email: 'henry.davis@futurecorp.com',
      phone: '+1 (555) 456-7890',
      linkedIn: 'https://www.linkedin.com/in/henrydavis',
      location: 'New York, NY',
      industry: 'Finance',
      companySize: '10000+ employees',
      revenue: '$1B+',
      notes: 'Interested in AI for predictive analytics in finance.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('Future Corp'),
      avatar: '/henry.png',
      status: 'cold',
      reachedOn: 'linkedin',
      messagesSent: 1,
      lastMessageSentAt: '2024-09-28',
    },
    {
      id: '4',
      name: 'Isabella Martinez',
      company: 'Innovate Inc.',
      title: 'Head of Research',
      email: 'isabella.martinez@innovateinc.com',
      phone: '+1 (555) 567-8901',
      linkedIn: 'https://www.linkedin.com/in/isabellamartinez',
      location: 'Austin, TX',
      industry: 'Biotechnology',
      companySize: '500-1000 employees',
      revenue: '$50M - $100M',
      notes: 'Exploring AI applications in drug discovery.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('Innovate Inc.'),
      avatar: '/isabella.png',
      status: 'warm',
      reachedOn: 'email',
      messagesSent: 4,
      lastMessageSentAt: '2024-10-04',
    },
    {
      id: '5',
      name: 'Jack Thompson',
      company: 'NextGen Systems',
      title: 'CTO',
      email: 'jack.thompson@nextgensystems.com',
      phone: '+1 (555) 678-9012',
      linkedIn: 'https://www.linkedin.com/in/jackthompson',
      location: 'Seattle, WA',
      industry: 'Software',
      companySize: '1000-5000 employees',
      revenue: '$100M - $500M',
      notes: 'Interested in integrating AI into existing software platforms.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('NextGen Systems'),
      avatar: '/jack.png',
      status: 'hot',
      reachedOn: 'linkedin',
      messagesSent: 6,
      lastMessageSentAt: '2024-10-06',
    },
  ];
}

function generateLinkedInPosts(): LinkedInPost[] {
  return [
    {
      date: '2023-05-15',
      content: `🚀 I am thrilled to announce the launch of our groundbreaking AI-powered supply chain optimization solution! 🎉 After months of hard work and dedication, our incredible team has built a tool that leverages advanced algorithms to streamline and revolutionize supply chain management. This innovation has the potential to reduce costs, enhance efficiency, and help businesses of all sizes become more resilient and adaptive in an ever-changing market. 💼📊 Excited to see the impact this will have on the industry! #SupplyChain #AI #Innovation`,
      likes: 156,
      comments: 23,
      link: 'https://www.linkedin.com/posts/techinnovators_supplychain-ai-innovation-activity-7212345632133795840-_Z8o',
    },
    {
      date: '2023-05-10',
      content: `📚 Just published a new article on the future of logistics technology! 🚚🌐 This piece dives deep into how emerging technologies like AI, IoT, and blockchain are reshaping the logistics industry. It’s amazing to witness how tech advancements are accelerating efficiencies, improving sustainability, and transforming operations on a global scale. I explore key trends, challenges, and opportunities that industry leaders should watch out for. Don’t miss out—give it a read and let me know your thoughts! You can find the article here: [Link]. #Logistics #Technology #Innovation`,
      likes: 89,
      comments: 12,
      link: 'https://www.linkedin.com/posts/techinnovators_logistics-technology-innovation-activity-7212345632133795840-_Z8o',
    },
    {
      date: '2023-06-01',
      content: `What an incredible experience speaking at the Tech Innovators Summit last week! 🌟 I had the privilege of sharing insights on leadership in the digital age and how innovation is driving the next wave of technological advancements. The energy and enthusiasm from the audience were inspiring! 🙌 It was also a great opportunity to connect with fellow industry leaders and exchange ideas on how we can collaboratively push the boundaries of innovation. Looking forward to seeing where these conversations take us next! #Leadership #Innovation #TechSummit`,
      likes: 230,
      comments: 45,
      link: 'https://www.linkedin.com/posts/techinnovators_leadership-innovation-activity-7212345632133795840-_Z8o',
    },
    {
      date: '2023-06-15',
      content: `Feeling incredibly proud to be part of a team that is at the forefront of driving change in the AI space! 🤖💡 Today, I’m excited to share that our latest project—a cutting-edge AI tool—has officially gone live. It’s designed to revolutionize the way businesses approach data analysis and decision-making, making processes faster and more accurate than ever before. Huge shoutout to the brilliant minds who worked tirelessly to bring this project to life. Can’t wait to see the impact it makes across industries! #AI #Tech #Innovation`,
      likes: 178,
      comments: 34,
      link: 'https://www.linkedin.com/posts/techinnovators_ai-tech-innovation-activity-7212345632133795840-_Z8o',
    },
    {
      date: '2023-06-20',
      content: `It’s such an honor to have been part of the Global Innovators Program as a mentor this year. 🌍✨ Mentoring the next generation of tech leaders has been a truly rewarding experience. I’ve had the privilege of working with some of the brightest minds in tech—individuals who are not only incredibly talented but also deeply passionate about making a positive impact on the world. I’ve learned just as much from them as they have from me, and I’m excited to see where their journeys take them! The future is bright. 💡 #Mentorship #FutureLeaders #GlobalInnovators`,
      likes: 132,
      comments: 22,
      link: 'https://www.linkedin.com/posts/techinnovators_mentorship-innovation-activity-7212345632133795840-_Z8o',
    },
  ];
}


function generateCompanyNews(companyName: string): NewsArticle[] {
  return [
    {
      title: `${companyName} Secures $50M in Series C Funding`,
      date: '2023-05-20',
      summary: `${companyName} has successfully raised $50 million in a Series C funding round led by Acme Ventures. The company plans to use the funds to expand its AI-powered supply chain solutions.`,
      url: 'https://example.com/news/1',
    },
    {
      title: `${companyName} Partners with Global Logistics Leader`,
      date: '2023-05-12',
      summary: `${companyName} has announced a strategic partnership with GlobalShip, a leading logistics provider. This collaboration aims to revolutionize the logistics industry through advanced AI technologies.`,
      url: 'https://example.com/news/2',
    },
    {
      title: `${companyName} Announces New AI-driven Product Line`,
      date: '2023-06-02',
      summary: `${companyName} has unveiled a new AI-driven product line aimed at enhancing efficiency in logistics and supply chain management.`,
      url: 'https://example.com/news/3',
    },
    {
      title: `${companyName} Expands Global Presence with New Office in Singapore`,
      date: '2023-06-18',
      summary: `${companyName} continues its global expansion by opening a new office in Singapore, strengthening its presence in the Asia-Pacific region.`,
      url: 'https://example.com/news/4',
    },
    {
      title: `CEO of ${companyName} Speaks at World Tech Forum`,
      date: '2023-06-30',
      summary: `The CEO of ${companyName} delivered a keynote speech at the World Tech Forum, discussing the future of AI in logistics and the company's vision for the next decade.`,
      url: 'https://example.com/news/5',
    },
  ];
}

export function generateConversationHistory(): Conversation[] {
  return [
    {
      id: 1,
      sender: "June",
      message: "Hi Louis! I'm June, an AI assistant. I understand you're the co-founder of Wave AI. Could you tell me a bit more about what Wave AI does?",
      timestamp: "2024-10-01T09:00:00Z"
    },
    {
      id: 2,
      sender: "Louis",
      message: "Hello June! Wave AI is a company that sells an AI-powered Sales Development Representative (SDR) solution. Our goal is to automate and enhance the sales outreach process.",
      timestamp: "2024-10-01T09:02:00Z"
    },
    {
      id: 3,
      sender: "June",
      message: "That sounds interesting! I've just looked up some information about Wave AI, and I see that you founded the company in 2023. What inspired you to start Wave AI?",
      timestamp: "2024-10-01T09:04:00Z"
    },
    {
      id: 4,
      sender: "Louis",
      message: "We saw a gap in the market for truly intelligent sales automation. Many companies struggle with effective outreach, and we believed AI could revolutionize this process.",
      timestamp: "2024-10-01T09:06:00Z"
    },
    {
      id: 5,
      sender: "June",
      message: "That's a great insight. Can you tell me more about your target market? Who are your ideal customers?",
      timestamp: "2024-10-01T09:08:00Z"
    },
    {
      id: 6,
      sender: "Louis",
      message: "Our ideal customers are B2B companies, typically in the tech or SaaS space, with 50-500 employees. They usually have a sales team but are looking to scale their outreach efforts efficiently.",
      timestamp: "2024-10-01T09:10:00Z"
    },
    {
      id: 7,
      sender: "June",
      message: "Thank you for that information. I've noted that your ICP is B2B tech/SaaS companies with 50-500 employees. What would you say is the main pain point you're solving for these customers?",
      timestamp: "2024-10-01T09:12:00Z"
    },
    {
      id: 8,
      sender: "Louis",
      message: "The main pain point is the inefficiency and high cost of traditional SDR teams. Our AI solution can handle a much larger volume of personalized outreach at a fraction of the cost.",
      timestamp: "2024-10-01T09:14:00Z"
    },
    {
      id: 9,
      sender: "June",
      message: "That's a compelling value proposition. I've just checked your website and noticed you offer a free trial. How long is the trial period, and what features are included?",
      timestamp: "2024-10-01T09:16:00Z"
    },
    {
      id: 10,
      sender: "Louis",
      message: "Our free trial lasts for 14 days and includes all features of our standard plan. This allows potential customers to fully experience the power of our AI SDR solution.",
      timestamp: "2024-10-01T09:18:00Z"
    },
    {
      id: 11,
      sender: "June",
      message: "That's great! One last question: what sets Wave AI apart from other AI-powered sales tools in the market?",
      timestamp: "2024-10-01T09:20:00Z"
    },
    {
      id: 12,
      sender: "Louis",
      message: "Our key differentiator is our advanced natural language processing. Our AI can understand context and nuance, leading to more human-like interactions and better conversion rates.",
      timestamp: "2024-10-01T09:22:00Z"
    },
    {
      id: 13,
      sender: "June",
      message: "Thank you, Louis. This information is very helpful. I've compiled a summary of Wave AI: An AI-powered SDR solution for B2B tech/SaaS companies with 50-500 employees, offering efficient and cost-effective sales outreach with advanced NLP capabilities. Is there anything you'd like to add or modify?",
      timestamp: "2024-10-01T09:24:00Z"
    },
    {
      id: 14,
      sender: "Louis",
      message: "That summary looks perfect, June. You've captured the essence of Wave AI very well. Thank you for your thorough questions and understanding of our business.",
      timestamp: "2024-10-01T09:26:00Z"
    },
    {
      id: 15,
      sender: "June",
      message: "You're welcome, Louis. I'm glad I could help summarize Wave AI's offering. Is there anything else you'd like to discuss or any other information you need?",
      timestamp: "2024-10-01T09:28:00Z"
    }
  ];
}


export interface PendingEmail {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  recipientCompany: string;
}

export function generatePendingEmails(): PendingEmail[] {
  return [
    {
      id: '1',
      recipient: 'john.doe@techinnovators.com',
      subject: 'Revolutionize Your Sales Process with AI',
      body: `Dear John,

I hope this email finds you well. I recently came across Tech Innovators and was impressed by your innovative approach to software development.

I'm reaching out because I believe our AI-powered Sales Development Representative (SDR) solution at Wave AI could be a game-changer for your sales team. We've helped companies like yours increase their outreach efficiency by 300% while significantly reducing costs.

Would you be interested in a quick 15-minute call to discuss how we could potentially boost your sales performance?

Best regards,
June from Wave AI`,
      recipientCompany: 'Tech Innovators'
    },
    {
      id: '2',
      recipient: 'sarah.smith@globalsolutions.com',
      subject: 'Enhance Your Sales Outreach with AI',
      body: `Hi Sarah,

I hope you're having a great week. I've been following Global Solutions' recent expansion into new markets and wanted to congratulate you on your success.

Given your growth, I thought you might be interested in learning about how AI can supercharge your sales outreach efforts. At Wave AI, we've developed an AI-powered SDR solution that can handle personalized outreach at scale, freeing up your team to focus on closing deals.

Would you be open to a brief demo to see how this could work for Global Solutions?

Looking forward to hearing from you,
June from Wave AI`,
      recipientCompany: 'Global Solutions'
    },
    {
      id: '3',
      recipient: 'mike.johnson@futurecorp.com',
      subject: 'AI-Powered Sales Outreach for Future Corp',
      body: `Hello Mike,

I trust this email finds you in good spirits. I've been keeping an eye on Future Corp's innovative work in the finance sector and I'm truly impressed by your forward-thinking approach.

I'm reaching out because I believe our AI-powered Sales Development Representative (SDR) solution at Wave AI could align perfectly with your innovative spirit. We've helped financial institutions like yours to streamline their sales processes and achieve remarkable results.

Would you be interested in a short call to explore how AI could revolutionize your sales outreach?

Best regards,
June from Wave AI`,
      recipientCompany: 'Future Corp'
    }
  ];
}
