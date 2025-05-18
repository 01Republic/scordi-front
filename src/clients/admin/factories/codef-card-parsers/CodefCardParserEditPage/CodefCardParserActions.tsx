import {memo} from 'react';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useIdParam} from '^atoms/common';
import {useRouter} from 'next/router';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';

interface CodefCardParserActionsProps {
    parser: CodefCardParserDto;
    refetch: () => any;
}

export const CodefCardParserActions = memo((props: CodefCardParserActionsProps) => {
    const {parser, refetch} = props;
    const id = useIdParam('id');
    const router = useRouter();

    const activate = () => {
        const msg = '이 파서를 활성화 할까요?\n같은 Product 에 대한 다른 파서는 비활성화 처리합니다.';
        if (!confirm(msg)) return;

        adminCodefCardParserApi
            .toggleActive(id)
            .then(() => toast.success('Success!'))
            .then(() => refetch())
            .catch(errorToast);
    };

    return (
        <div className={'flex gap-2 items-center'}>
            {parser.isActive ? (
                <button
                    type="button"
                    className="btn bg-green-200 hover:bg-green-400 text-green-600 hover:text-green-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                    onClick={() => {
                        alert('이 파서를 비활성화 하려면\n다른 파서를 활성화 하는 방법으로만 할 수 있어요.');
                    }}
                >
                    활성 상태입니다.
                </button>
            ) : (
                <button
                    type="button"
                    className="btn bg-sky-200 hover:bg-sky-400 text-sky-600 hover:text-sky-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                    onClick={() => {
                        const msg =
                            '작업한 내용이 있다면 취소를 클릭후 먼저 저장한 뒤 진행해주세요.\n확인을 누르면 기존 파서를 기준으로 이관합니다.\n\n계속 진행할까요?';
                        if (!confirm(msg)) return;

                        activate();
                    }}
                >
                    활성화 하기
                </button>
            )}

            {!parser.isActive && (
                <button
                    type="button"
                    className="btn bg-red-200 hover:bg-red-400 text-red-600 hover:text-red-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                    onClick={() => {
                        if (!confirm('Are you sure?')) return;
                        adminCodefCardParserApi
                            .destroy(id)
                            .then(() => toast.success('Success!'))
                            .then(() => router.push(CodefCardParserListPageRoute.path()))
                            .catch(errorToast);
                    }}
                >
                    파서 삭제
                </button>
            )}
        </div>
    );
});
CodefCardParserActions.displayName = 'CodefCardParserActions';
