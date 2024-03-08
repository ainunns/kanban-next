export type ApiResponse<T> = {
  resultMessage: {
    en: string;
  };
  resultCode: string;
  data: T;
};

export type ApiError = {
  resultMessage: {
    en: string;
  };
  resultCode: string;
};
