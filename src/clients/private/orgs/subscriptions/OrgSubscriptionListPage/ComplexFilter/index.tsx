import React, {memo, useState} from 'react';
import {EmptyConditionButton} from './EmptyConditionButton';
import Tippy from '@tippyjs/react/headless';
import {FilterBuilder, FilterQuery, FilterType, PropertyDefinition} from '^lib/notion-like-filter';

interface ComplexFilterProps {
    //
}

export const ComplexFilter = memo((props: ComplexFilterProps) => {
    const {} = props;
    const [isVisible, setIsVisible] = useState(false);
    const [filterQuery, setFilterQuery] = useState(new FilterQuery());

    return (
        <div>
            <Tippy
                visible={isVisible}
                onClickOutside={() => setIsVisible(false)}
                placement="bottom-start"
                interactive={true}
                render={(attrs, content, instance) => {
                    return (
                        <div {...attrs} className="bg-white rounded-md border border-gray-300 shadow-lg p-4">
                            <div className="flex items-center gap-2">
                                <FilterBuilder
                                    filterQuery={filterQuery}
                                    onFilterChange={setFilterQuery}
                                    availableProperties={[
                                        new PropertyDefinition('title', '제목', FilterType.TEXT),
                                        new PropertyDefinition('status', '상태', FilterType.SELECT, [
                                            '진행중',
                                            '완료',
                                            '취소',
                                        ]),
                                        new PropertyDefinition('priority', '우선순위', FilterType.NUMBER),
                                        new PropertyDefinition('createdAt', '생성일', FilterType.DATE),
                                        new PropertyDefinition('isCompleted', '완료여부', FilterType.BOOLEAN),
                                    ]}
                                />
                            </div>
                        </div>
                    );
                }}
            >
                <div>
                    <EmptyConditionButton onClick={() => setIsVisible(true)} />
                </div>
            </Tippy>
        </div>
    );
});
ComplexFilter.displayName = 'ComplexFilter';
