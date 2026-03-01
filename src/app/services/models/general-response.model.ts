 export interface GeneralResponse<T> {
  isSuccess: boolean;
  message?: string;
  result?: T;
  statusCode: number;
}
