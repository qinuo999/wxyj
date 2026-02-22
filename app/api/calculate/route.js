import { supabase, TABLES } from '../../../config/supabase.js'

export async function POST(request) {
  try {
    // 1. 从 salaries 表读取所有数据
    const { data: salariesData, error: salariesError } = await supabase
      .from(TABLES.SALARIES)
      .select('*')

    if (salariesError) {
      console.error('Salaries query error:', salariesError)
      return Response.json({ error: '查询工资数据失败: ' + salariesError.message }, { status: 500 })
    }

    if (!salariesData || salariesData.length === 0) {
      return Response.json({ error: '没有工资数据，请先上传员工工资数据' }, { status: 400 })
    }

    // 2. 按 employee_name 分组，计算年度月平均工资
    const employeeGroups = {}

    salariesData.forEach(record => {
      const name = record.employee_name
      if (!employeeGroups[name]) {
        employeeGroups[name] = { totalSalary: 0, months: new Set() }
      }
      employeeGroups[name].totalSalary += record.salary_amount
      employeeGroups[name].months.add(record.month)
    })

    // 计算每位员工的平均工资
    const employeeAverages = Object.entries(employeeGroups).map(([name, data]) => ({
      employee_name: name,
      avg_salary: data.totalSalary / data.months.size
    }))

    // 3. 获取佛山社保标准
    const { data: citiesData, error: citiesError } = await supabase
      .from(TABLES.CITIES)
      .select('*')
      .eq('city_name', '佛山')
      .single()

    if (citiesError || !citiesData) {
      return Response.json({ error: '未找到佛山的社保标准数据，请先上传城市数据' }, { status: 400 })
    }

    const { base_min, base_max, rate } = citiesData

    // 4. 计算缴费基数和公司缴费金额
    const results = employeeAverages.map(employee => {
      let contribution_base

      // 确定缴费基数
      if (employee.avg_salary < base_min) {
        contribution_base = base_min
      } else if (employee.avg_salary > base_max) {
        contribution_base = base_max
      } else {
        contribution_base = employee.avg_salary
      }

      // 计算公司缴费金额
      const company_fee = contribution_base * rate

      return {
        employee_name: employee.employee_name,
        avg_salary: parseFloat(employee.avg_salary.toFixed(2)),
        contribution_base: parseFloat(contribution_base.toFixed(2)),
        company_fee: parseFloat(company_fee.toFixed(2))
      }
    })

    // 5. 清空 results 表并插入新结果
    const { error: deleteError } = await supabase
      .from(TABLES.RESULTS)
      .delete()
      .neq('id', 0)

    if (deleteError) {
      console.error('Delete results error:', deleteError)
      return Response.json({ error: '清空结果表失败: ' + deleteError.message }, { status: 500 })
    }

    const { data: insertedData, error: insertError } = await supabase
      .from(TABLES.RESULTS)
      .insert(results)
      .select()

    if (insertError) {
      console.error('Insert results error:', insertError)
      return Response.json({ error: '保存结果失败: ' + insertError.message }, { status: 500 })
    }

    return Response.json({
      success: true,
      count: insertedData.length,
      message: `计算完成！生成 ${insertedData.length} 条结果`,
      results: insertedData
    })

  } catch (error) {
    console.error('Calculation error:', error)
    return Response.json({ error: '计算失败: ' + error.message }, { status: 500 })
  }
}
