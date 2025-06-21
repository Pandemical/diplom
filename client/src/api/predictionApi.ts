import { Recommendation } from "../types/recomendation";
import { $authhost } from "./api"; 

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
  try {
    const response = await $authhost.get(`/predict`); 
    return response.data.results;
  } catch (error) {
    console.error("Ошибка в predictionApi:", error);
    return [];
  }
};

