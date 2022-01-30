import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import DbError from "../../models/Errors/DbError";
import ForbidenError from "../../models/Errors/ForbidenError";

function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  if(error instanceof DbError) {
    response.sendStatus(400);
  }
  if(error instanceof ForbidenError) {
    response.sendStatus(400);
  }
  if(error instanceof JsonWebTokenError) {
    response.sendStatus(401);
  } else {
    response.sendStatus(500);
  }
}

export default errorHandler;
