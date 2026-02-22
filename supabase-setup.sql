-- 五险一金计算器 - Supabase 数据库设置脚本
-- 在 Supabase 项目的 SQL 编辑器中执行此脚本

-- 1. 创建城市标准表
CREATE TABLE IF NOT EXISTS cities (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  city_name TEXT NOT NULL,
  year TEXT NOT NULL,
  base_min INT NOT NULL,
  base_max INT NOT NULL,
  rate FLOAT NOT NULL
);

-- 2. 创建员工工资表
CREATE TABLE IF NOT EXISTS salaries (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  month TEXT NOT NULL,
  salary_amount INT NOT NULL
);

-- 3. 创建计算结果表
CREATE TABLE IF NOT EXISTS results (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  employee_name TEXT NOT NULL,
  avg_salary FLOAT NOT NULL,
  contribution_base FLOAT NOT NULL,
  company_fee FLOAT NOT NULL
);

-- 4. 插入佛山社保标准示例数据
INSERT INTO cities (city_name, year, base_min, base_max, rate)
VALUES ('佛山', '2024', 1900, 31056, 0.15)
ON CONFLICT DO NOTHING;

-- 5. 禁用 RLS (Row Level Security) 以便简化开发
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE salaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- 允许所有操作（开发环境配置）
CREATE POLICY "Allow all access on cities" ON cities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access on salaries" ON salaries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access on results" ON results FOR ALL USING (true) WITH CHECK (true);
