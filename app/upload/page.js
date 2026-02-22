'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UploadPage() {
  const [uploadingCities, setUploadingCities] = useState(false)
  const [uploadingSalaries, setUploadingSalaries] = useState(false)
  const [calculating, setCalculating] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage({ text: '', type: '' }), 5000)
  }

  const handleCitiesUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingCities(true)
    setMessage({ text: '', type: '' })

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/cities', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        showMessage(`成功上传 ${data.count} 条城市数据`, 'success')
      } else {
        showMessage(data.error || '上传失败', 'error')
      }
    } catch (error) {
      showMessage('上传失败: ' + error.message, 'error')
    } finally {
      setUploadingCities(false)
      e.target.value = ''
    }
  }

  const handleSalariesUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadingSalaries(true)
    setMessage({ text: '', type: '' })

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/salaries', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        showMessage(`成功上传 ${data.count} 条工资数据`, 'success')
      } else {
        showMessage(data.error || '上传失败', 'error')
      }
    } catch (error) {
      showMessage('上传失败: ' + error.message, 'error')
    } finally {
      setUploadingSalaries(false)
      e.target.value = ''
    }
  }

  const handleCalculate = async () => {
    setCalculating(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        showMessage(`计算完成！生成 ${data.count} 条结果`, 'success')
      } else {
        showMessage(data.error || '计算失败', 'error')
      }
    } catch (error) {
      showMessage('计算失败: ' + error.message, 'error')
    } finally {
      setCalculating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 返回首页链接 */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </Link>

        {/* 页面标题 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">数据上传与操作</h1>
          <p className="text-gray-600">上传数据并执行计算操作</p>
        </div>

        {/* 消息提示 */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* 上传城市标准数据 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">上传城市标准数据</h2>
              <p className="text-gray-600 text-sm">上传包含 cities 数据的 Excel 文件</p>
            </div>
          </div>

          <label className="block">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleCitiesUpload}
              disabled={uploadingCities}
              className="hidden"
              id="cities-upload"
            />
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                uploadingCities
                  ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                  : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
            >
              {uploadingCities ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-blue-600">上传中...</span>
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 text-blue-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-gray-600">点击选择文件或拖拽上传</span>
                  <p className="text-gray-400 text-sm mt-1">支持 .xlsx, .xls 格式</p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* 上传员工工资数据 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">上传员工工资数据</h2>
              <p className="text-gray-600 text-sm">上传包含 salaries 数据的 Excel 文件</p>
            </div>
          </div>

          <label className="block">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleSalariesUpload}
              disabled={uploadingSalaries}
              className="hidden"
              id="salaries-upload"
            />
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                uploadingSalaries
                  ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                  : 'border-green-300 hover:border-green-500 hover:bg-green-50'
              }`}
            >
              {uploadingSalaries ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-green-600">上传中...</span>
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-gray-600">点击选择文件或拖拽上传</span>
                  <p className="text-gray-400 text-sm mt-1">支持 .xlsx, .xls 格式</p>
                </>
              )}
            </div>
          </label>
        </div>

        {/* 执行计算按钮 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">执行计算并存储结果</h2>
              <p className="text-gray-600 text-sm">计算员工社保公积金并保存结果</p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            disabled={calculating}
            className={`w-full py-4 px-6 rounded-lg font-medium transition-colors ${
              calculating
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {calculating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                计算中...
              </span>
            ) : (
              '执行计算并存储结果'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
