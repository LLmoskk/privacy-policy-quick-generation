import { FormData } from './Form';
import { TemplatePrivacy } from './TemplatePrivacy';

type ResultProps = {
  onBack: () => void;
  formData: FormData;
};

export const Result = ({ onBack, formData }: ResultProps) => {
  return (
    <div className="space-y-6">
      <div className="max-h-[500px] overflow-y-auto rounded-lg bg-white p-6 shadow-sm">
        <TemplatePrivacy
          companyName={formData.developerName}
          productName={formData.productName}
          contactInfo={formData.contactInfo}
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
          <button className="rounded-lg bg-gray-100 px-6 py-2 text-gray-600 hover:bg-gray-200">
            下载 TXT
          </button>
          <button className="rounded-lg bg-gray-100 px-6 py-2 text-gray-600 hover:bg-gray-200">
            下载 HTML
          </button>
          <button className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700">
            一键自动部署
          </button>
        </div>
      </div>
    </div>
  );
};
