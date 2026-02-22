import { supabase, TABLES } from '../../../config/supabase.js'

export async function GET(request) {
  try {
    const { data: results, error } = await supabase
      .from(TABLES.RESULTS)
      .select('*')
      .order('employee_name', { ascending: true })

    if (error) {
      console.error('Results query error:', error)
      return Response.json({ error: '查询结果失败: ' + error.message }, { status: 500 })
    }

    return Response.json({
      success: true,
      count: results?.length || 0,
      results: results || []
    })

  } catch (error) {
    console.error('Results fetch error:', error)
    return Response.json({ error: '获取结果失败: ' + error.message }, { status: 500 })
  }
}
