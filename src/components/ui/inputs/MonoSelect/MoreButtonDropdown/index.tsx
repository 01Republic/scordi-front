import React, {memo, useRef, useState} from 'react';
import Tippy from '@tippyjs/react/headless';
import {Placement} from 'tippy.js';
import {IoMdMore} from '^components/react-icons';
import {WithChildren} from '^types/global.type';

interface MoreButtonProps extends WithChildren {
    placement?: Placement;
}

export const MoreButtonDropdown = (props: MoreButtonProps) => {
    const {placement, children} = props;
    const ref = useRef<any>();

    return (
        <>
            <button
                ref={ref}
                type="button"
                className="btn btn-xs btn-square normal-case !bg-white !border-gray-300 !text-gray-500 !rounded-md shadow hover:shadow-lg"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }}
            >
                <IoMdMore size={16} />
            </button>

            <Tippy
                reference={ref}
                placement={placement || 'right-start'}
                appendTo={() => document.body}
                interactive={true}
                render={(attrs, content, instance) => (
                    <div
                        {...attrs}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            return;
                        }}
                    >
                        {children}
                    </div>
                )}
            />
        </>
    );
};
MoreButtonDropdown.displayName = 'MoreButton';