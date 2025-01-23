import React, {memo} from 'react';

interface CustomBarProps {
    x: number;
    y: number;
    width: number;
    height: number;
    index: number;
    hoveredIndex: number | null;
    payload: any;
}

export const CustomBar = memo((props: CustomBarProps) => {
    const {x, y, width, height, index, hoveredIndex, payload} = props;

    const totalValue = payload.getPaidAmount;
    const paidAmountHeight = (payload.getPaidAmount / totalValue) * height;
    const expectedAmountHeight = (payload.getExpectedAmount / totalValue) * height;

    const paidAmountY = y + (height - paidAmountHeight);
    const expectedAmountY = paidAmountY - expectedAmountHeight;

    const isBarHovered = hoveredIndex === null || hoveredIndex === index;
    const paidAmountFill = isBarHovered ? '#5C5FEE' : '#EFEFFD';
    const expectedAmountFill = isBarHovered ? '#FBCFE8' : '#FEF1F8';

    return (
        <g>
            <rect x={x} y={paidAmountY} width={width} height={paidAmountHeight} fill={paidAmountFill} rx={2} />
            <rect x={x} y={expectedAmountY} width={width} height={expectedAmountY} fill={expectedAmountFill} rx={2} />
        </g>
    );
});
