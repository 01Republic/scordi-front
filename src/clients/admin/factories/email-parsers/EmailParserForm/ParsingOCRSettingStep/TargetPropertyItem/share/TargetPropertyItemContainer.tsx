import React, {memo, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {TargetPropertyItemProps} from '../hooks';
import {Checkbox} from '^public/components/ui/checkbox';

interface ChildrenProps {
    isExists: boolean;
    isFinished: boolean;
}

interface Props extends TargetPropertyItemProps, WithChildren<(props: ChildrenProps) => JSX.Element> {
    isFinished?: boolean;
}

export const TargetPropertyItemContainer = memo((props: Props) => {
    const {title, optional = false, children, onChange} = props;
    const [isFinished, setIsFinished] = useState(props.isFinished ?? false);
    const [isExists, setIsExists] = useState(props.isFinished ?? false);

    return (
        <div className="py-2 space-y-2 border-b border-gray-200">
            <div className="text-14 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="text-16 font-semibold">
                        <span
                            className={`cursor-default transition-all ${
                                isFinished
                                    ? 'text-scordi'
                                    : isExists
                                    ? 'text-yellow-600'
                                    : 'text-gray-500 opacity-50 hover:opacity-100'
                            }`}
                        >
                            {title}
                        </span>{' '}
                        {optional && <small className="text-gray-500">(선택)</small>}
                    </div>
                </div>

                <div className="flex items-center">
                    {isExists && (
                        <div className="mr-4">
                            <label
                                className={`flex items-center gap-2 text-12 border rounded-md py-1 px-1.5 cursor-pointer btn-animation ${
                                    // text
                                    isFinished ? 'text-scordi' : 'text-gray-700 hover:text-scordi'
                                } ${
                                    // border
                                    isFinished ? 'border-scordi' : 'border-gray-300 hover:border-scordi-200'
                                } ${
                                    // bg
                                    isFinished ? 'bg-scordi-light-100' : 'bg-gray-50 hover:bg-scordi-50'
                                }`}
                            >
                                <Checkbox
                                    checked={isFinished}
                                    onCheckedChange={(value) => setIsFinished(Boolean(value))}
                                />
                                <span className="font-medium">{isFinished ? '완료됨' : '완료하기'}</span>
                            </label>
                        </div>
                    )}

                    <div className="form-control">
                        <label className="cursor-pointer label flex items-center gap-2 p-0">
                            <span className="label-text">없어요</span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary toggle-sm"
                                defaultChecked={isExists}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setIsExists(checked);
                                    if (!checked) {
                                        setIsFinished(false);
                                    }
                                }}
                            />
                            <span className="label-text">있어요</span>
                        </label>
                    </div>
                </div>
            </div>

            {typeof children === 'function' ? children({isExists, isFinished}) : isExists && !isFinished && children}
        </div>
    );
});
