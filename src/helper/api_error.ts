export class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(message: string, errors: any[] = []) {
    return new ApiError(401, message, errors);
  }

  static BadRequestError(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static NotFoundError(message: string, errors: any[] = []) {
    return new ApiError(404, message, errors);
  }
}
