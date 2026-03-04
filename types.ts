
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  category: 'adventure' | 'beach' | 'city' | 'culture';
  recommendedDuration?: string;
  attractions?: string[];
}

export interface TravelPlan {
  destination: string;
  days: number;
  itinerary: {
    day: number;
    activities: string[];
    tips: string;
  }[];
  totalEstimatedCost: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
