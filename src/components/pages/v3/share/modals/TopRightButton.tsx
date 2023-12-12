import {memo} from 'react';
import {LinkTo, LinkToProps} from '^components/util/LinkTo';

export const TopRightButton = memo((props: LinkToProps) => {
    const {text, className = '', ...linkToProps} = props;

    return <LinkTo {...linkToProps} className={`btn btn-ghost btn-sm ${className}`} text={text || '수정'} />;
});
TopRightButton.displayName = 'TopRightButton';
