import {memo} from 'react';
import {BsQuestionCircle} from 'react-icons/bs';
import {LinkTo} from '^components/util/LinkTo';

export const Inquiry = memo(function Inquiry() {
    return (
        <div>
            <BsQuestionCircle size={20} className="text-gray-500 mb-3 relative -left-[1px]" />

            <h4 className="text-13 mb-3">연동에 문제가 있나요?</h4>
            <p className="text-12 font-medium text-gray-500 leading-[1.5] mb-4">
                아래 1:1 채팅상담 버튼을 눌러 발생된 문제를 설명한 뒤, <br /> 배정된 담당자에게 도움을 요청 해 주세요.
            </p>

            <LinkTo
                href="https://scordi.channel.io/lounge"
                target="_blank"
                displayLoading={false}
                className="btn btn-sm normal-case !bg-white !border-gray-300 !text-gray-500 !rounded-md shadow hover:shadow-lg"
            >
                1:1 채팅상담
            </LinkTo>
        </div>
    );
});
