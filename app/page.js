import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl w-full">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            五险一金计算器
          </h1>
          <p className="text-gray-600 text-lg">
            根据员工工资数据和城市社保标准，计算公司应缴纳费用
          </p>
        </div>

        {/* 功能卡片容器 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 数据上传卡片 */}
          <Link href="/upload" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer border border-gray-100">
              <div className="flex flex-col items-center text-center">
                {/* 图标 */}
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  数据上传
                </h2>

                <p className="text-gray-600 mb-6">
                  上传Excel数据并执行计算操作
                </p>

                <div className="text-blue-600 font-medium flex items-center group-hover:gap-2 transition-all">
                  点击进入
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* 结果查询卡片 */}
          <Link href="/results" className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer border border-gray-100">
              <div className="flex flex-col items-center text-center">
                {/* 图标 */}
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                  结果查询
                </h2>

                <p className="text-gray-600 mb-6">
                  查看计算结果和数据展示
                </p>

                <div className="text-green-600 font-medium flex items-center group-hover:gap-2 transition-all">
                  点击进入
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 页脚 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          五险一金计算器 © 2024
        </div>
      </div>
    </div>
  )
}
