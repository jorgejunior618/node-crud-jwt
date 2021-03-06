import { NextFunction, Request, Response } from "express";
import AuthorizationType from "../../models/Authorization";
import ForbidenError from "../../models/Errors/ForbidenError";

async function basicAuthMidleware( request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new ForbidenError("Acesso não permitido");
    }
    
    const [ authType, authToken ] = authHeader.split(' ');
    
    
    if (authType != AuthorizationType.BASIC || !authToken) {
      throw new ForbidenError("Autenticação inválida");
    }
    
    const tokenContent = Buffer.from(authToken, 'base64').toString('utf-8');
    
    const [ name, password ] = tokenContent.split(':');
    
    if (!name || !password) {
      throw new ForbidenError("Faltando credenciais");
    }
  
    request.user = { name, password };

    next();
  } catch (error) {
    console.log(error);
    
    next(error);
  }
}

export default basicAuthMidleware;

