import { KPI, Activity, Conversation, Prospect, LinkedInPost, NewsArticle } from '@/types/types';

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
      message: "Welcome to Cube! I'm June, your digital sales assistant. I'm here to make your sales smoother by booking you new leads. Do you have any questions or do you want to dive into the onboarding?",
      timestamp: "2024-10-01T09:00:00Z"
    },
    {
      id: 2,
      sender: "Louis",
      message: "Hey, yeah let's do the onboarding.",
      timestamp: "2024-10-01T09:02:00Z"
    },
    {
      id: 3,
      sender: "June",
      message: "From your LinkedIn profile, I see that you're associated with Cube AI. Is that correct?",
      timestamp: "2024-10-01T09:04:00Z"
    },
    {
      id: 4,
      sender: "Louis",
      message: "Yes",
      timestamp: "2024-10-01T09:06:00Z"
    },
    {
      id: 5,
      sender: "June",
      message: "I see that your website is www.getcube.ai - is that still the case?",
      timestamp: "2024-10-01T09:08:00Z"
    },
    {
      id: 6,
      sender: "Louis",
      message: "Yes",
      timestamp: "2024-10-01T09:10:00Z"
    },
    {
      id: 7,
      sender: "June",
      message: "Based on your website, it looks like you're providing an AI powered digital workforce that integrates with human teams and offers end-to-end automation. Is that correct?",
      timestamp: "2024-10-01T09:12:00Z"
    },
    {
      id: 8,
      sender: "Louis",
      message: "Yes",
      timestamp: "2024-10-01T09:14:00Z"
    },
    {
      id: 9,
      sender: "June",
      message: "Great, now let's start creating your campaign personas. Which countries do you want to target?",
      timestamp: "2024-10-01T09:16:00Z"
    },
    {
      id: 10,
      sender: "Louis",
      message: "We want to target France initially",
      timestamp: "2024-10-01T09:18:00Z"
    },
    {
      id: 11,
      sender: "June",
      message: "Thank you. The country France has been added to your campaign. We found 1,000,000 leads for this country. Next, could you tell me which job titles we should target for your campaign?",
      timestamp: "2024-10-01T09:20:00Z"
    },
    {
      id: 12,
      sender: "Louis",
      message: "VP of sales, head of sales, head of growth marketing, CEO, chief revenue officer, CRO, growth marketing lead",
      timestamp: "2024-10-01T09:22:00Z"
    },
    {
      id: 13,
      sender: "June",
      message: "Perfect, I've added 'VP of sales, head of sales, head of growth marketing, CEO, chief revenue officer, CRO, growth marketing lead' to your campaign. This has resulted in 51,232 potential leads. Can you tell me which sectors you'd like to target?",
      timestamp: "2024-10-01T09:24:00Z"
    },
    {
      id: 14,
      sender: "Louis",
      message: "Tech",
      timestamp: "2024-10-01T09:26:00Z"
    },
    {
      id: 15,
      sender: "June",
      message: "Great, I've added 'Tech' to your campaign. This has resulted in 11,710 potential leads. Next could you give me an employee count range?",
      timestamp: "2024-10-01T09:28:00Z"
    },
    {
      id: 16,
      sender: "Louis",
      message: "50-500",
      timestamp: "2024-10-01T09:30:00Z"
    },
    {
      id: 17,
      sender: "June",
      message: "Thank you. The employee count range '50-500' has been added to your campaign. This has resulted in 7,300 potential leads. Next, could you tell me what product you are building?",
      timestamp: "2024-10-01T09:32:00Z"
    },
    {
      id: 18,
      sender: "Louis",
      message: "We have created June, an AI SDR that automates the entire outbound sales process.",
      timestamp: "2024-10-01T09:34:00Z"
    },
    {
      id: 19,
      sender: "June",
      message: "Thank you for the descirption. Next, could you tell me what your main pain points you are targetting?",
      timestamp: "2024-10-01T09:36:00Z"
    },
    {
      id: 20,
      sender: "Louis",
      message: "The main pain point is the inefficiency and high cost of traditional SDR teams. SDRs are expensive, you need to use many platforms to do cold email cold email requires very speciffic skills. It also takes a long time research a person to personalize an outbound message.",
      timestamp: "2024-10-01T09:38:00Z"
    },
    {
      id: 21,
      sender: "June",
      message: "Based on your answers, I've identified the following pain points: high cost of SDR teams, inefficiency of traditional SDR teams, time-consuming lead research, and the need for specialized skills. Is there anything else you'd like to add?",
      timestamp: "2024-10-01T09:40:00Z"
    },
    {
      id: 22,
      sender: "Louis",
      message: "No",
      timestamp: "2024-10-01T09:41:00Z"
    },
    {
      id: 23,
      sender: "June",
      message: "Now let's move on to your product's features. Please answer the following questions: What are the unique features of your product? What are the most impactful features that tackles the inefficiencies in your client's routines? Can you quantify how your product has driven real business improvements for your clients?",
      timestamp: "2024-10-01T09:42:00Z"
    },
    {
      id: 24,
      sender: "Louis",
      message: "We have a database of 200M leads, June does advanced research on every lead by browsing the web, looking through their website and online profiles. Jnue can send thousands of ultra-personalized emails per month. June takes 20 minutes to set up and automates the entire cold email process.",
      timestamp: "2024-10-01T09:44:00Z"
    },
    {
      id: 25,
      sender: "June",
      message: "Based on your answers, I've identified the following features as the most impactful: huge lead database, advanced research capabilities, personalized outreach, automated email sending, and AI powered automation. Now, do you have a any customer success stories for your product? If not we can move on. If yes, could you share it where your product quantifiably impacted a client? Can you elaborate on testimonials?",
      timestamp: "2024-10-01T09:46:00Z"
    },
    {
      id: 26,
      sender: "Louis",
      message: "I don't have any",
      timestamp: "2024-10-01T09:48:00Z"
    },
    {
      id: 27,
      sender: "June",
      message: "No worries! Let's move on to the next step. Do you have a url to book meetings? For example, a Calendly or Google Calendar link.",
      timestamp: "2024-10-01T09:50:00Z"
    },
    {
      id: 28,
      sender: "Louis",
      message: "Yeah, it's https://calendly.com/louis-cube/30min",
      timestamp: "2024-10-01T09:52:00Z"
    },
    {
      id: 29,
      sender: "June",
      message: "Cool, I've updated your meeting booking URL to https://calendly.com/louis-cube/30min. Now could you tell me what sender first name you'd like me to use when sending emails?",
      timestamp: "2024-10-01T09:54:00Z"
    },
    {
      id: 30,
      sender: "Louis",
      message: "Louis",
      timestamp: "2024-10-01T09:56:00Z"
    },
    {
      id: 31,
      sender: "June",
      message: "Thank you Louis, I've updated your sender first name to Louis. Now could you tell me what tone of voice you'd like me to use?",
      timestamp: "2024-10-01T09:58:00Z"
    },
    {
      id: 32,
      sender: "Louis",
      message: "Friendly and approachable",
      timestamp: "2024-10-01T10:00:00Z"
    },
    {
      id: 33,
      sender: "June",
      message: "Great! Your tone of voice has been updated to friendly and approachable. Now, would you like to approve emails generated from scratch before I send them? Or would you like me to operate on autopilot? You can change this setting at any time.",
      timestamp: "2024-10-01T10:02:00Z"
    },
    {
      id: 34,
      sender: "Louis",
      message: "Go full autopilot",
      timestamp: "2024-10-01T10:04:00Z"
    },
    {
      id: 35,
      sender: "June",
      message: "Thank you Louis, I've updated your settings. Now, could you go to the Mailboxes tab and connect your email accounts?",
      timestamp: "2024-10-01T10:06:00Z"
    },
    {
      id: 36,
      sender: "Louis",
      message: "I'm done",
      timestamp: "2024-10-01T10:08:00Z"
    },
    {
      id: 37,
      sender: "June",
      message: "It doesn't seem you connected any mailbox, make sure you connect at least one.",
      timestamp: "2024-10-01T10:10:00Z"
    },
    {
      id: 38,
      sender: "Louis",
      message: "oops my bad, ok it's done now",
      timestamp: "2024-10-01T10:12:00Z"
    },
    {
      id: 39,
      sender: "June",
      message: "Great, I can see your mailbox now. Are you ready to start populating leads and scheduling emails?",
      timestamp: "2024-10-01T10:15:00Z"
    },
    {
      id: 40,
      sender: "Louis",
      message: "Yeah, let's fucking do it",
      timestamp: "2024-10-01T10:16:00Z"
    },
    {
      id: 41,
      sender: "June",
      message: "I like the enthusiasm! I've started populating leads in your Leads tab. You'll be able to review emails that I've drafted in your Pending Approval tab. Keep in mind that you can always change any of your responses or provide example emails in the Campaigns tab.",
      timestamp: "2024-10-01T10:17:00Z"
    },
    
  ];
}


export interface PendingEmail {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  recipientCompany: string;
  prospectId: string; // Add this line
}

export function generatePendingEmails(): PendingEmail[] {
  const prospects = generateProspects();
  return [
    {
      id: '1',
      recipient: 'frank.wilson@techinnovators.com',
      subject: 'Revolutionize Your Sales Process with AI',
      body: `Dear Frank,

I hope this email finds you well. I recently came across Tech Innovators and was impressed by your innovative approach to software development.

I'm reaching out because I believe our AI-powered Sales Development Representative (SDR) solution at Wave AI could be a game-changer for your sales team. We've helped companies like yours increase their outreach efficiency by 300% while significantly reducing costs.

Would you be interested in a quick 15-minute call to discuss how we could potentially boost your sales performance?

Best regards,
Louis de Benoist`,
      recipientCompany: 'Tech Innovators',
      prospectId: '1' // Add this line
    },
    {
      id: '2',
      recipient: 'grace.taylor@globalsolutions.com',
      subject: 'Enhance Your Sales Outreach with AI',
      body: `Hi Grace,

I hope you're having a great week. I've been following Global Solutions' recent expansion into new markets and wanted to congratulate you on your success.

Given your growth, I thought you might be interested in learning about how AI can supercharge your sales outreach efforts. At Wave AI, we've developed an AI-powered SDR solution that can handle personalized outreach at scale, freeing up your team to focus on closing deals.

Would you be open to a brief demo to see how this could work for Global Solutions?

Looking forward to hearing from you,
Louis de Benoist`,
      recipientCompany: 'Global Solutions',
      prospectId: '2' // Add this line
    },
    {
      id: '3',
      recipient: 'henry.davis@futurecorp.com',
      subject: 'AI-Powered Sales Outreach for Future Corp',
      body: `Hello Henry,

I trust this email finds you in good spirits. I've been keeping an eye on Future Corp's innovative work in the finance sector and I'm truly impressed by your forward-thinking approach.

I'm reaching out because I believe our AI-powered Sales Development Representative (SDR) solution at Wave AI could align perfectly with your innovative spirit. We've helped financial institutions like yours to streamline their sales processes and achieve remarkable results.

Would you be interested in a short call to explore how AI could revolutionize your sales outreach?

Best regards,
Louis de Benoist`,
      recipientCompany: 'Future Corp',
      prospectId: '3' // Add this line
    }
  ];
}

export function generateCampaignProspects(): Prospect[] {
  return [
    {
      id: '1',
      name: 'Alex Johnson',
      company: 'TechSolutions Inc.',
      title: 'VP of Sales',
      email: 'alex.johnson@techsolutions.com',
      phone: '+1 (555) 123-4567',
      linkedIn: 'https://www.linkedin.com/in/alexjohnson',
      location: 'San Francisco, CA',
      industry: 'Technology',
      companySize: '500-1000 employees',
      revenue: '$50M - $100M',
      notes: 'Interested in AI-powered sales solutions.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('TechSolutions Inc.'),
      avatar: '/jack.png',
    },
    {
      id: '2',
      name: 'Sarah Lee',
      company: 'GrowthMarketing Co.',
      title: 'Head of Growth Marketing',
      email: 'sarah.lee@growthmarketing.com',
      phone: '+1 (555) 234-5678',
      linkedIn: 'https://www.linkedin.com/in/sarahlee',
      location: 'New York, NY',
      industry: 'Marketing',
      companySize: '100-500 employees',
      revenue: '$10M - $50M',
      notes: 'Looking for innovative marketing automation tools.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('GrowthMarketing Co.'),
      avatar: '/isabella.png',
    },
    {
      id: '3',
      name: 'Michael Chen',
      company: 'DataDriven Corp',
      title: 'CEO',
      email: 'michael.chen@datadriven.com',
      phone: '+1 (555) 345-6789',
      linkedIn: 'https://www.linkedin.com/in/michaelchen',
      location: 'Boston, MA',
      industry: 'Data Analytics',
      companySize: '100-500 employees',
      revenue: '$10M - $50M',
      notes: 'Exploring AI solutions for data analysis.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('DataDriven Corp'),
      avatar: '/frank.png',
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      company: 'InnovateTech',
      title: 'Chief Revenue Officer',
      email: 'emily.rodriguez@innovatetech.com',
      phone: '+1 (555) 456-7890',
      linkedIn: 'https://www.linkedin.com/in/emilyrodriguez',
      location: 'Austin, TX',
      industry: 'Software',
      companySize: '100-500 employees',
      revenue: '$10M - $50M',
      notes: 'Interested in AI-powered sales forecasting.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('InnovateTech'),
      avatar: '/grace.png',
    },
    {
      id: '5',
      name: 'David Kim',
      company: 'SalesPro Solutions',
      title: 'Head of Sales',
      email: 'david.kim@salespro.com',
      phone: '+1 (555) 567-8901',
      linkedIn: 'https://www.linkedin.com/in/davidkim',
      location: 'Chicago, IL',
      industry: 'Sales',
      companySize: '50-100 employees',
      revenue: '$5M - $10M',
      notes: 'Looking for AI tools to improve sales efficiency.',
      linkedInPosts: generateLinkedInPosts(),
      companyNews: generateCompanyNews('SalesPro Solutions'),
      avatar: '/henry.png',
    },
  ];
}