import { NextFunction, Request, Response } from "express";
import AuthorizationType from "../../models/Authorization";
import ForbidenError from "../../models/Errors/ForbidenError";
import JWT from 'jsonwebtoken';
import userRepository from "../../repositories/userRepository";

async function bearerAuthentication(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers['authorization'];
    
    if(!authHeader) {
      throw new ForbidenError('Credenciais não informadas');
    }
    
    const [ authType, authToken ] = authHeader.split(' ');
    
    if (authType != AuthorizationType.BEARER || !authToken) {
      throw new ForbidenError("Autenticação inválida");
    }

    const tokenPayload = JWT.verify(authToken, 'secret_jwt_key');
    console.log({tokenPayload});
    
    
    if(typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbidenError("Autenticação inválida");
    }

    const id = tokenPayload.sub;

    const user = {
      id,
      name: tokenPayload.name,
    }
    
    request.user = user;
    next();
  } catch (error) {
    console.log({error});
    
    next(error);
  }
}

export default bearerAuthentication;

