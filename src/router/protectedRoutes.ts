import { SwaggerRouter } from "koa-swagger-decorator"

import path from "path"

const protectedRouter = new SwaggerRouter()

protectedRouter.swagger({
    title: "TL-WMS",
    description: "通罗仓库管理平台",
    version: "1.0.0",
    swaggerHtmlEndpoint: "/swagger"
})

protectedRouter.mapDir(path.resolve(__dirname, "../controller"), { doValidation: false })

export { protectedRouter }