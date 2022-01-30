import express, { json, urlencoded } from "express";
import basicAuthMidleware from "./middlewares/basicAthenticationMidleware";
import jwtAuthenticationMidleware from "./middlewares/jwtAuthenticationMidleware";
import errorHandler from "./middlewares/errorHandler";
import authRoute from "./routes/authorizationRoute";
import userRoute from "./routes/userRoute";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(userRoute);
app.use(authRoute);
app.use(errorHandler);


app.listen(3000, () => {
  console.log("Aplicação executando em:");
  console.log("http://localhost:3000/");
});
