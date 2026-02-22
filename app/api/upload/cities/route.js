import { supabase, TABLES } from '../../../../config/supabase.js'
import * as XLSX from 'xlsx'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return Response.json({ error: '请选择文件' }, { status: 400 })
    }

    // 读取 Excel 文件
    const arrayBuffer = await file.arrayBuffer()
    const workbook = XLSX.read(arrayBuffer, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(worksheet)

    if (data.length === 0) {
      return Response.json({ error: '文件中没有数据' }, { status: 400 })
    }

    // 验证数据格式
    const requiredFields = ['city_name', 'year', 'base_min', 'base_max', 'rate']
    const invalidRows = []

    const validData = data.filter((row, index) => {
      const missingFields = requiredFields.filter(field => !(field in row))
      if (missingFields.length > 0) {
        invalidRows.push({ row: index + 2, missing: missingFields })
        return false
      }
      return true
    })

    if (invalidRows.length > 0) {
      return Response.json({
        error: '数据格式错误',
        details: `第 ${invalidRows.map(r => r.row).join(', ')} 行缺少字段: ${invalidRows[0].missing.join(', ')}`
      }, { status: 400 })
    }

    // 转换数据格式
    const citiesData = validData.map(row => ({
      city_name: String(row.city_name),
      year: String(row.year),
      base_min: Number(row.base_min),
      base_max: Number(row.base_max),
      rate: Number(row.rate),
    }))

    // 清空现有数据并插入新数据
    await supabase.from(TABLES.CITIES).delete().neq('id', 0)

    const { data: insertedData, error } = await supabase
      .from(TABLES.CITIES)
      .insert(citiesData)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json({ error: '数据库操作失败: ' + error.message }, { status: 500 })
    }

    return Response.json({
      success: true,
      count: insertedData.length,
      message: `成功上传 ${insertedData.length} 条城市数据`
    })

  } catch (error) {
    console.error('Upload error:', error)
    return Response.json({ error: '上传失败: ' + error.message }, { status: 500 })
  }
}
