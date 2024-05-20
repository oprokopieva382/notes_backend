import { Response } from "express";

type ResponseDataType<T> = {
  status: number;
  data: T | {};
  message?: string;
  errors?: any[];
};

export const formatResponse = <T>(
  res: Response,
  status: number,
  data: T | {},
  message: string = "",
  errors: any[] = []
): Response<ResponseDataType<T>> => {
  const responseObject: ResponseDataType<T> = {
    status,
    data,
    message,
    errors,
  };
  return res.status(status).json(responseObject);
};
