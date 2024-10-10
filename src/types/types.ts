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
  status: 'cold' | 'warm' | 'hot';
  reachedOn: 'linkedin' | 'email';
  messagesSent: number;
  lastMessageSentAt: string;
  actions: Action[];
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

export type ActionType = 
  | 'Added on Linkedin'
  | 'Accepted on Linkedin'
  | 'Message'
  | 'Meeting Booked'
  | 'Email Sent'
  | 'Email Received'
  | 'LinkedIn Message Sent'
  | 'LinkedIn Message Received'
  | 'Follow-up Email Sent'
  | 'Meeting Scheduled'
  | 'Meeting Completed'
  | 'Call Scheduled'
  | 'Call Completed';

export interface Action {
  type: ActionType;
  timestamp: string;
  details?: MessageDetails | MeetingDetails;
}

export interface MessageDetails {
  origin: 'Linkedin' | 'Email';
  from: string;
  to: string;
  content: string;
  subject?: string;
}

export interface MeetingDetails {
  origin: 'Calendar';
  from: string;
  to: string;
  content: string;
  date: string;
  time: string;
  duration: string;
  platform?: string;
}

export interface PendingMessage {
  id: string;
  recipient?: string;  // Optional now
  subject?: string;    // Optional now
  body: string;
  recipientCompany: string;
  prospectId: string;
  origin: 'Linkedin' | 'Email';
}