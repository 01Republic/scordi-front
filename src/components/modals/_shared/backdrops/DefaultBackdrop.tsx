import React, {forwardRef} from 'react';

interface Props {
    opacity?: number;
}

export const DefaultBackdrop = forwardRef<any, Props>((props, ref) => {
    const {opacity = 0} = props;
    console.log('props', props);
    return <div ref={ref} className="fixed inset-0 bg-black/30 transition-opacity" />;
});
