import {memo} from 'react';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefBankAccountParserDto} from '^models/_codef/CodefBankAccountParser/type';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';

interface ActivateButtonProps {
    parser: CodefBankAccountParserDto;
    reload?: () => any;
}

export const ActivateButton = memo((props: ActivateButtonProps) => {
    const {parser, reload} = props;

    const onClick = () => {
        const msg = '이 파서를 활성화 할까요?\n같은 Product 에 대한 다른 파서는 비활성화 처리합니다.';
        if (!confirm(msg)) return;

        adminCodefBankAccountParserApi
            .toggleActive(parser.id)
            .then(() => toast.success('Success!'))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    if (parser.isActive) {
        return (
            <button
                type="button"
                className="btn bg-green-200 hover:bg-green-400 text-green-600 hover:text-green-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                onClick={() => {
                    alert('이 파서를 비활성화 하려면\n다른 파서를 활성화 하는 방법으로만 할 수 있어요.');
                }}
            >
                활성 상태입니다.
            </button>
        );
    }

    return (
        <button
            type="button"
            className="btn bg-sky-200 hover:bg-sky-400 text-sky-600 hover:text-sky-900 transition-all rounded-[14px] border-none no-animation btn-animation"
            onClick={() => {
                const msg =
                    '작업한 내용이 있다면 취소를 클릭후 먼저 저장한 뒤 진행해주세요.\n확인을 누르면 기존 파서를 기준으로 이관합니다.\n\n계속 진행할까요?';
                if (!confirm(msg)) return;

                onClick();
            }}
        >
            활성화 하기
        </button>
    );
});
ActivateButton.displayName = 'ActivateButton';
