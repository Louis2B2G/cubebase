export interface KPI {
    totalProspects: number;
    activeConversations: number;
    meetingsBooked: number;
    conversionRate: number;
  }
  
  export interface Activity {
    action: string;
    prospect: string;
    date: string;
    company: string;
  }
  
  export interface Conversation {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
    prospect?: string;
    company?: string;
    lastMessage?: string;
    date?: string;
  }

export interface Prospect {
  id: string;
  name: string;
  company: string;
  title: string;
  email: string;
  phone: string;
  linkedIn: string;
  location: string;
  industry: string;
  companySize: string;
  revenue: string;
  notes: string;
  linkedInPosts: LinkedInPost[];
  companyNews: NewsArticle[];
  avatar: string;
  status: 'warm' | 'hot' | 'cold';
  reachedOn: 'linkedin' | 'email';
  messagesSent: number;
  lastMessageSentAt: string;
}

export interface LinkedInPost {
  date: string;
  content: string;
  likes: number;
  comments: number;
  link: string;
}

export interface NewsArticle {
  title: string;
  date: string;
  summary: string;
  url: string;
}