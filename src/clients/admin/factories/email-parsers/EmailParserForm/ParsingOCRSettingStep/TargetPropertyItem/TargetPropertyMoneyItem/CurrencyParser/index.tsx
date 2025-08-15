import {memo, useEffect, useMemo} from 'react';
import {CurrencyCode} from '^models/Money';
import {useForm} from 'react-hook-form';
import {useId} from 'react-id-generator';
import {Plus, X} from 'lucide-react';
import {isDefinedValue} from '^utils/array';
import {CurrencyParserData} from '^models/EmailParser/types';

interface CurrencyParserProps {
    regexResult?: string;
    defaultValue?: CurrencyParserData;
    onChange?: (currencyParserData: CurrencyParserData) => any;
}

export const CurrencyParser = (props: CurrencyParserProps) => {
    const {regexResult = '', defaultValue, onChange} = props;
    const [id] = useId();
    const form = useForm<CurrencyParserData>();

    useEffect(() => {
        // console.log('CurrencyParser.useEffect');
        // console.log('CurrencyParser.useEffect', 'defaultValue', defaultValue);
        if (typeof defaultValue?.isDynamicCurrency !== 'undefined') {
            // console.log('CurrencyParser.useEffect', 'isDynamicCurrency', defaultValue.isDynamicCurrency);
            form.setValue('isDynamicCurrency', defaultValue.isDynamicCurrency);
            defaultValue.isDynamicCurrency
                ? form.setValue('currencyCodeMappers', defaultValue.currencyCodeMappers)
                : form.setValue('staticCurrencyCode', defaultValue.staticCurrencyCode);
        } else {
            form.setValue('isDynamicCurrency', false);
            form.setValue('staticCurrencyCode', CurrencyCode.KRW);
        }
    }, [defaultValue]);

    form.register('isDynamicCurrency');
    form.register('currencyCodeMappers');
    const values = form.watch();
    const {isDynamicCurrency} = values;
    const currencyCodeMappers = form.watch('currencyCodeMappers') || [];

    // 동적 설정에서 화폐맵핑 결과
    const resultCurrencyCode = useMemo(() => {
        const matchedMapper = currencyCodeMappers.find((mapper) => mapper.pattern && regexResult.match(mapper.pattern));
        return matchedMapper?.currencyCode;
    }, [regexResult, currencyCodeMappers]);

    useEffect(() => {
        if (values && typeof values.isDynamicCurrency !== 'undefined' && onChange) {
            // console.log('CurrencyParser.onChange', 'defaultValue', defaultValue);
            // console.log('CurrencyParser.onChange', 'values', values);
            if (JSON.stringify(defaultValue) !== JSON.stringify(values)) {
                onChange(values);
            }
        }
    }, [defaultValue, values]);

    return (
        <div className="text-14">
            <div className="mb-2 pt-4">
                <div className="flex items-center gap-2">
                    <div className="text-12 font-semibold">화폐 종류는?</div>
                </div>

                <div className="grid grid-cols-3 pt-2">
                    <div className="space-y-2 pt-2">
                        <div className="form-control">
                            <label className="label p-0 justify-start gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`radio-${id}`}
                                    className="radio radio-xs checked:bg-blue-500"
                                    defaultChecked={!isDynamicCurrency}
                                    onChange={() => form.setValue('isDynamicCurrency', false)}
                                />
                                <span
                                    className={`label-text text-12 ${
                                        !isDynamicCurrency ? 'text-indigo-500' : 'text-black'
                                    }`}
                                >
                                    고정 화폐에요
                                </span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label p-0 justify-start gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`radio-${id}`}
                                    className="radio radio-xs checked:bg-blue-500"
                                    defaultChecked={isDynamicCurrency}
                                    onChange={() => form.setValue('isDynamicCurrency', true)}
                                />
                                <span
                                    className={`label-text text-12 ${
                                        isDynamicCurrency ? 'text-indigo-500' : 'text-black'
                                    }`}
                                >
                                    회사마다 달라요
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="col-span-2">
                        {!isDynamicCurrency ? (
                            <div className="flex items-center gap-2 text-12">
                                <div>지정값</div>
                                <select
                                    className="select select-bordered select-xs"
                                    {...form.register('staticCurrencyCode')}
                                >
                                    {Object.values(CurrencyCode).map((code) => (
                                        <option key={code} value={code}>
                                            {code}
                                        </option>
                                    ))}
                                </select>
                                <div>으로 고정</div>
                            </div>
                        ) : (
                            <div className="text-12">
                                <div className="flex items-center gap-2 font-semibold text-indigo-500 mb-2">
                                    <div>결과:</div>
                                    <div>{resultCurrencyCode}</div>
                                </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <pre className="py-1 px-1.5 bg-gray-100 border rounded-sm border-gray-200 whitespace-pre-wrap">
                                        {regexResult}
                                    </pre>
                                    <div>중에서</div>
                                </div>

                                <div className="space-y-2">
                                    {currencyCodeMappers.map((mapper, i) => (
                                        <div key={i} className="grid grid-cols-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    className="input input-bordered input-xs"
                                                    defaultValue={mapper.pattern}
                                                    onBlur={(e) => {
                                                        const pattern = e.target.value.trim();
                                                        const mappers = [...currencyCodeMappers];
                                                        mappers[i] = {pattern, currencyCode: mapper.currencyCode};
                                                        form.setValue('currencyCodeMappers', mappers);
                                                    }}
                                                />
                                                <span>가 있으면,</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <select
                                                    className="select select-bordered select-xs"
                                                    defaultValue={mapper.currencyCode}
                                                    onChange={(e) => {
                                                        const currencyCode = e.target.value as CurrencyCode;
                                                        const mappers = [...currencyCodeMappers];
                                                        mappers[i] = {pattern: mapper.pattern, currencyCode};
                                                        form.setValue('currencyCodeMappers', mappers);
                                                    }}
                                                >
                                                    {Object.values(CurrencyCode).map((code) => (
                                                        <option key={code} value={code}>
                                                            {code}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span>로 인식</span>

                                                <div>
                                                    <X
                                                        size={12}
                                                        className="text-red-400 hover:text-red-600 transition-all cursor-pointer"
                                                        onClick={() => {
                                                            const newMappers = currencyCodeMappers
                                                                .map((mapper, j) => (i !== j ? mapper : null))
                                                                .filter(isDefinedValue);
                                                            form.setValue('currencyCodeMappers', newMappers);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-xs btn-white gap-1"
                                            onClick={() => {
                                                const mappers = [...currencyCodeMappers];
                                                mappers.push({pattern: '', currencyCode: CurrencyCode.USD});
                                                form.setValue('currencyCodeMappers', mappers);
                                            }}
                                        >
                                            <Plus />
                                            <span>식별자 추가</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
