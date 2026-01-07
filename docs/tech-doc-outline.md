# 企业级前端项目技术文档编写大纲

## 一、项目概述

### 1.1 项目背景
- 项目定位与业务场景
- 技术选型原因
- 项目规模与团队情况

### 1.2 技术栈总览
- 核心框架：Vue 2.6.14
- UI 组件库：Element UI 2.15.8（workspace 内维护）
- 状态管理：Vuex 3.1.1
- 路由管理：Vue Router 3.0.7
- 构建工具：Webpack 5.74.0
- 包管理：pnpm + Monorepo
- 开发语言：JavaScript + TypeScript（部分工具链）

### 1.3 项目架构图
- 整体架构图
- 模块划分图
- 数据流图

---

## 二、工程化基建

### 2.1 Monorepo 架构设计
- **workspace 配置**：`pnpm-workspace.yaml` 配置说明
- **包管理策略**：
  - `@qft-app/web`：主应用
  - `@qft-app/element`：Element UI 定制版本
  - `@qft-app/lazy-dialog-loader`：弹窗懒加载 loader
  - `@qft-app/sfc-loader`：SFC 文件处理 loader
  - `@qft-app/prefetching-webpack-plugin`：预取插件
  - `@qft-app/replacing-webpack-plugin`：替换插件
- **依赖管理**：workspace 协议使用、依赖提升策略

### 2.2 构建系统

#### 2.2.1 Webpack 配置体系
- **配置分层**：
  - `webpack.common.js`：公共配置
  - `webpack.dev.js`：开发环境配置
  - `webpack.prod.js`：生产环境配置
  - `webpack.analysis.js`：构建分析配置
- **核心特性**：
  - 多线程构建（thread-loader）
  - 文件系统缓存（filesystem cache）
  - 代码分割策略（splitChunks）
  - 资源优化（图片、字体、SVG 处理）

#### 2.2.2 自定义 Loader 开发
- **lazy-dialog-loader**：
  - 功能：将弹窗方法的同步组件变为异步
  - 实现原理：AST 转换
  - 使用场景与示例
- **sfc-loader**：
  - 功能：SFC 文件预处理
  - 特性：reviewVFormTitle、tweakCloseButtonPositions
  - 实现细节

#### 2.2.3 自定义 Plugin 开发
- **prefetching-webpack-plugin**：
  - 功能：生成预取 HTML
  - 配置项：prefixes、file
  - 性能优化原理
- **replacing-webpack-plugin**：
  - 功能：构建时文件内容替换
  - 使用场景：兼容模式处理

### 2.3 开发环境
- **开发服务器**：webpack-dev-server 配置
- **热更新**：HMR 机制
- **代理配置**：`.env` 文件动态读取
- **调试模式**：DEBUG 环境变量使用

### 2.4 代码规范与质量保障

#### 2.4.1 代码检查工具链
- **ESLint**：JavaScript/Vue 代码检查
  - 配置：`.eslintrc`
  - 规则说明
- **Stylelint**：样式代码检查
  - 配置：`stylelint.config.js`
  - SCSS 规则
- **Prettier**：代码格式化
  - 配置：`prettier.config.js`
  - 与 ESLint 集成

#### 2.4.2 Git 工作流
- **Husky**：Git Hooks 管理
- **lint-staged**：提交前检查
  - JavaScript/Vue/TypeScript 文件：ESLint 修复
  - JSON/CSS/Markdown 文件：Prettier 格式化
  - Vue/CSS/SCSS 文件：Stylelint 检查
- **提交规范**：commit message 规范

#### 2.4.3 命名规范
- **文件命名**：
  - Vue 组件：PascalCase（基础组件 V 开头）
  - 其他文件：kebab-case
- **变量命名**：
  - 常量：UPPER_SNAKE_CASE
  - 变量：camelCase
  - 构造函数/类：PascalCase
- **样式命名**：
  - 业务组件：kebab-case
  - 基础组件：BEM 命名法
  - SCSS 继承：% 开头

---

## 三、核心架构设计

### 3.1 目录结构规范
```
packages/web/src/
├── api/              # API 接口层（120+ 文件）
├── assets/           # 静态资源
│   ├── images/       # 图片资源
│   ├── icons/        # 图标资源（SVG sprite）
│   └── styles/       # 全局样式
│       ├── colors.scss    # 颜色变量
│       ├── dimens.scss    # 尺寸变量
│       └── mixins.scss    # 混入
├── components/       # 公共组件（273+ 文件）
│   └── element-ui/   # Element UI 组件注册
├── views/            # 页面组件（3593+ 文件）
│   └── [module]/     # 业务模块
│       └── components/ # 模块级组件
├── router/           # 路由配置
│   ├── index.js      # 路由入口
│   ├── routes.js     # 路由定义
│   ├── menu-module-routes.js # 菜单路由映射
│   └── checker.js    # 路由守卫
├── store/            # Vuex 状态管理
│   ├── index.js      # Store 入口
│   ├── modules/      # 模块化 Store（30+ 模块）
│   ├── actions.js    # 全局 Actions
│   ├── mutations.js  # 全局 Mutations
│   └── getters.js    # 全局 Getters
├── plugins/          # 插件系统
│   ├── directives.js # 自定义指令
│   ├── filters.js    # 全局过滤器
│   ├── global-functions.js # 全局函数
│   └── websocket/    # WebSocket 插件
├── util/             # 工具函数（23+ 文件）
├── lang/             # 国际化
└── main.js           # 应用入口
```

### 3.2 路由系统
- **路由配置**：模块化路由管理
- **动态路由**：基于权限的路由生成
- **路由守卫**：`checker.js` 实现
- **菜单路由映射**：`menu-module-routes.js` 机制
- **路由懒加载**：代码分割策略

### 3.3 状态管理
- **模块化设计**：30+ 业务模块
- **命名空间**：模块隔离
- **持久化**：vuex-persistedstate 使用
- **状态设计原则**：
  - 全局状态 vs 局部状态
  - 状态扁平化
  - 避免过度嵌套

### 3.4 组件系统

#### 3.4.1 组件分类
- **基础组件**（`components/`）：
  - 命名：V 开头（如 `VButton.vue`）
  - 自动注册机制
  - 全局可用
- **业务组件**（`views/[module]/components/`）：
  - 模块内复用
  - 命名：kebab-case
- **页面组件**（`views/`）：
  - 路由级组件
  - 命名：PascalCase

#### 3.4.2 组件通信
- **Props / $emit**：父子组件
- **Vuex**：跨组件状态共享
- **EventBus**：事件总线（如需要）
- **provide / inject**：依赖注入

### 3.5 插件系统
- **自定义指令**：`directives.js`
- **全局过滤器**：`filters.js`
- **全局函数**：`global-functions.js`
- **WebSocket**：实时通信插件
- **第三方插件集成**：
  - vue-infinite-scroll
  - vue-tour
  - vue-amap

---

## 四、性能优化

### 4.1 构建优化
- **代码分割**：
  - runtime chunk 分离
  - vendor chunk 分离
  - element-ui chunk 分离
  - 业务模块按需加载
- **资源优化**：
  - 图片压缩与格式优化
  - SVG sprite 处理
  - 字体文件处理
- **压缩优化**：
  - Terser（SWC 压缩）
  - CSS 压缩
  - 移除 console

### 4.2 运行时优化
- **懒加载**：
  - 路由懒加载
  - 弹窗组件懒加载（lazy-dialog-loader）
- **预取策略**：prefetching-webpack-plugin
- **虚拟滚动**：vue-virtual-scroller
- **无限滚动**：vue-infinite-scroll

### 4.3 缓存策略
- **构建缓存**：Webpack filesystem cache
- **浏览器缓存**：contenthash 命名
- **HTTP 缓存**：CDN 配置建议

---

## 五、业务模块设计

### 5.1 模块划分
根据 `README.md` 词汇表，主要业务模块：
- **租赁管理**（Renting）
- **财务管理**（Finance）
- **审批中心**（Approval）
- **人事行政**（HumanResource）
- **微信管理**（WeChat）
- **工作流程**（Workflow）
- **统计报表**（StatisticalStatements）
- **营销推广**（Marketing）
- **商务中心**（Business）
- **系统设置**（SystemSettings）

### 5.2 模块设计原则
- **模块独立性**：高内聚、低耦合
- **代码组织**：按业务模块划分目录
- **组件复用**：模块内组件 vs 全局组件
- **API 组织**：按模块划分 API 文件

### 5.3 典型业务场景
- **表单处理**：复杂表单场景
- **表格展示**：大数据量表格优化
- **弹窗管理**：弹窗懒加载机制
- **权限控制**：路由级、组件级权限

---

## 六、工具链与基础设施

### 6.1 开发工具
- **编辑器配置**：`.editorconfig`
- **TypeScript**：部分工具链使用 TS
- **Babel**：ES6+ 转译配置
- **PostCSS**：CSS 后处理

### 6.2 测试体系
- **单元测试**：Jest 配置
- **测试工具**：`@qft-app/lazy-dialog-loader` 测试示例
- **测试策略**：测试覆盖范围

### 6.3 部署与发布
- **构建命令**：
  - `npm run build`：生产构建
  - `npm run build:support`：兼容模式构建
  - `npm run analyze`：构建分析
- **环境变量**：NODE_ENV、SUPPORT_MODE、DEBUG
- **CDN 配置**：`__webpack_public_path__` 动态设置

### 6.4 监控与调试
- **错误监控**：错误上报机制
- **性能监控**：性能指标收集
- **调试工具**：开发环境调试配置

---

## 七、最佳实践

### 7.1 代码规范实践
- **Vue 组件编写**：
  - 组件结构顺序
  - Props 定义规范
  - 计算属性 vs Methods
  - 生命周期使用
- **样式编写**：
  - SCSS 变量使用
  - 混入使用
  - 作用域隔离
  - z-index 管理
- **API 调用**：
  - 统一错误处理
  - 请求拦截器
  - 响应拦截器

### 7.2 性能优化实践
- **避免过度渲染**：合理使用 v-if / v-show
- **列表优化**：key 的使用、虚拟滚动
- **图片优化**：懒加载、格式选择
- **包体积控制**：按需引入、Tree Shaking

### 7.3 可维护性实践
- **代码注释**：关键逻辑注释
- **文档维护**：README、词汇表
- **重构策略**：渐进式重构
- **技术债务管理**：技术债务清单

---

## 八、技术难点与解决方案

### 8.1 大型项目管理
- **Monorepo 管理**：多包协调
- **代码组织**：3000+ 文件管理
- **依赖管理**：依赖版本控制

### 8.2 性能挑战
- **首屏优化**：代码分割、预取
- **大数据渲染**：虚拟滚动、分页
- **内存管理**：内存泄漏排查

### 8.3 兼容性处理
- **浏览器兼容**：SUPPORT_MODE 机制
- **Polyfill**：core-js 使用
- **CSS 兼容**：autoprefixer

### 8.4 构建优化
- **构建速度**：多线程、缓存
- **构建体积**：代码分割、Tree Shaking
- **构建稳定性**：构建错误处理

---

## 九、技术演进路线

### 9.1 当前技术栈
- Vue 2.6.14
- Webpack 5
- JavaScript 为主

### 9.2 技术升级方向
- **Vue 3 迁移**：Composition API 渐进式使用
-逐步迁移
- **TypeScript**： **Vite**：构建工具升级评估
- **微前端**：架构升级可能性

### 9.3 技术选型考量
- **升级成本**：迁移成本评估
- **团队能力**：学习曲线
- **业务影响**：升级对业务的影响

---

## 十、附录

### 10.1 常用命令
```bash
# 安装依赖
pnpm install

# 开发
pnpm start

# 构建
pnpm build

# 代码检查
pnpm lint

# 测试
pnpm test
```

### 10.2 配置文件清单
- `package.json`：项目配置
- `pnpm-workspace.yaml`：Monorepo 配置
- `webpack.*.js`：构建配置
- `.eslintrc`：ESLint 配置
- `prettier.config.js`：Prettier 配置
- `stylelint.config.js`：Stylelint 配置
- `.editorconfig`：编辑器配置

### 10.3 参考资源
- Vue 2 官方文档
- Element UI 文档
- Webpack 5 文档
- 项目内部 README

### 10.4 词汇表
参考 `packages/web/README.md` 中的词汇表，确保命名一致性。

---

## 文档编写建议

### 优先级建议
1. **高优先级**（必须）：
   - 项目概述
   - 工程化基建（构建系统、代码规范）
   - 核心架构设计（目录结构、路由、状态管理）
   - 最佳实践

2. **中优先级**（重要）：
   - 性能优化
   - 业务模块设计
   - 工具链与基础设施

3. **低优先级**（补充）：
   - 技术难点与解决方案
   - 技术演进路线
   - 附录

### 文档维护建议
- **版本控制**：文档随代码更新
- **定期审查**：季度/半年度审查
- **团队协作**：多人维护、Review 机制
- **示例代码**：保持示例代码可运行

### 文档形式建议
- **Markdown**：便于版本控制
- **图表**：架构图、流程图
- **代码示例**：关键代码片段
- **视频教程**：复杂流程可录制视频
