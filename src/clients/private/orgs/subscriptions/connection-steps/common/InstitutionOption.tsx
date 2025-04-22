import {memo} from 'react';
import {Check, Link, Unlink} from 'lucide-react';
import cn from 'classnames';
import {NextImage} from '^components/NextImage';

interface InstitutionOptionProps {
    logo: string;
    title: string;
    isSelected: boolean;
    isAllSelected?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
}

export const InstitutionOption = memo((props: InstitutionOptionProps) => {
    const {logo, title, isSelected, isDisabled, isAllSelected, onClick} = props;

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'card card-body p-5 bg-base-100 transition box-border no-selectable shadow-xl hover:shadow-2xl',
                {
                    'border border-scordi bg-scordi-50': isSelected,
                    'border border-white bg-white': !isSelected,
                    '!border !border-grayColor-500 !bg-grayColor-300': isAllSelected && isDisabled,
                },
            )}
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <NextImage src={logo} alt={title} width={40} height={40} />
                    {isSelected && <Check className="w-5 h-5 text-scordi" />}
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-neutral-900 text-16 font-semibold whitespace-nowrap">{title}</span>
                    {isDisabled && (
                        <span className="text-12 font-normal text-neutralColor-700">홈페이지 로그인 필요</span>
                    )}

                    {/* 데이터 연결 후 사용할 태그들 */}
                    {/*<div className="flex gap-1 bg-greenColor-200 py-0.5 px-1.5 rounded-sm text-12 font-normal text-neutral-800 whitespace-nowrap items-center justify-center">*/}
                    {/*    <Link className="size-3" />*/}
                    {/*    <span>연결됨</span>*/}
                    {/*</div>*/}
                    {/*<div className="flex gap-1 bg-redColor-200 py-0.5 px-1.5 rounded-sm text-12 font-normal text-neutral-800 whitespace-nowrap items-center justify-center">*/}
                    {/*    <Unlink className="size-3" />*/}
                    {/*    <span>연결 해제</span>*/}
                    {/*</div>*/}
                </div>
            </div>
        </button>
    );
});
