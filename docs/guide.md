# Getting started

## 应用类型

微服务中的 app 服务类型主要分为4类：interface、service、job、admin，应用 cmd 目录负责程序的：启动、关闭、配置初始化等。

- interface: 对外的 BFF 服务，接受来自用户的请求，比如暴露了 HTTP/gRPC 接口。
- service: 对内的微服务，仅接受来自内部其他服务或者网关的请求，比如暴露了gRPC 接口只对内服务。
- admin：区别于 service，更多是面向运营测的服务，通常数据权限更高，隔离带来更好的代码级别安全。
- job: 流式任务处理的服务，上游一般依赖 message broker。
task: 定时任务，类似 cronjob，部署到 task 托管平台中。

## bookmarks

- about OWNER: <https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md>
- layout example: <https://github.com/feihua/kratos-mall>
- layout example: <https://github.com/shtzr840329/mico-service-template>
- layout example: <https://github.com/ZQCard/kratos-service-base>
