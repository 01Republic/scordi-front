import React from 'react';

export const keyForwarding = (from: string | string[], to: string | string[] | (() => any), eventType = 'keydown') => {
    const fromKeys = [from].flat();
    const callback = typeof to === 'function' ? to : undefined;
    const toKeys = typeof to !== 'function' ? [to].flat() : [];

    return (e: React.KeyboardEvent) => {
        if (fromKeys.includes(e.code)) {
            if (callback) {
                callback();
                e.stopPropagation();
                e.preventDefault();
            } else {
                toKeys.forEach((code) => {
                    e.target.dispatchEvent(new KeyboardEvent(eventType, {code}));
                });
            }
        }
    };
};

export const enterToSpace = (cb?: () => any) => {
    return cb ? keyForwarding(['Enter', 'Space'], cb) : keyForwarding('Enter', 'Space');
};
