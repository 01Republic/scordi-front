import {DetachableOptionItem} from './DetachableOptionItem';
import {ValueComponent} from './type';
import {ContainerHeader} from '^v3/share/table/columns/SelectColumn/ContainerHeader';
import {ContainerBody} from '^v3/share/table/columns/SelectColumn/ContainerBody';

interface SelectedOptionsContainerProps<T> {
    selectedOptions: T[];
    ValueComponent: ValueComponent<T>;

    // 옵션 연결 해제를 요청합니다. (옵션이 관계형 데이터일때)
    detachOption?: (option: T) => Promise<boolean>;

    // 컨테이너 상단 안내 문구
    boxTitle?: string;

    // 옵션의 클래스를 지정합니다.
    optionWrapperClass?: string;
}

export const SelectedOptionsContainer = <T,>(props: SelectedOptionsContainerProps<T>) => {
    const {selectedOptions, ValueComponent, boxTitle = '연결된 옵션', detachOption, optionWrapperClass = ''} = props;

    // 옵션 연결을 해제하는 방법이 제공되어 있지 않거나,
    // 해제할 수 있는 상태로 연결되어있는 옵션이 없는 경우,
    // 컴포넌트 랜더링을 생략합니다.
    if (!detachOption || !selectedOptions.length) return <></>;

    return (
        <>
            <ContainerHeader title={boxTitle} className="mb-[2px]" />

            <ContainerBody entries={selectedOptions} className="mb-1">
                {selectedOptions.map((option, i) => (
                    <DetachableOptionItem
                        key={i}
                        option={option}
                        ValueComponent={ValueComponent}
                        detachRequest={detachOption}
                        className={optionWrapperClass}
                    />
                ))}
            </ContainerBody>

            <hr className="mb-3" />
        </>
    );
};
SelectedOptionsContainer.displayName = 'SelectedOptionsContainer';
