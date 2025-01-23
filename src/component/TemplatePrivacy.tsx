import React from 'react';
import { FormData } from './Form';

type PrivacyTemplateProps = {
  companyName: string;
  productName: string;
  contactInfo: string;
  formData?: FormData; // 可选，用于扩展更多内容
};

export const TemplatePrivacy: React.FC<PrivacyTemplateProps> = ({
  companyName,
  productName,
  contactInfo,
  formData,
}) => {
  const renderCollectMethod = () => {
    if (
      formData?.collectMethod.registration &&
      formData.collectMethod.thirdParty
    ) {
      return '您本人在注册时提供，以及我们从第三方合作伙伴获取';
    }
    if (formData?.collectMethod.registration) {
      return '您本人在注册时提供';
    }
    if (formData?.collectMethod.thirdParty) {
      return '从第三方合作伙伴获取';
    }
    return '';
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">{productName} 隐私政策</h1>

      <div className="mb-6 indent-8">
        欢迎您访问我们的产品。<strong>{productName}</strong>
        （包括App等产品提供的服务，以下简称"产品和服务"）是由
        <strong>{companyName}</strong>（以下简称"我们"）开发并运营的。
        确保用户的数据安全和隐私保护是我们的首要任务，本隐私政策载明了您访问和使用我们的产品和服务时所收集的数据及其处理方式。
      </div>

      <div className="mb-6 indent-8">
        请您在继续使用我们的产品前务必认真仔细阅读并确认充分理解本隐私政策全部规则和要点，
        一旦您选择使用，即视为您同意本隐私政策的全部内容，同意我们按其收集和使用您的相关信息。
        如您在在阅读过程中，对本政策有任何疑问，可联系我们的客服咨询， 请通过{' '}
        <strong>{contactInfo}</strong> 或产品中的反馈方式与我们取得联系。
        如您不同意相关协议或其中的任何条款的，您应停止使用我们的产品和服务。
      </div>

      <div className="mb-6 indent-8">
        本隐私政策帮助您了解以下内容：
        <div className="mt-2">一、我们如何收集和使用您的个人信息；</div>
        <div>二、我们如何存储和保护您的个人信息；</div>
        <div>三、我们如何共享、转让、公开披露您的个人信息；</div>
        {formData?.useCookies && (
          <div>四、我们如何使用 Cookie 和其他追踪技术；</div>
        )}
        {formData?.attractChildren && (
          <div>五、我们如何处理未成年人的个人信息；</div>
        )}
      </div>

      <h2 className="mb-4 text-xl font-semibold">
        一、我们如何收集和使用您的个人信息
      </h2>
      <div className="mb-6 indent-8">
        个人信息是指以电子或者其他方式记录的能够单独或者与其他信息，
        结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。
        我们根据《中华人民共和国网络安全法》和《信息安全技术个人信息安全规范》（GB/T
        35273-2017）
        以及其它相关法律法规的要求，并严格遵循正当、合法、必要的原则，
        出于您使用我们提供的服务和/或产品等过程中而收集和使用您的个人信息，包括但不限于
        {formData?.collectInfo.phone ? '电话号码' : ''}
        {formData?.collectInfo.email ? '电子邮箱地址' : ''}
        {formData?.collectInfo.preferences ? '偏好及兴趣' : ''}
        等。
      </div>

      <div className="mb-6 indent-8">
        为接受我们全面的产品服务，您应首先注册一个用户账号，我们将通过它记录相关的数据。
        您所提供的所有信息均来自于
        {renderCollectMethod()}
        的数据。 您准备使用的账户名、密码、您本人的联系方式，
        我们可能通过发短信或者邮件的方式来验证您的身份是否有效。
      </div>

      <h2 className="mb-4 text-xl font-semibold">
        二、我们如何存储和保护您的个人信息
      </h2>
      <div className="mb-6 indent-8">
        作为一般规则，我们仅在实现信息收集目的所需的时间内保留您的个人信息。
        我们会在对于管理与您之间的关系严格必要的时间内保留您的个人信息
        （例如，当您开立帐户，从我们的产品获取服务时）。
        出于遵守法律义务或为证明某项权利或合同满足适用的诉讼时效要求的目的，
        我们可能需要在上述期限到期后保留您存档的个人信息，并且无法按您的要求删除。
        当您的个人信息对于我们的法定义务或法定时效对应的目的或档案不再必要时，
        我们确保将其完全删除或匿名化。
        如果您确认不再使用我们的产品和服务，并按照要求主动注销了您的账户，所有信息将被完全删除。
      </div>

      {formData?.protection.encryption && (
        <div className="mb-6 indent-8">
          我们使用符合业界标准的安全防护措施保护您提供的个人信息，并加密其中的关键数据，
          防止其遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。
          我们会使用加密技术确保数据的保密性；我们会使用受信赖的保护机制防止数据遭到恶意攻击。
        </div>
      )}

      {formData?.protection.keepAfterDelete && (
        <div className="mb-6 indent-8">
          值得一提的是，为了加强对隐私数据的保护，我们在收集时就已对其进行了脱敏处理，
          即使在我们自己的数据库中，也不会储存具有关联性的、明文的隐私数据。
        </div>
      )}

      <h2 className="mb-4 text-xl font-semibold">
        三、我们如何共享、转让、公开披露您的个人信息
      </h2>
      <div className="mb-6 indent-8">
        在管理我们的日常业务活动所需要时，为追求合法利益以更好地服务客户，
        我们将合规且恰当的使用您的个人信息。出于对业务和各个方面的综合考虑，
        {formData?.scope === 'selfUse'
          ? '我们仅自身使用这些数据，不与任何第三方分享。'
          : ''}
        {formData?.scope === 'share'
          ? '我们将与第三方合作伙伴分享这些数据，这些数据将同样符合他们的隐私政策，不会被随意处置。'
          : ''}
        {formData?.scope === 'afterShare'
          ? '我们将在脱敏后与第三方合作伙伴分享这些数据，这些数据将同样符合他们的隐私政策，不会被随意处置。'
          : ''}
      </div>

      <div className="mb-4 indent-8">
        我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。
        在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。
        我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。
      </div>

      <div className="mb-6 indent-8">
        在以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：
        <div className="mt-2">1、与国家安全、国防安全直接相关的；</div>
        <div>2、与犯罪侦查、起诉、审判和判决执行等直接相关的；</div>
        <div>
          3、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
        </div>
        <div>4、您自行向社会公众公开的个人信息；</div>
        <div>
          5、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。
        </div>
        <div>6、根据个人信息主体要求签订和履行合同所必需的；</div>
        <div>
          7、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；
        </div>
        <div>8、法律法规规定的其他情形。</div>
      </div>

      {/* TODO fix 到这里下面还没校验 */}

      {/* 根据表单数据动态生成其他章节... */}
      {formData?.useCookies && (
        <>
          <h2 className="mb-4 text-xl font-semibold">
            四、Cookie 和其他追踪技术的使用
          </h2>
          <div className="mb-6 indent-8">
            我们使用 Cookie 和类似技术来提供、优化、分析和保护我们的服务。
          </div>
        </>
      )}

      {formData?.attractChildren && (
        <>
          <h2 className="mb-4 text-xl font-semibold">
            五、我们如何处理未成年人的个人信息
          </h2>
          <div className="mb-6 indent-8">
            我们的产品、网站和服务主要面向成人。如果没有父母或监护人的同意，儿童不得创建自己的用户账户。
            对于经父母同意而收集儿童个人信息的情况，我们只会在受到法律允许、
            父母或监护人明确同意或者保护儿童所必要的情况下使用或公开披露此信息。
          </div>
          <div className="mb-6 indent-8">
            如果我们发现自己在未事先获得可证实的父母同意的情况下收集了儿童的个人信息，则会设法尽快删除相关数据。
            若您是未成年人的监护人，当您对您所监护的未成年人使用我们的服务或其向我们提供的用户信息有任何疑问时，
            请您及时与我们联系。我们将根据国家相关法律法规及本政策的规定保护未成年人用户信息的保密性及安全性。
          </div>
        </>
      )}
    </div>
  );
};
