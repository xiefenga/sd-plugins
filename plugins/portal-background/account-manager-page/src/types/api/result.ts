
export interface SDResponse<T> {
  code: number
  result: SDResult<T>
  status: number
}

export interface SDResult<T> {
  result: T[]
}

export interface SDPaginationResult<T> extends SDResult<T> {
  pageNum: number
  pageSize: number
  paging: boolean
  totalCount: number
}

