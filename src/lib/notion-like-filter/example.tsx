import React, {useState} from 'react';
import {FilterQuery, FilterType, PropertyDefinition} from './core';
import {FilterBuilder} from './component';

// 1. 프론트엔드 사용 예제
export const ExampleApp: React.FC = () => {
    const [filterQuery, setFilterQuery] = useState(new FilterQuery());

    const handleApplyFilter = () => {
        console.log('적용된 필터:', filterQuery.toJSON());
        console.log('isValid:', filterQuery.isValid());
        // 여기서 백엔드로 필터 쿼리를 전송
    };

    return (
        <div className="">
            <FilterBuilder
                filterQuery={filterQuery}
                onFilterChange={setFilterQuery}
                availableProperties={[
                    new PropertyDefinition('title', '제목', FilterType.TEXT),
                    new PropertyDefinition('status', '상태', FilterType.SELECT, ['진행중', '완료', '취소']),
                    new PropertyDefinition('priority', '우선순위', FilterType.NUMBER),
                    new PropertyDefinition('createdAt', '생성일', FilterType.DATE),
                    new PropertyDefinition('isCompleted', '완료여부', FilterType.BOOLEAN),
                ]}
                debuggable={false}
            />

            <div className="mt-4">
                <button
                    type="button"
                    onClick={handleApplyFilter}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    // disabled={!filterQuery.isValid()}
                >
                    필터 적용
                </button>
            </div>
        </div>
    );
};
