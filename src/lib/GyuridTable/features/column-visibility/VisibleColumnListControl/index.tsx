import {Dispatch, SetStateAction, useState} from 'react';
import {Settings2} from 'lucide-react';
import Tippy from '@tippyjs/react/headless';
import {ColumnDef} from '^lib/GyuridTable';
import {IconButton} from '^lib/GyuridTable/ui';
import {VisibleColumnListControlPanel} from './VisibleColumnListControlPanel';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
}

/**
 * 설정 버튼을 렌더링하고 클릭 시 컬럼 표시 설정 패널(팝오버)을 표시하는 범용 컴포넌트입니다.
 *
 * VisibleColumnListControl은 전달된 columnDefs와 setColumnDefs를 사용해 VisibleColumnListControlPanel을 렌더링합니다.
 * 팝오버은 버튼 클릭으로 열리고, 외부 클릭 또는 패널이 호출하는 onClose로 닫힙니다.
 *
 * @template T - 테이블 행 객체의 타입
 * @param columnDefs - 현재 컬럼 정의 배열(가시성/순서 등 설정 대상)
 * @param setColumnDefs - columnDefs 상태를 갱신하는 상태 설정 함수
 */
export function VisibleColumnListControl<T>(props: Props<T>) {
    const {columnDefs, setColumnDefs} = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Tippy
            visible={isVisible}
            placement="bottom-start"
            interactive
            interactiveDebounce={100}
            offset={[0, 10]}
            onClickOutside={() => setIsVisible(false)}
            render={(attrs, content, instance) => (
                <VisibleColumnListControlPanel
                    attrs={attrs}
                    content={content}
                    instance={instance}
                    columnDefs={columnDefs}
                    setColumnDefs={setColumnDefs}
                    onClose={() => setIsVisible(false)}
                />
            )}
        >
            <span>
                <IconButton Icon={() => <Settings2 fontSize={14} />} name="설정" onClick={() => setIsVisible(true)} />
            </span>
        </Tippy>
    );
}
