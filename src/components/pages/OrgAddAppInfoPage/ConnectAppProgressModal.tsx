import React, {useMemo, useState} from 'react';
import {stageMarkUps} from '^components/ApplicationConnectStage';
import {AppCode, ApplicationConnectApi} from '^api/applicationConnect.api';
import {Modal} from '^components/Modal';
import {OrganizationDto} from '^types/organization.type';
import {ProductDto} from '^types/product.type';

interface ConnectAppProgressModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    organizationId: number;
    organization: OrganizationDto;
    productId: number;
    protoApp: ProductDto;
}

export function ConnectAppProgressModal(props: ConnectAppProgressModalProps) {
    const {isOpen, setIsOpen, organization, protoApp} = props;
    const [stage, setStage] = useState(0);
    const [accData, setAccData] = useState<any>({});
    const stageMarkUp = useMemo(() => stageMarkUps[stage], [stage]);
    const StageForm = useMemo(() => stageMarkUp.StageForm, [stage]);
    // const { StageForm } = stageMarkUp;

    const api = useMemo(() => new ApplicationConnectApi(protoApp.name as AppCode), [protoApp.name]);

    return (
        <Modal type="info" isOpen={isOpen}>
            {isOpen && StageForm && (
                <StageForm
                    api={api}
                    title={stageMarkUp.title(protoApp.name)}
                    description={stageMarkUp.description}
                    next={(data) => {
                        setStage(stage + 1);
                        setAccData(data || {});
                    }}
                    prev={() => setStage(stage - 1)}
                    data={accData}
                />
            )}
        </Modal>
    );
}
