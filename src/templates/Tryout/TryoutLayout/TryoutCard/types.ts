export interface TryoutCardData {
  id: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  price: number;
  specialPrice?: number;
  originalPrice?: number;
  detailHref: string;
  isPurchased?: boolean;
  totalPassingScore?: number;
}

export interface TryoutCardProps {
  data: TryoutCardData;
}
