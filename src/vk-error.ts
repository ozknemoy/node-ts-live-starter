


export interface RequestParam {
  key: string;
  value: string;
}

export interface Error {
  error_code: number;
  error_msg: string;
  request_params: RequestParam[];
}

export interface IVKError {
  error?: Error;
}
