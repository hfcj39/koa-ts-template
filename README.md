# Koa-ts-template

## 保证我的代码能更新到最新代码

1. 克隆代码
```bash
git clone https://github.com/hfcj39/koa-ts-template.git
```
2. 添加自己的 git 源地址
```bash
# up 为源名称,可以随意设置
# gitUrl为开源最新代码
git remote add up gitUrl;
```
3. 提交代码到自己 git
```bash
# 提交代码到自己项目
# main为分支名 需要自行根据情况修改
git push up main

# 同步自己项目的代码
# main为分支名 需要自行根据情况修改
git pull up main
```
4. 如何同步开源最新代码
```bash
git pull origin main
```