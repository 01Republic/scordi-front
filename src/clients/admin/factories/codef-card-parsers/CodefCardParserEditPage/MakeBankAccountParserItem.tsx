import {memo} from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type';
import {adminCodefBankAccountParserApi} from '^models/_codef/CodefBankAccountParser/api';
import {CodefBankAccountParserEditPageRoute} from '^pages/admin/factories/codef-bank-account-parsers/[id]/edit';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';

interface MakeBankAccountParserItemProps {
    parser: CodefCardParserDto;
    hide?: () => any;
}

export const MakeBankAccountParserItem = memo((props: MakeBankAccountParserItemProps) => {
    const {parser, hide} = props;
    const router = useRouter();

    const onClick = async () => {
        confirmed(confirmDialog())
            .then(() => adminCodefBankAccountParserApi.migration(parser.id))
            .then((res) => {
                hide && hide();
                toast.success('복제 완료');
                const codefBankAccountParser = res.data;
                return router.replace(CodefBankAccountParserEditPageRoute.path(codefBankAccountParser.id));
            })
            .catch(errorToast)
            .finally(() => hide && hide());
    };

    return (
        <MoreDropdown.MenuItem onClick={onClick}>
            <div>계좌 파서로 복제하기</div>
        </MoreDropdown.MenuItem>
    );
});
MakeBankAccountParserItem.displayName = 'MakeBankAccountParserItem';

function confirmDialog() {
    return confirm2(
        '파서를 복제합니다.',
        <div>
            <p>수정한 내용이 있다면 저장 먼저 해주세요.</p>
            <p>
                <b>변경사항</b>을 잃어버릴 수 있습니다.
            </p>
            <br />
            <p>수정한 내용이 없다면 이 메세지를 무시해도 됩니다.</p>
            <br />
            <p>지금 바로 실행할까요?</p>
        </div>,
        'question',
    );
}
