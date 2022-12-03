import {FC} from 'react';
import {ChildrenProp} from '../../util/children-prop.type';
import {CampaignKeys} from './campaignKeys.constant';

interface TypeFormBtnProps extends ChildrenProp {
    campaignKey: CampaignKeys;
    id?: string;
    text?: string;
}

export const TypeFormBtn: FC<TypeFormBtnProps> = ({campaignKey, id, text, children}) => (
    <button
        id={id || ''}
        // data-tf-slider="qqGnBdkS"
        data-tf-slider={campaignKey}
        data-tf-width="550"
        data-tf-iframe-props="title=페이플로우1"
        data-tf-medium="snippet"
        className="btn btn-primary btn-lg"
    >
        {children || text}
    </button>
);
