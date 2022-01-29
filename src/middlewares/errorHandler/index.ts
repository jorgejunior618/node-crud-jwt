import { NextFunction, Request, Response } from "express";
import DbError from "../../models/Errors";

function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  if(error instanceof DbError) {
    response.sendStatus(400);
  } else {
    response.sendStatus(500);
  }
}

export default errorHandler;
