export interface SuccessResponse<T> {
  msg: string
  data: T[]
  error: boolean
  pagination?: PaginationData // Used by default, Null if not paginated
}

export interface PaginationData {
  page: number
  take: number
  total: number
}

export interface ErrorResponse<T> {
  msg: string
  data: T
  error: boolean
}
