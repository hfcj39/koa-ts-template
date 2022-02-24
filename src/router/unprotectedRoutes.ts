import { SwaggerRouter } from "koa-swagger-decorator";
import { helloworld } from "../controller"
const unprotectRouter = new SwaggerRouter();
unprotectRouter.post("/hello", helloworld.hello)

export { unprotectRouter };