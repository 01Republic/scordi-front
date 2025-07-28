import React, {useRef, useState} from 'react';
import {
    FilterCondition,
    FilterOperator,
    FilterType,
    FilterValue,
    getOperatorsForType,
    icon_filterType,
    PropertyDefinition,
    t_filterOperator,
} from '../core';
import {FilterTextInput} from './filter-condition-inputs/FilterTextInput';
import {FilterNumberInput} from './filter-condition-inputs/FilterNumberInput';
import {FilterDateInput} from './filter-condition-inputs/FilterDateInput';
import {FilterBooleanInput} from './filter-condition-inputs/FilterBooleanInput';
import {FilterSelectInput} from './filter-condition-inputs/FilterSelectInput';
import {FilterMultiSelectInput} from './filter-condition-inputs/FilterMultiSelectInput';

// 필터 조건 에디터 컴포넌트
export const FilterConditionEditor: React.FC<{
    condition: FilterCondition;
    properties: PropertyDefinition[];
    onUpdate: (condition: FilterCondition) => void;
    onDelete: () => void;
}> = ({condition, properties, onUpdate, onDelete}) => {
    const [localCondition, setLocalCondition] = useState(condition);
    const inputRef = useRef(null);

    const handlePropertyChange = (property: string) => {
        const propDef = properties.find((p) => p.name === property);
        if (propDef) {
            const newCondition = new FilterCondition(
                property,
                getDefaultOperatorForType(propDef.type),
                null,
                propDef.type,
            );
            setLocalCondition(newCondition);
            onUpdate(newCondition);
        }
    };

    const handleOperatorChange = (operator: FilterOperator) => {
        const newCondition = new FilterCondition(
            localCondition.property,
            operator,
            localCondition.value,
            localCondition.type,
        );
        setLocalCondition(newCondition);
        onUpdate(newCondition);
    };

    const handleValueChange = (value: string) => {
        const filterValue = FilterValue.parse(value, localCondition.type);
        const newCondition = new FilterCondition(
            localCondition.property,
            localCondition.operator,
            filterValue,
            localCondition.type,
        );
        setLocalCondition(newCondition);
        onUpdate(newCondition);
    };

    const getDefaultOperatorForType = (type: FilterType): FilterOperator => {
        const operators = getOperatorsForType(type);
        return operators[0];
    };

    const needsValue = ![FilterOperator.IS_EMPTY, FilterOperator.IS_NOT_EMPTY].includes(localCondition.operator);

    return (
        <div className="flex items-center gap-2 w-full">
            {/* 속성 선택 */}
            <select
                value={localCondition.property}
                onChange={(e) => handlePropertyChange(e.target.value)}
                className="border rounded text-14 py-1 px-2 min-w-[125px]"
            >
                <option value="">속성 선택</option>
                {properties.map((prop) => (
                    <option key={prop.name} value={prop.name}>
                        {icon_filterType(prop.type)}&nbsp;&nbsp;{prop.label}
                    </option>
                ))}
            </select>

            {/* 연산자 선택 */}
            {localCondition.property && (
                <select
                    value={localCondition.operator}
                    onChange={(e) => handleOperatorChange(e.target.value as FilterOperator)}
                    className="border rounded text-14 py-1 px-2 min-w-[125px]"
                >
                    {getOperatorsForType(localCondition.type).map((op) => (
                        <option key={op} value={op}>
                            {t_filterOperator(op)}
                        </option>
                    ))}
                </select>
            )}

            {/* 값 입력 */}
            {needsValue && localCondition.property && localCondition.type === FilterType.TEXT ? (
                <FilterTextInput defaultValue={localCondition.value?.toString()} onChange={handleValueChange} />
            ) : localCondition.type === FilterType.NUMBER ? (
                <FilterNumberInput defaultValue={localCondition.value?.toString()} onChange={handleValueChange} />
            ) : localCondition.type === FilterType.DATE ? (
                <FilterDateInput defaultValue={localCondition.value?.toString()} onChange={handleValueChange} />
            ) : localCondition.type === FilterType.BOOLEAN ? (
                <FilterBooleanInput defaultValue={localCondition.value?.toString()} onChange={handleValueChange} />
            ) : localCondition.type === FilterType.SELECT ? (
                <FilterSelectInput
                    defaultValue={localCondition.value?.toString()}
                    onChange={handleValueChange}
                    options={[]}
                />
            ) : localCondition.type === FilterType.MULTI_SELECT ? (
                <FilterMultiSelectInput defaultValue={localCondition.value?.toString()} onChange={handleValueChange} />
            ) : (
                <></>
            )}

            <button
                type="button"
                onClick={onDelete}
                className="w-[32px] h-[32px] pb-[2px] text-[20px] flex items-center justify-center text-red-400 hover:text-red-700 transition-all"
            >
                &times;
            </button>
        </div>
    );
};
