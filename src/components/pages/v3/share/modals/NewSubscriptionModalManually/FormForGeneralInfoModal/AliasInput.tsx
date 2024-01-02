import React, {memo} from 'react';
import {FormControl} from '^components/util/form-control';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

interface Props {
    aliasRef: React.RefObject<HTMLInputElement>;
}

export const AliasInput = memo(function AliasInput(props: Props) {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);
    const {aliasRef} = props;

    const onChange = (alias: string) => {
        setFormData((f) => ({
            ...f,
            alias,
        }));
    };

    return (
        <FormControl topLeftLabel="별칭">
            <input
                ref={aliasRef}
                type="text"
                required
                defaultValue={formData.alias}
                onChange={(e) => onChange(e.target.value)}
                className="input input-bordered"
                placeholder="ex. 도메인 scordi.io"
            />
        </FormControl>
    );
});
