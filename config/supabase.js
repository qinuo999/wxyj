import { createClient } from '@supabase/supabase-js'

// Supabase 配置
// 请在 .env.local 文件中设置以下环境变量：
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('警告: Supabase 配置缺失，请检查 .env.local 文件')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据表名称常量
export const TABLES = {
  CITIES: 'cities',
  SALARIES: 'salaries',
  RESULTS: 'results',
}
