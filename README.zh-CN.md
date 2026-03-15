<p align="center">
  <img src="./assets/icon.svg" alt="AhaKnow Chat 图标" width="96" />
</p>

# AhaKnow Chat

中文 | [English](./README.md)

> 一个本地优先的 AI 对话工作台，用来做 prompt 测试、话题化线程整理、角色复用和个人知识探索。

**在线体验：** [chat.ahaknow.com](https://chat.ahaknow.com)

AhaKnow Chat 不只是一个只有输入框的聊天页，它更像一个把 prompt 调试、角色系统、话题管理和个人知识工作放在一起的本地优先工作台。你可以按话题整理对话、在话题内继续拆线程、复用角色预设，并把配置和数据留在自己的浏览器里。

这个 `vercel-web` 分支是一个面向 Vercel 的纯 Web 部署分支。它移除了 Electron 构建依赖，目的是让 `npm ci` 和静态部署在 Vercel 上稳定通过。

## 快速认识一下

### 首页

![AhaKnow Chat 首页](./assets/Aha.png)

从第一条消息开始，把话题、模式和角色组织起来。

### 使用过程

![AhaKnow Chat 使用过程](./assets/Aha2.png)

用话题和线程管理对话，而不是把所有内容塞进一条无限聊天记录。

### 设置界面

![AhaKnow Chat 设置界面](./assets/Setting.png)

通过接口地址、API Key 和默认模型，直接接入 OpenAI-compatible 服务（如DeepSeek）。

## 它有什么不一样

- 不是单条无限对话，而是按话题和线程组织工作区。
- 角色可以复用，适合持续做 prompt / persona 调试。
- 同一个空间里既能单角色对话，也能多角色同时对话。
- Web 版默认 local-first，数据保存在浏览器本地。
- 纯静态 Vite 项目，可直接部署到 Vercel。

## 为什么做这个？
出于高效测试 prompt 和整理 AI 对话上下文的个人需求而构建。它始于一个实验，现在成了我的日常工具。

## 项目定位

这个仓库会公开发布，但描述需要保持诚实。就当前阶段而言，AhaKnow Chat 更接近一个好用的 chatbot + prompt playground，而不是已经成熟的研究工作流系统。

## 当前能力

- 接入任意 OpenAI-compatible API，并使用自己的 API Key。
- 按话题、线程、角色组织对话。
- 支持单角色对话和多角色同时对话。
- 数据保存在浏览器本地。
- 作为静态 Vite Web 应用部署到 Vercel。

## 如何配置 AI 提供商

1. 在应用里打开 `Settings`。
2. 进入 `AI 提供商` 标签页。
3. 将 `Base URL` 设置为你的服务地址，例如 `https://api.deepseek.com`。
4. 在 `API Key` 输入框中填入你的密钥。
5. 点击 `测试连接`，验证接口可用并拉取模型列表。
6. 选择一个默认模型，例如 `deepseek-chat` 或 `deepseek-reasoner`。
7. 保存配置后，新建话题并开始对话。

补充说明：

- Web 版会将配置保存在浏览器本地。
- 如果部署到 Vercel，目标接口需要允许浏览器请求和 CORS。
- 只要提供 OpenAI-compatible API，都可以用这种方式接入。

## 适用边界

适合你，如果你需要：

- 个人 AI 工作台
- prompt / 角色调试环境
- 本地优先的聊天记录
- 一个便于二次开发的前端项目骨架

暂时不适合你，如果你需要：

- 团队协作
- 多租户账号体系
- 服务端托管存储
- 完整的 research / evidence / publishing 流水线

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- IndexedDB

## 快速开始

### 1. 安装

```bash
npm install
```

### 2. 启动 Web 开发环境

```bash
npm run dev
```

## 构建命令

```bash
# Web build
npm run build

# Preview web production build
npm run preview
```

## 环境变量

示例文件：

- `.env.example`
- `.env.production.example`

常用变量：

- `VITE_PORT`
- `VITE_LOG_LEVEL`
- `VITE_ENABLE_CONSOLE_LOG`
- `VITE_ENABLE_FILE_LOG`
- `VITE_APP_VERSION`
- `VITE_DEBUG`

## Vercel 部署

这个分支已经按静态 Vite Web 项目配置好了 Vercel，并且不会在部署时安装 Electron 桌面依赖。

Vercel 使用的配置：

- Install command: `npm ci --ignore-scripts`
- Build command: `npm run build:web`
- Output directory: `dist`

部署步骤：

1. 在 Vercel 中导入该仓库。
2. 保持自动识别的框架为 `Vite`。
3. 使用 `vercel.json` 的默认项目配置直接部署。

## 重要说明

当前线上 Web 版是纯前端应用。它会直接从浏览器请求你配置的 AI 接口，因此：

- 用户需要自带 API Key
- 数据存储在浏览器本地，而不是 Vercel
- 目标 API 必须允许浏览器请求和 CORS

## 项目结构

```text
.
├─ src/            React 渲染层、状态管理、服务与平台适配
├─ scripts/        Web 构建与本地工具脚本
├─ assets/         静态资源与图标
├─ docs/           变更日志与项目文档
└─ vercel.json     Vercel 的 Web 部署配置
```

## 路线图

短期目标：

- 稳定开源后的 Web 体验
- 提高 onboarding 和文档质量
- 继续削弱 UI 中对桌面版的默认假设

长期目标：

- 从 chat-first 逐步演进到更强的知识工作流
- 增加导出、证据、发布等能力
- 评估更安全的服务端代理或托管架构

## 贡献

欢迎 issue 和 PR，尤其是以下方向：

- Web 部署稳定性
- local-first 体验
- prompt / role 工作流
- 代码结构清晰度

## 许可

本项目采用 `PolyForm Noncommercial 1.0.0`。这意味着你可以查看源码、学习、修改、再创作，并在非商业目的下分发，但不能将 AhaKnow Chat 或其衍生版本用于商业用途。需要商业使用时，请联系维护者单独授权。

严格来说，这不是 OSI 定义下的标准开源协议，而是更准确的 `source-available` 协议，因为它包含 non-commercial 限制。

完整法律文本见 [LICENSE](./LICENSE)，中文说明见 [LICENSE.zh-CN.md](./LICENSE.zh-CN.md)；中文说明仅用于辅助理解，不构成具有约束力的法律文本。
