import { Context } from "koa"
import Validator, { ValidateError } from "../../utils/param-validator";


const idValidator = new Validator({
    id: { ctx: "query", type: "number", required: true },
});
export default class HelloWorldController {
    public static async hello(ctx: Context) {
        const { id } = idValidator.validate(ctx);
        ctx.body = id
    }
}