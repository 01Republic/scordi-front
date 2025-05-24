import {memo} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {CodefCardParserListPageRoute} from '^pages/admin/factories/codef-card-parsers';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';

interface RemoveParserItemProps {
    parser: CodefCardParserDto;
    hide?: () => any;
}

export const RemoveParserItem = memo((props: RemoveParserItemProps) => {
    const {parser, hide} = props;
    const router = useRouter();

    const onClick = async () => {
        if (parser.isActive) {
            alert('활성상태의 파서는 바로 삭제할 수 없습니다.\n먼저 비활성화부터 해주세요.');
            return;
        }

        confirmed(confirmDialog())
            .then(() => adminCodefCardParserApi.destroy(parser.id))
            .then(() => hide && hide())
            .then(() => toast.success('삭제 완료'))
            .then(() => router.replace(CodefCardParserListPageRoute.path()))
            .catch(errorToast)
            .finally(() => hide && hide());
    };

    return (
        <MoreDropdown.MenuItem
            onClick={onClick}
            className="bg-pink-100 text-red-500 hover:!bg-red-600 hover:!text-white transition-all"
        >
            <div>이 버전 삭제하기</div>
        </MoreDropdown.MenuItem>
    );
});
RemoveParserItem.displayName = 'RemoveParserItem';

function confirmDialog() {
    return confirm2(
        '정말 삭제할까요?',
        <div>
            <p>이 작업은 취소 할 수 없습니다.</p>
            <p>
                <b>워크스페이스 전체</b>에서 삭제됩니다.
            </p>
            <p>그래도 삭제할까요?</p>
        </div>,
        'warning',
    );
}
