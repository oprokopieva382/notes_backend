import { Request } from "express";
import { UserViewModel } from "../models";

declare global {
  namespace Express {
    export interface Request {
      userId: string;
      //user: UserViewModel;
    }
  }
}
