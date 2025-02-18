import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Result } from './Result';

type FormStep = 1 | 2 | 3;

export type FormData = {
  productName: string;
  developerName: string;
  productType: 'App' | 'Website' | 'Other';
  contactInfo: string;
  // 新增收集信息的总开关
  collectUserInfo: boolean;
  // 第二步的数据
  collectInfo: {
    phone: boolean;
    email: boolean;
    preferences: boolean;
  };
  collectMethod: {
    registration: boolean;
    thirdParty: boolean;
  };
  scope: 'selfUse' | 'share' | 'afterShare';
  protection: {
    encryption: boolean;
    keepAfterDelete: boolean;
  };
  deletion: {
    deleteWhenNotNeeded: boolean;
    allowUserDelete: boolean;
  };
  useCookies: boolean;
  attractChildren: boolean;
};

export const Form = ({ productName }: { productName: string }) => {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [generatedContent, setGeneratedContent] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      productName: productName,
      productType: 'App',
      collectUserInfo: true,
      collectInfo: {
        phone: false,
        email: false,
        preferences: false,
      },
      collectMethod: {
        registration: false,
        thirdParty: false,
      },
      scope: 'selfUse',
      protection: {
        encryption: false,
        keepAfterDelete: false,
      },
      deletion: {
        deleteWhenNotNeeded: false,
        allowUserDelete: false,
      },
      useCookies: false,
      attractChildren: false,
    },
  });

  // 监听收集信息开关的状态
  const collectUserInfo = watch('collectUserInfo');

  const onSubmit = (data: FormData) => {
    if (currentStep === 2) {
      // 生成隐私政策内容
      setGeneratedContent(JSON.stringify(data));
      nextStep();
    } else {
      nextStep();
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as FormStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as FormStep);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* 步骤指示器 */}
      <div className="mb-8 ml-[100px] flex items-center justify-between px-6">
        {[
          { step: 1, label: '基本配置' },
          { step: 2, label: '附加选项' },
          { step: 3, label: '生成结果' },
        ].map(({ step, label }) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex items-center">
              <div
                className={`
                flex h-8 w-8 items-center justify-center rounded-full
                ${
                  step === currentStep
                    ? 'bg-blue-600 text-white'
                    : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                }
              `}
              >
                {step}
              </div>
              <span className="ml-2 text-sm text-gray-600">{label}</span>
            </div>
            {step < 3 && (
              <div
                className={`mx-4 h-[1px] flex-1 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {currentStep === 3 ? (
        <Result
          onBack={() => setCurrentStep(2)}
          formData={JSON.parse(generatedContent)}
        />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg bg-white p-6 shadow-sm"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  产品名称
                </label>
                <input
                  {...register('productName', { required: true })}
                  className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  开发者/公司名称
                </label>
                <input
                  {...register('developerName', { required: true })}
                  className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  产品类型
                </label>
                <select
                  {...register('productType')}
                  className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="App">App</option>
                  <option value="Website">网站</option>
                  <option value="AppAndWebsite">App及网站</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  联系方式(邮箱等)
                </label>
                <input
                  {...register('contactInfo', { required: true })}
                  className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('collectUserInfo')}
                    className="rounded text-blue-600"
                  />
                  <span className="ml-2 font-medium">收集用户的个人信息</span>
                </label>

                {collectUserInfo && (
                  <div className="ml-6 space-y-6 border-l-2 border-gray-100 pl-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">收集哪些信息:</p>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('collectInfo.phone')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">电话</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('collectInfo.email')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">邮件</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('collectInfo.preferences')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">偏好及兴趣</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">如何收集:</p>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('collectMethod.registration')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">用户注册账户</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('collectMethod.thirdParty')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">第三方来源</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">适用范围:</p>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="selfUse"
                            {...register('scope')}
                            className="text-blue-600"
                          />
                          <span className="ml-2">仅自身使用</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="share"
                            {...register('scope')}
                            className="text-blue-600"
                          />
                          <span className="ml-2">与合作方分享</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="afterShare"
                            {...register('scope')}
                            className="text-blue-600"
                          />
                          <span className="ml-2">脱敏后分享</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">如何存储和保护:</p>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('protection.encryption')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">加密关键信息</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('protection.keepAfterDelete')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">隐私内容脱敏后保存</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">数据删除相关:</p>
                      <div className="space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('deletion.deleteWhenNotNeeded')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">不需要时将销毁用户数据</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            {...register('deletion.allowUserDelete')}
                            className="rounded text-blue-600"
                          />
                          <span className="ml-2">允许用户删除账户及信息</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">其他选项</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('useCookies')}
                      className="rounded text-blue-600"
                    />
                    <span className="ml-2">使用Cookie等其它跟踪器</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('attractChildren')}
                      className="rounded text-blue-600"
                    />
                    <span className="ml-2">产品可能吸引儿童</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className={`rounded-lg px-6 py-2 ${
                currentStep === 1
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={currentStep === 1}
            >
              {currentStep === 1 ? '取消' : '上一步'}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              {currentStep === 2 ? '确认生成' : '下一步'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
