import {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {CreateCodefParserDto} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useSearchCodefBillingHistories} from '^admin/factories/codef-parser-factories/form/share/useSearchCodefBillingHistories';

interface FetchStep3DataButtonProps {
    onClick: () => any;
}

export const FetchStep3DataButton = memo((props: FetchStep3DataButtonProps) => {
    const {onClick} = props;

    return (
        <button type="button" className="btn btn-xs btn-scordi" onClick={onClick}>
            3단계 데이터 불러오기
        </button>
    );
});
FetchStep3DataButton.displayName = 'FetchStep3DataButton';
