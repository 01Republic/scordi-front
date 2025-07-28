import React, {useState} from 'react';
import {Plus} from 'lucide-react';
import {WithChildren} from '^types/global.type';
import {
    FilterCondition,
    FilterOperator,
    FilterQuery,
    getDefaultOperatorForType,
    LogicalOperator,
    PropertyDefinition,
    t_logicalOperator,
} from '../core';
import {FilterConditionEditor} from './FilterConditionEditor';

// 필터 빌더 Props
interface FilterBuilderProps extends WithChildren {
    filterQuery: FilterQuery;
    onFilterChange: (query: FilterQuery) => void;
    availableProperties?: PropertyDefinition[];
    onSubmit?: (query: FilterQuery) => any;
}

// 필터 빌더 메인 컴포넌트
export const FilterBuilder: React.FC<FilterBuilderProps> = ({
    filterQuery,
    onFilterChange,
    availableProperties = [],
    onSubmit,
    children,
}) => {
    const [showDebugPanel, setShowDebugPanel] = useState(false);

    const handleAddCondition = () => {
        const firstProp = availableProperties[0];
        if (!firstProp) return;
        const newCondition = new FilterCondition(
            firstProp.name,
            getDefaultOperatorForType(firstProp.type),
            null,
            firstProp.type,
        );
        filterQuery.addCondition(newCondition);
        onFilterChange(new FilterQuery(filterQuery.rootGroup));
    };

    const handleConditionUpdate = (index: number, condition: FilterCondition) => {
        filterQuery.rootGroup.conditions[index] = condition;
        onFilterChange(new FilterQuery(filterQuery.rootGroup));
    };

    const handleConditionDelete = (index: number) => {
        filterQuery.rootGroup.removeCondition(index);
        onFilterChange(new FilterQuery(filterQuery.rootGroup));
    };

    const handleOperatorChange = (operator: LogicalOperator) => {
        filterQuery.rootGroup.operator = operator;
        onFilterChange(new FilterQuery(filterQuery.rootGroup));
    };

    return (
        <div className="flex items-start gap-4">
            <div className="flex-auto">
                <div className="p-2 bg-gray-100 rounded space-y-4">
                    {filterQuery.rootGroup.conditions.length > 0 && (
                        <div>
                            {filterQuery.rootGroup.conditions.map((condition, i) => (
                                <div className="flex gap-2 items-center" key={i}>
                                    <div className="min-w-[10%] flex items-center justify-end">
                                        {i === 0 ? (
                                            ''
                                        ) : i === 1 ? (
                                            <select
                                                value={filterQuery.rootGroup.operator}
                                                onChange={(e) =>
                                                    handleOperatorChange(e.target.value as LogicalOperator)
                                                }
                                                className="border rounded text-14 py-1 px-2"
                                            >
                                                <option value={LogicalOperator.AND}>
                                                    {t_logicalOperator(LogicalOperator.AND)}
                                                </option>
                                                <option value={LogicalOperator.OR}>
                                                    {t_logicalOperator(LogicalOperator.OR)}
                                                </option>
                                            </select>
                                        ) : (
                                            <div className="text-gray-500 text-14">
                                                {t_logicalOperator(filterQuery.rootGroup.operator).toUpperCase()}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-grow">
                                        <FilterConditionEditor
                                            condition={condition}
                                            properties={availableProperties}
                                            onUpdate={(updatedCondition) => handleConditionUpdate(i, updatedCondition)}
                                            onDelete={() => handleConditionDelete(i)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        {filterQuery.rootGroup.conditions.length === 0 ? (
                            <button
                                type="button"
                                onClick={handleAddCondition}
                                className="btn btn-sm btn-ghost gap-1 no-animation btn-animation !outline-none"
                            >
                                <Plus size={16} />
                                <span>필터 시작</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleAddCondition}
                                className="btn btn-sm btn-ghost gap-1 no-animation btn-animation !outline-none"
                            >
                                <Plus size={16} />
                                <span>필터 규칙 추가</span>
                            </button>
                        )}

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                onChange={(e) => setShowDebugPanel(e.target.checked)}
                                className="checkbox checkbox-primary checkbox-sm"
                            />

                            <span className="text-12">디버그 모드</span>
                        </label>

                        {onSubmit && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (!filterQuery.isEmpty() && filterQuery.isValid()) onSubmit(filterQuery);
                                }}
                                className={`btn btn-sm btn-scordi no-animation btn-animation ${
                                    !filterQuery.isEmpty() && filterQuery.isValid()
                                        ? ''
                                        : 'opacity-50 pointer-events-none'
                                }`}
                            >
                                적용
                            </button>
                        )}

                        {children}
                    </div>
                </div>
            </div>

            {/* 디버그용 JSON 출력 */}
            <div className="w-[40%] min-w-[400px]">
                <div className="px-4 py-3 bg-gray-100 rounded">
                    <div className="grid grid-cols-3">
                        <div>
                            <p>
                                조건 상태:{' '}
                                {!filterQuery.isEmpty() && filterQuery.isValid() ? (
                                    <b className="text-green-500">유효</b>
                                ) : (
                                    <b className="text-red-500">미완성</b>
                                )}
                            </p>
                        </div>
                        <div>
                            <p>
                                조회 결과: <b>0건</b>
                            </p>
                        </div>
                        <div>
                            <p>
                                대상 중복: <b>0건</b>
                            </p>
                        </div>
                    </div>

                    {showDebugPanel && (
                        <div className="mt-4">
                            <h4 className="text-16 font-semibold mb-2">현재 필터 JSON:</h4>
                            <pre className="text-sm overflow-auto">{JSON.stringify(filterQuery.toJSON(), null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
