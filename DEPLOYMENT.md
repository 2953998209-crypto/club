# 湖北盐业荆州分公司 · 库存商品进销存智能管理看板系统

## 部署指南

### 环境要求

- Node.js >= 18.x
- npm >= 9.x 或 pnpm >= 8.x

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问
open http://localhost:5173/club/
```

### 构建生产版本

```bash
# 构建项目
npm run build

# 构建产物将生成在 dist/ 目录下
```

### 部署到 GitHub Pages

#### 方法一：使用 gh-pages 包（推荐）

```bash
# 安装 gh-pages
npm install -g gh-pages

# 部署到 GitHub Pages
npm run deploy
```

#### 方法二：手动部署

```bash
# 构建项目
npm run build

# 将 dist 目录内容推送到 gh-pages 分支
git subtree push --prefix dist origin gh-pages
```

### GitHub Pages 配置

1. 打开 GitHub 仓库设置
2. 找到 Pages 选项
3. 选择 Source 为 `gh-pages branch`
4. 等待几分钟后访问 `https://2953998209-crypto.github.io/club/`

## 项目结构

```
.
├── .trae/documents/          # PRD和技术文档
│   ├── prd.md               # 产品需求文档
│   └── tech-arch.md         # 技术架构文档
├── public/                  # 静态资源
│   └── favicon.svg          # 网站图标
├── src/                     # 源代码
│   ├── components/          # 组件
│   │   ├── Charts/          # 图表组件
│   │   │   ├── BarChart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   └── PieChart.tsx
│   │   ├── Dashboard/       # 仪表盘组件
│   │   │   └── KPICard.tsx
│   │   ├── Layout/          # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.tsx
│   │   ├── Table/           # 表格组件
│   │   │   └── DataTable.tsx
│   │   └── Upload/          # 上传组件
│   │       └── FileUpload.tsx
│   ├── data/                # Mock数据
│   │   ├── inventory.ts     # 库存数据
│   │   ├── sales.ts         # 销售数据
│   │   ├── purchase.ts      # 购进数据
│   │   ├── monthly.ts       # 月度数据
│   │   └── index.ts         # 数据API
│   ├── pages/               # 页面组件
│   │   ├── Dashboard.tsx    # 看板总览
│   │   ├── Sales.tsx        # 销售管理
│   │   ├── Purchase.tsx     # 购进管理
│   │   ├── Inventory.tsx    # 库存管理
│   │   ├── Analytics.tsx    # 数据分析
│   │   └── Upload.tsx       # 数据上传
│   ├── store/               # 状态管理
│   │   └── dataStore.ts     # Zustand store
│   ├── types/               # TypeScript类型
│   │   └── index.ts
│   ├── utils/               # 工具函数
│   │   └── format.ts        # 格式化工具
│   ├── App.tsx              # 应用入口
│   ├── main.tsx             # React入口
│   └── index.css            # 全局样式
├── index.html               # HTML模板
├── package.json             # 依赖配置
├── vite.config.ts           # Vite配置
├── tailwind.config.js       # Tailwind配置
├── postcss.config.js        # PostCSS配置
└── tsconfig.json            # TypeScript配置
```

## 功能模块

| 模块 | 功能 |
|------|------|
| 📊 看板总览 | 核心KPI卡片、月度趋势图、分类占比饼图、TOP10销售、库存预警 |
| 💰 销售管理 | 分类销售柱状图、单价分析、销售明细表、分类筛选 |
| 📥 购进管理 | 采购量柱状图、购进结构饼图、购进明细表 |
| 📦 库存管理 | 仓库分布图、预警分布饼图、预警详情列表、库存搜索 |
| 📈 数据分析 | 进销存对比、库存趋势、分类经营台账 |
| ⬆️ 数据上传 | CSV/Excel拖拽上传、智能字段识别 |

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS 3
- **图表**: Chart.js + react-chartjs-2
- **图标**: Lucide React
- **路由**: React Router DOM
- **状态管理**: Zustand

## 数据存储

- 初始数据: Mock JSON数据
- 用户上传数据: Local Storage持久化
- 刷新页面时优先读取Local Storage数据
