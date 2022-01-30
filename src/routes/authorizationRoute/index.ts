import { NextFunction, Request, Response, Router } from "express";
import userRepository from "../../repositories/userRepository";
import JWT from "jsonwebtoken";
import ForbidenError from "../../models/Errors/ForbidenError";
import basicAuth from "../../middlewares/basicAthentication";

const authRoute = Router();

const AUTH_URL = '/token';

authRoute.post(AUTH_URL, basicAuth, async (
  request: Request
  , response: Response
  , next: NextFunction
) => {
  try {
    const { name, password } = request.user;
    
    const user = await userRepository.searchByLogin(name, password);

    if (!user) {
      throw new ForbidenError("Usuário ou Senha inválidas");
      
    }

    const jwtPayload = {
      name: user.name
    };
    const jwtOpt = {
      subject: user.id
    };

    const jwt = JWT.sign(jwtPayload, 'secret_jwt_key', jwtOpt);

    response.status(200).send({token: jwt});
  } catch (error) {
    console.log(error);
    
    next(error)
  }
});

export default authRoute;
