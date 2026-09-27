# dmhy-bangumi-current-season · 动漫花园新番索引更新脚本（自托管复刻）

> 复刻自 [Masaiki/dmhy-bangumi-current-season](https://github.com/Masaiki/dmhy-bangumi-current-season)（Greasy Fork [脚本 403045](https://greasyfork.org/zh-CN/scripts/403045-dmhy-bangumi-current-season)，作者 **Masaiki / 菜姬**，数据由 MIR 维护）。
> 本仓库为独立自托管副本：脚本与全部季度数据存于本仓库，通过 jsDelivr CDN 分发，不依赖原仓库的阿里云 OSS 镜像。

## 安装

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/)（或任意用户脚本管理器）。
2. 安装本脚本：

   **[点此安装 dmhy-bangumi-current-season.user.js](https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/dmhy-bangumi-current-season.user.js)**

   （如 `cdn.jsdelivr.net` 不可用，可换镜像：`https://fastly.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/dmhy-bangumi-current-season.user.js`）
3. 打开 [share.dmhy.org](https://share.dmhy.org/)（动漫花园），首页新番时间表会自动刷新为最新季度索引。

> 本复刻版与 Greasy Fork 原版 `@name` 相同、`@namespace` 不同，两者可共存；若已装原版建议先禁用其一。

## 功能

- 用本仓库维护的当季新番数据，替换动漫花园首页的新番时间表，并为每部番剧挂上站内搜索链接。
- 页面右上角提供：
  - **顯示切換**：全部一周时间表 / 只显示今明后三天 + 非週更番剧；
  - **季度下拉框**：切换历史季度数据（2020年04月 ~ 2022年10月）。
- 顺带修复页面居中显示问题。

## 数据分发

脚本运行时从 jsDelivr 拉取本仓库的数据文件（CDN 约 24 小时缓存）：

| 文件 | 用途 |
| --- | --- |
| `bangumi-data.js` | 当季新番数据（默认数据源） |
| `history-list.js` | 历史季度数据源索引 |
| `history-data/*.js` | 202004~202210 各季度历史数据 |

数据格式：`bangumi_group_name` 为周内分组（週日~週六 + 非週更）；`bangumi_data` 每项为 `[[名称, 搜索关键词, 生效开始日, 失效结束日], ...]`，关键词与日期可省略。

### 多源热备

页面右上角下拉框内，当季数据提供 5 个可切换源：

| 源 | 域名 | 说明 |
| --- | --- | --- |
| 主源 | `cdn.jsdelivr.net` | 默认，jsDelivr 主站 |
| Fastly 镜像 | `fastly.jsdelivr.net` | 主站被污染时切换 |
| Gcore 镜像 | `gcore.jsdelivr.net` | 延迟通常最好 |
| CF 镜像 | `testingcf.jsdelivr.net` | Cloudflare 线路 |
| EdgeOne 备用 | `dmhy-bangumi-current-season.edgeone.app` | 腾讯云国内节点独立第二源 |

历史季度数据统一走主源域名。

## 更新数据

1. 编辑 `bangumi-data.js`（新增季度时另存 `history-data/YYYYMM.js` 并在 `history-list.js` 登记一项）。
2. 提交后 jsDelivr 约 24 小时内生效；要立即生效可在安装的脚本里把 `DataURL` 的 `@master` 换成具体 commit hash，或到 `https://www.jsdelivr.com/tools/purge` 提交 purge。

## 与原版的差异

- 数据源 URL 由阿里云 OSS 改为本仓库的 jsDelivr 地址（`cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/...`），并在下拉框内置 Fastly / Gcore / CF 三个镜像热备与 EdgeOne Pages 第二源。
- 移除 Greasy Fork 专用 `@downloadURL` / `@updateURL`，更新跟随本仓库。
- 其余脚本逻辑与数据内容与原版 v0.4.3（2022-11-01）完全一致。

## EdgeOne Pages 第二源（维护者操作）

本仓库同时部署到腾讯云 EdgeOne Pages 作为国内第二数据源，接入步骤（与控制台流程一致）：

1. 登录 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)，「创建项目」→ 连接 GitHub → 选择本仓库。
2. 构建配置：本仓库为纯静态（无 package.json），框架选「无框架/静态」，安装与构建命令留空，输出目录填 `./`。
3. 加速区域按需选择（自定义域名需中国大陆加速时域名须已备案）。
4. **部署完成后到项目设置里关闭「Bot 托管挑战/托管挑战」**，否则浏览器以 `<script src>` 拉数据可能被挑战页拦截。
5. 核对项目域名：若与 `dmhy-bangumi-current-season.edgeone.app` 不一致，改 `history-list.js` 中 `default-edgeone` 那行 URL 即可。

此后每次 push，EdgeOne 自动重新部署；jsDelivr 侧约 24h 缓存，急用可到 [jsDelivr Purge](https://www.jsdelivr.com/tools/purge) 手动刷新。

## 致谢与许可

- 脚本与数据原作者：[Masaiki](https://github.com/Masaiki)（菜姬），原仓库未声明许可证，本项目仅作镜像复刻与自托管分发，原作者权利保留。
- 原版最后更新于 2022-11-01，当季数据停留在 2022年10月季度，**本复刻不自动追踪新番数据更新**。
