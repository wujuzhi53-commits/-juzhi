export type CategoryType = 'graphic' | 'ip' | 'ecommerce' | 'modeling';

export interface WorkItem {
  id: string;
  category: CategoryType;
  title: string;
  subtitle: string;
  description: string;
  materialDetails: string;
  colorPalette: string[]; // List of soft HEX colors
  imagePlaceholderColor: string; // Background tint
  illustrationSvgId: string; // Render custom illustrative graphics inside the card!
  imageUrl?: string; // Optional custom uploaded image URL/base64!
  imageUrls?: string[]; // Optional multiple custom uploaded image URLs!
}

export interface SkillItem {
  name: string;
  percentage: number;
  description: string;
  subSkills: string[];
}

export interface MessageSubmission {
  name: string;
  contact: string;
  text: string;
  timestamp: string;
}
