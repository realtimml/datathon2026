export interface ResultsData {
  water_needed_liters: number
  pumping_cost: number
}

export interface DashboardState {
  results: ResultsData | null
  projectedYieldValue: number | null
  isLoading: boolean
  error: string | null
}

export interface WaterProductivityIndex {
  value: number | null
  yieldValue: number
  waterApplied: number
}
