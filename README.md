# 动漫花园新番索引更新脚本（自托管复刻版）

> 文件名沿用原版 `dmhy-bangumi-current-season.user.js`（便于与原版对照），脚本显示名为中文。
> 复刻自 [Masaiki/dmhy-bangumi-current-season](https://github.com/Masaiki/dmhy-bangumi-current-season)（Greasy Fork [脚本 403045](https://greasyfork.org/zh-CN/scripts/403045-dmhy-bangumi-current-season)，作者 **Masaiki / 菜姬**，数据由 MIR 维护）。
> 本仓库为独立自托管副本：脚本与全部季度数据存于本仓库，通过 jsDelivr CDN 分发，不依赖原仓库的阿里云 OSS 镜像。

## 安装

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/)（或任意用户脚本管理器）。
2. 安装本脚本：

   **[点此安装 dmhy-bangumi-current-season.user.js](https://cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/dmhy-bangumi-current-season.user.js)**

   （如 `cdn.jsdelivr.net` 不可用，可换镜像：`https://fastly.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/dmhy-bangumi-current-season.user.js`）
3. 打开 [share.dmhy.org](https://share.dmhy.org/)（动漫花园），首页新番时间表会自动刷新为最新季度索引。

> 本复刻版 `@name` 为「动漫花园新番索引更新脚本（自托管复刻版）」、`@namespace` 为本仓库地址，与 Greasy Fork 原版（`@name` 为 `dmhy-bangumi-current-season`）标识不同，两者可共存；若已装原版建议先禁用其一以免时间表被重复改写。

## 功能

- 用本仓库维护的当季新番数据，替换动漫花园首页的新番时间表，并为每部番剧挂上站内搜索链接。
- 页面右上角提供：
  - **顯示切換**：全部一周时间表 / 只显示今明后三天 + 非週更番剧；
  - **季度下拉框**：切换历史季度数据（2020年04月 ~ 2026年10月）。
- 顺带修复页面居中显示问题。
- 条目支持**生效/失效日期**：未开播的番剧到首播日自动出现，已完结的自动隐藏，无需再手动改数据。

## 当季数据（2026年10月 · 秋番）

- 共 **80 部**，按播出星期分为 8 组（週日~週六 + 非週更）。
- **数据来源**：Fansub Nexus 整理表「[26年10月](https://docs.google.com/spreadsheets/d/1s1fXYs2Ne2srbiQPhlB1GUi9Nsree3JZhSHuKjlpxEs)」（字幕组开坑信息，转载请带 https://tinyurl.com/cnfansub）。
- **播出星期校验**：Google Sheet 的「首播时间」列有 7 部留空，改用 [yuc.wiki 排期表](http://yuc.wiki/202610)（精确到时段）补齐并全量交叉核对；Netflix/ABEMA 等串流先行与电视首播不一致的，以**电视首播**归组。
- **日期字段用法**：11 月及 10 月下旬开播的番（愚者之夜、恶魔纹章、卡片战斗先导者、电驭叛客 2、我的幸福婚姻 特别篇）带生效日期，未到日期不显示。
- 剧场版 /  specials（黄金神威 最终章、物语系列 业物语）归入「非週更」。

## 数据分发

脚本运行时从 jsDelivr 拉取本仓库的数据文件（CDN 约 24 小时缓存）：

| 文件 | 用途 |
| --- | --- |
| `bangumi-data.js` | 当季新番数据（默认数据源） |
| `history-list.js` | 历史季度数据源索引 |
| `history-data/*.js` | 202004~202301 各季度历史数据 |

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

### 换季度时的推荐做法

1. 打开 Fansub Nexus 当季表，按「首播时间」列取星期；留空的用 yuc.wiki 排期表补。
2. `bangumi_data` 每项写成 `[显示名, 搜索关键词]`，未来开播的追加生效日 `'YYYY-MM-DD'`，已完结的追加失效日。
3. 旧当季数据存为 `history-data/YYYYMM.js`，并在 `history-list.js` 的 `values`/`names`/`urls` 三个数组**同一下标位**追加一项。
4. 用 `node --check bangumi-data.js` 过语法，并确认三数组长度一致。

## 与原版的差异

- 数据源 URL 由阿里云 OSS 改为本仓库的 jsDelivr 地址（`cdn.jsdelivr.net/gh/fuchaohan/dmhy-bangumi-current-season@master/...`），并在下拉框内置 Fastly / Gcore / CF 三个镜像热备与 EdgeOne Pages 第二源。
- 移除 Greasy Fork 专用 `@downloadURL` / `@updateURL`，更新跟随本仓库。
- 当季数据已更新至 2026年10月季度（80 部），并启用日期字段做自动上下线。
- 其余脚本逻辑与原版 v0.4.3（2022-11-01）完全一致。

## EdgeOne Pages 第二源（维护者操作）

本仓库同时部署到腾讯云 EdgeOne Pages 作为国内第二数据源，接入步骤（与控制台流程一致）：

1. 登录 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)，「创建项目」→ 连接 GitHub → 选择本仓库。
2. 构建配置：本仓库为纯静态（无 package.json），框架选「无框架/静态」，安装与构建命令留空，输出目录填 `./`。
3. 加速区域按需选择（自定义域名需中国大陆加速时域名须已备案）。
4. **部署完成后到项目设置里关闭「Bot 托管挑战/托管挑战」**，否则浏览器以 `<script src>` 拉数据可能被挑战页拦截。
5. 核对项目域名：若与 `dmhy-bangumi-current-season.edgeone.app` 不一致，改 `history-list.js` 中 `default-edgeone` 那行 URL 即可。

此后每次 push，EdgeOne 自动重新部署；jsDelivr 侧约 24h 缓存，急用可到 [jsDelivr Purge](https://www.jsdelivr.com/tools/purge) 手动刷新。

## 致谢与许可

- 脚本原作者：[Masaiki](https://github.com/Masaiki)（菜姬），原仓库未声明许可证，本项目仅作镜像复刻与自托管分发，原作者权利保留。
- 当季数据来源：[Fansub Nexus](https://tinyurl.com/cnfansub)（字幕组整理，转载请带链接）、[yuc.wiki](http://yuc.wiki/202610)（长门番堂播出排期）。数据可能有误，以官方最终公布为准。
- 原版最后更新于 2022-11-01；本仓库当季数据已手工更新至 2026年10月季度，**不自动追踪后续新番**。
