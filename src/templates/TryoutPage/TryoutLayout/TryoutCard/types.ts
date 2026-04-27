export interface TryoutCardData {
  id: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  price: number;
  specialPrice?: number;
  originalPrice?: number;
  detailHref: string;
}

export interface TryoutCardProps {
  data: TryoutCardData;
}
