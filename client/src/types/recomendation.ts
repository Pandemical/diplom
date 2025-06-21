export interface Recommendation {
  type: string;
  predicted: number;
  average: number;
  recommendation: string;
  category?: string; // необязательное поле
}
