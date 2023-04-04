### 开发
使用 `pnpm` 作为 `monorepo` 的管理
使用 `lerna` 作为任务编排
### pnpm的使用
```
pnpm install react -w 公共依赖
pnpm install rollup -wD 开发依赖

# package单独安装指定依赖
pnpm add axios --filter @eagle-eye-sdk/vue

# 依赖本地包

pnpm i @developer-ones/eagle-eye-core -r --filter @developer-ones/eagle-eye-web

# 指定指定执行 package 下的 scripts 脚本

pnpm build --filter @eagle-eye-sdk/vue
```

### lerna的使用
```
# 创建子包
lerna create <name>

# 运行子包的相关命令

lerna run --scope=@eagle-eye-sdk/core build
```