import { useState } from 'react';
import banner from '@/assets/images/banner.png';
import { Form } from './component/Form';

const App = () => {
  const [productName, setProductName] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleStartGenerate = () => {
    if (productName.trim()) {
      setShowForm(true);
    }
  };

  if (showForm) {
    return <Form productName={productName} />;
  }

  return (
    <div className="px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* 顶部区域 */}
        <div className="flex flex-col gap-8 justify-between items-center mb-16 md:flex-row">
          <div className="flex-1">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              App / 网站
              <br />
              <span className="text-2xl">
                所需隐私政策文件 URL{' '}
                <span className="text-blue-600">免费生成</span>
              </span>
            </h1>
            <div className="mt-8 max-w-xl">
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="输入您的产品名称"
                className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleStartGenerate}
                className="px-6 py-3 mt-4 w-full font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700"
              >
                开始生成
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img src={banner} alt="banner" className="w-full max-w-lg" />
          </div>
        </div>

        {/* 底部特性区域 */}
        <div className="mt-16">
          <h2 className="mb-12 text-3xl font-bold text-blue-600">
            全部覆盖 从创建到部署
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center items-center mb-4 w-8 h-8 bg-blue-100 rounded-full">
                <span className="text-blue-600">✏️</span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                仅需几次填写与选择
              </h3>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center items-center mb-4 w-8 h-8 bg-purple-100 rounded-full">
                <span className="text-purple-600">⬇️</span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                一键导出TXT，HTML文件
              </h3>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-center items-center mb-4 w-8 h-8 bg-blue-100 rounded-full">
                <span className="text-blue-600">🌐</span>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                直接部署为隐私政策网页
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
