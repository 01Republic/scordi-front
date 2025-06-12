import React, {memo} from 'react';
import {ChevronRight} from 'lucide-react';
import {useFormContext} from 'react-hook-form';
import {LinkTo} from '^components/util/LinkTo';
import {termsUrl} from '^config/environments';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {FieldPath} from 'react-hook-form/dist/types/path';
import {WithChildren} from '^types/global.type';

interface AgreeItemProps extends WithChildren {
    name?: FieldPath<CreateAccountRequestDto>;
    label?: string;
    required?: boolean;
    href?: string;
}

export const AgreeItem = memo((props: AgreeItemProps) => {
    const {register} = useFormContext<CreateAccountRequestDto>();
    const {name, label = '', required = false, href, children} = props;

    return (
        <label className="flex items-center gap-2 cursor-pointer">
            {name && (
                <input
                    type="checkbox"
                    {...register(name, {required})}
                    className="checkbox checkbox-primary w-5 h-5 rounded"
                />
            )}
            {children}

            {label && (
                <span>
                    {label} {required ? '(필수)' : ''}
                </span>
            )}

            {href && (
                <LinkTo
                    href={href}
                    target="_blank"
                    className="ml-auto text-gray-400 hover:text-black transition-all"
                    displayLoading={false}
                >
                    <ChevronRight />
                </LinkTo>
            )}
        </label>
    );
});
AgreeItem.displayName = 'AgreeItem';
