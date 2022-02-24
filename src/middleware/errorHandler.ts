import { Context } from "koa";
import { ValidateError } from "../utils/param-validator";

export async function errorHandler(ctx: Context, next: () => Promise<never>): Promise<void> {
    try {
        await next();
        if (ctx.status === 404) throw ctx.throw(404);
    } catch (e) {
        if (e instanceof ValidateError) {
            ctx.body = {
                status: 1,
                message: e.message
            };
            return;

        }
        if (e.name === "NotFoundError") {
            ctx.body = {
                status: 404,
                message: "请求的资源不存在,请检查请求地址"
            };
            return;
        }
        if (e.name === "UnauthorizedError") {
            if (e?.originalError?.name === "TokenExpiredError") {
                ctx.body = {
                    status: 10401,
                    message: "认证信息已过期,请重新登录"
                };
                return;
            }
            ctx.body = {
                status: 401,
                message: "认证失败,请登录"
            };
            return;
        }
        console.error(e);
        ctx.status = 500;
        ctx.body = {
            status: 500,
            message: e.message || "服务器错误"
        };
    }
}