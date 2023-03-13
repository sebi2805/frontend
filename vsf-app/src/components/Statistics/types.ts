export interface StatisticsInterface {
  id: string;
  date: string;
  totalExpenses: number;
  totalIncomes: number;
  currentCash: number;
  currentBank: number;
  changePercent: number;
}
export interface StatisticsContextInterface {
  statistics: StatisticsInterface[];
  isLoading: boolean;
}
