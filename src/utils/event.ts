import {SyntheticEvent} from 'react';

export function eventCut<T>(e: SyntheticEvent<T>) {
    e.stopPropagation();
    e.preventDefault();
}
