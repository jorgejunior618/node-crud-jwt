import { NextFunction, Request, Response, Router } from "express";
import bearerAuthentication from "../../middlewares/bearerAuthentication";
import userRepository from "../../repositories/userRepository";

const userRoute = Router();

const USER_URL: string = '/users'

userRoute.get(USER_URL, bearerAuthentication, async (
  request: Request
  , response: Response
  , next: NextFunction
) => {
  try {
    const users: User[] = await userRepository.search();
    
    response.status(200).send({ users });
  } catch (error) {
    next(error);
  }
});

userRoute.get(USER_URL + '/:userID', async (
  request: Request<{ userID: string}>
  , response: Response
  , next: NextFunction
) => {
  try {
    const { userID } = request.params;
    const user: User = await userRepository.searchUser(userID);
  
    response.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
});

userRoute.post('/users', async (
  request: Request<{}, {}>
  , response: Response
  , next: NextFunction
) => {
  try {
      const user: User = request.body;
      const id = await userRepository.create(user);

      return response.status(201).json({ id });
  } catch (error) {
      return next(error);
  }
});

userRoute.put(USER_URL + '/:userID', async (
  request: Request<{ userID: string }>
  , response: Response
  , next: NextFunction
) => {
  try {
    const { userID } = request.params;
    const user = request.body;
    await userRepository.update(user, userID);

    response.status(200).send();
  } catch (error) {
    next(error);
  }
});

userRoute.delete(USER_URL + '/:userID', async (
  request: Request<{ userID: string }>
  , response: Response
  , next: NextFunction
) => {
  try {
    const { userID } = request.params;
    await userRepository.remove(userID);

    response.status(200).send();
  } catch (error) {
    next(error);
  }
});

export default userRoute;
