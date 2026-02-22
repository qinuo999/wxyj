# 五险一金计算器

一个基于 Next.js 和 Supabase 的五险一金计算器 Web 应用，用于计算公司为员工应缴纳的社保公积金费用。

## 功能特性

- 数据上传：支持上传城市社保标准和员工工资数据（Excel 格式）
- 自动计算：根据工资数据和社保标准自动计算缴费金额
- 结果展示：清晰展示每位员工的计算结果
- 响应式设计：支持桌面端和移动端访问

## 技术栈

- **前端框架**：Next.js 15
- **UI 样式**：Tailwind CSS
- **后端/数据库**：Supabase
- **Excel 处理**：xlsx

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Supabase

1. 在 [Supabase](https://supabase.com) 创建一个新项目
2. 在项目的 SQL 编辑器中执行以下 SQL 创建数据表：

```sql
-- 创建城市标准表
CREATE TABLE cities (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  city_name TEXT NOT NULL,
  year TEXT NOT NULL,
  base_min INT NOT NULL,
  base_max INT NOT NULL,
  rate FLOAT NOT NULL
);

-- 创建员工工资表
CREATE TABLE salaries (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  month TEXT NOT NULL,
  salary_amount INT NOT NULL
);

-- 创建计算结果表
CREATE TABLE results (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_name TEXT NOT NULL,
  avg_salary FLOAT NOT NULL,
  contribution_base FLOAT NOT NULL,
  company_fee FLOAT NOT NULL
);
```

3. 在项目设置中获取 API 凭证
4. 复制 `.env.example` 为 `.env.local` 并填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. 运行开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

### 数据格式

#### 城市标准数据 (cities.xlsx)

| city_name | year | base_min | base_max | rate |
|-----------|------|----------|----------|------|
| 佛山      | 2024 | 1900     | 31056    | 0.15 |

#### 员工工资数据 (salaries.xlsx)

| employee_id | employee_name | month  | salary_amount |
|-------------|---------------|--------|---------------|
| E001        | 张三          | 202401 | 8000          |
| E001        | 张三          | 202402 | 9000          |

### 操作步骤

1. **上传数据**：在"数据上传"页面分别上传城市标准数据和员工工资数据
2. **执行计算**：点击"执行计算并存储结果"按钮进行计算
3. **查看结果**：在"结果查询"页面查看计算结果

### 计算逻辑

1. 按员工姓名分组，计算年度月平均工资
2. 根据城市社保标准确定缴费基数：
   - 平均工资 < 基数下限：使用基数下限
   - 平均工资 > 基数上限：使用基数上限
   - 其他情况：使用平均工资本身
3. 公司缴纳金额 = 缴费基数 × 缴费比例

## 项目结构

```
8.shebao/
├── app/
│   ├── api/              # API 路由
│   │   ├── upload/       # 数据上传 API
│   │   ├── calculate/    # 计算逻辑 API
│   │   └── results/      # 结果查询 API
│   ├── upload/           # 上传页面
│   ├── results/          # 结果页面
│   ├── page.js           # 首页
│   ├── layout.js         # 根布局
│   └── globals.css       # 全局样式
├── config/
│   └── supabase.js       # Supabase 配置
├── .env.local            # 环境变量（不提交）
├── .env.example          # 环境变量示例
├── tailwind.config.js    # Tailwind 配置
├── next.config.js        # Next.js 配置
└── package.json          # 项目配置
```

## 注意事项

- 每次上传数据会清空对应表的现有数据
- 每次计算会清空 results 表并重新生成结果
- 目前仅支持佛山市的社保标准
- Excel 文件必须包含正确的表头

## 许可证

MIT
