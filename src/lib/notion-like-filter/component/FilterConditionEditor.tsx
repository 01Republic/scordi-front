import React, {RefObject, useRef} from 'react';
import {
    FilterCondition,
    FilterOperator,
    FilterType,
    FilterValue,
    getDefaultOperatorForType,
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
    const propertyRef = useRef<HTMLSelectElement | null>(null);
    const operatorRef = useRef<HTMLSelectElement | null>(null);
    const valueRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
    const cond = condition;

    const getProperty = () => propertyRef.current?.value || properties[0]?.name || '';
    const getOperator = () => (operatorRef.current?.value as FilterOperator) || getDefaultOperatorForType(cond.type);
    const getValue = () => valueRef.current?.value || '';

    const handlePropertyChange = (property: string) => {
        const propDef = properties.find((p) => p.name === property);
        if (!propDef) return;

        const operator = getDefaultOperatorForType(propDef.type);
        const value = null;
        const newCondition = new FilterCondition(property, operator, value, propDef.type);
        onUpdate(newCondition);
    };

    const handleOperatorChange = (operator: FilterOperator) => {
        const property = getProperty();
        const value = FilterValue.parse(getValue(), cond.type);
        const newCondition = new FilterCondition(property, operator, value, cond.type);
        onUpdate(newCondition);
    };

    const handleValueChange = (val: string) => {
        const property = getProperty();
        const operator = getOperator();
        const value = FilterValue.parse(val, cond.type);

        const newCondition = new FilterCondition(property, operator, value, cond.type);
        onUpdate(newCondition);
    };

    const needsValue = ![FilterOperator.IS_EMPTY, FilterOperator.IS_NOT_EMPTY].includes(cond.operator);

    return (
        <div className="flex items-center gap-2 w-full">
            {/* 속성 선택 */}
            <select
                ref={propertyRef}
                value={cond.property}
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
            {cond.property && (
                <select
                    ref={operatorRef}
                    value={cond.operator}
                    onChange={(e) => handleOperatorChange(e.target.value as FilterOperator)}
                    className="border rounded text-14 py-1 px-2 min-w-[125px]"
                >
                    {getOperatorsForType(cond.type).map((op) => (
                        <option key={op} value={op}>
                            {t_filterOperator(op)}
                        </option>
                    ))}
                </select>
            )}

            {/* 값 입력 */}
            {needsValue && cond.property && cond.type === FilterType.TEXT ? (
                <FilterTextInput
                    ref={valueRef as RefObject<HTMLInputElement>}
                    defaultValue={cond.value?.toString()}
                    onChange={handleValueChange}
                />
            ) : cond.type === FilterType.NUMBER ? (
                <FilterNumberInput
                    ref={valueRef as RefObject<HTMLInputElement>}
                    defaultValue={cond.value?.toString()}
                    onChange={handleValueChange}
                />
            ) : cond.type === FilterType.DATE ? (
                <FilterDateInput
                    ref={valueRef as RefObject<HTMLInputElement>}
                    defaultValue={cond.value?.toString()}
                    onChange={handleValueChange}
                />
            ) : cond.type === FilterType.BOOLEAN ? (
                <FilterBooleanInput
                    ref={valueRef as RefObject<HTMLSelectElement>}
                    defaultValue={cond.value?.toString()}
                    onChange={handleValueChange}
                />
            ) : cond.type === FilterType.SELECT ? (
                <FilterSelectInput
                    ref={valueRef as RefObject<HTMLSelectElement>}
                    defaultValue={cond.value?.toString()}
                    onChange={handleValueChange}
                    options={[]}
                />
            ) : cond.type === FilterType.MULTI_SELECT ? (
                <FilterMultiSelectInput
                    ref={valueRef as RefObject<HTMLInputElement>}
                    defaultValue={cond.value?.toString()}
                    onChange={handleValueChange}
                />
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
