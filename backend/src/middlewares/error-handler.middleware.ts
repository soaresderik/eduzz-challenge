import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import HttpException from "../exceptions/http.exception";

@Middleware({ type: "after" })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: HttpException, req: any, res: any, next?: (err?: any) => any) {
    console.log(error);
    const message = error.message || "Something went wrong";
    const status = error.status || 500;
    res.status(status).json({ status, message });
  }
}
