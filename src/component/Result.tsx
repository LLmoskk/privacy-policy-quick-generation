import { useRef, useState } from 'react';
import { FormData } from './Form';
import { TemplatePrivacy } from './TemplatePrivacy';
import JSZip from 'jszip';

type ResultProps = {
  onBack: () => void;
  formData: FormData;
};

export const Result = ({ onBack, formData }: ResultProps) => {
  const templateRef = useRef<HTMLDivElement>(null);
  const [showDeployInstructions, setShowDeployInstructions] = useState(false);

  const downloadTxtFile = () => {
    if (templateRef.current) {
      const text = templateRef.current.textContent;
      const element = document.createElement('a');
      const file = new Blob([text || ''], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${formData.productName}.txt`;
      document.body.appendChild(element);
      element.click();
    }
  };

  const downloadHtmlFile = () => {
    if (templateRef.current) {
      const html = templateRef.current.outerHTML;
      const zip = new JSZip();
      zip.folder(formData.productName)?.file('index.html', html);

      zip.generateAsync({ type: 'blob' }).then(function (blob) {
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.download = `${formData.productName}.zip`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
    }
  };

  const handleDeployToNetlify = () => {
    setShowDeployInstructions(true);
  };

  return (
    <div className="space-y-6">
      <div
        className="max-h-[500px] overflow-y-auto rounded-lg bg-white p-6 shadow-sm"
        ref={templateRef}
      >
        <TemplatePrivacy
          companyName={formData.developerName}
          productName={formData.productName}
          contactInfo={formData.contactInfo}
          formData={formData}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded-lg bg-gray-100 px-6 py-2 text-gray-600 hover:bg-gray-200"
        >
          返回修改
        </button>

        <div className="space-x-4">
          <button
            className="rounded-lg bg-gray-100 px-6 py-2 text-gray-600 hover:bg-gray-200"
            onClick={downloadTxtFile}
          >
            下载 TXT
          </button>
          <button
            className="rounded-lg bg-gray-100 px-6 py-2 text-gray-600 hover:bg-gray-200"
            onClick={downloadHtmlFile}
          >
            下载 HTML
          </button>
          <button
            className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
            onClick={handleDeployToNetlify}
          >
            部署到 Netlify
          </button>
        </div>
      </div>

      {showDeployInstructions && (
        <div className="mt-6 rounded-lg bg-gray-100 p-6">
          <h3 className="mb-4 text-lg font-semibold">Netlify 部署教程</h3>
          <ol className="list-inside list-decimal space-y-2">
            <li>
              <strong>下载 HTML 文件:</strong> 点击 "下载 HTML" 按钮，下载
              <code>{formData.productName}.html</code> 文件夹。
            </li>
            <li>
              <strong>访问 Netlify 网站:</strong>{' '}
              <a
                href="https://www.netlify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                点击访问 Netlify
              </a>{' '}
              并注册或登录。
            </li>
            <li>
              <strong>拖拽部署: </strong>在 Netlify 网站的 "Sites"
              页面，将下载的 HTML 文件 <strong>拖拽</strong> 到页面的{' '}
              <strong>虚线框区域</strong> "Drag and drop your site output folder
              here"。
            </li>
            <li>
              <strong>等待部署完成: </strong>
              Netlify 会自动部署你的网站，稍等片刻，Netlify 会提供一个以
              `.netlify.app` 结尾的网站链接，点击即可访问你的隐私政策页面。
            </li>
          </ol>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              * 提示: 你也可以将 HTML
              文件放到一个文件夹中，然后拖拽文件夹进行部署，方便管理。
            </p>
          </div>
          <button
            onClick={() => setShowDeployInstructions(false)}
            className="mt-4 rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            关闭教程
          </button>
        </div>
      )}
    </div>
  );
};
