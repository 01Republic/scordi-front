import React from 'react';
import {ContentPanel} from '^layouts/ContentLayout/ContentPanel';
import {ConnectMethodOption} from './ConnectMethodOption';

export enum ConnectMethod {
    auto = 'auto',
    manual = 'manual',
}

interface SelectConnectMethodProps {
    setConnectMethod: React.Dispatch<React.SetStateAction<ConnectMethod | undefined>>;
}

export const SelectConnectMethod = (props: SelectConnectMethodProps) => {
    const {setConnectMethod} = props;

    return (
        <ContentPanel title="연결 방법을 선택해주세요 ..." bodyWrap={false}>
            <div className="bs-container">
                <div className="bs-row">
                    <ConnectMethodOption
                        title="자동 연결"
                        desc={`
            관리자 계정을 통해 서비스를 연결합니다.
            결제해야 할 날짜와 금액이 자동으로 업데이트됩니다.
            향후 추가될 서비스 기능을 이용 할 수 있습니다.
            `}
                        btn={{
                            className: 'btn-secondary',
                            onClick: () => setConnectMethod(ConnectMethod.auto),
                        }}
                    />
                    <ConnectMethodOption
                        title="수동 연결"
                        desc={`
            인보이스 업로드를 통해 서비스를 확인합니다.
            서비스로부터 이메일 등으로 고지받은 인보이스를 직접 업로드 합니다.
            향후 추가될 서비스 기능을 이용하는데 구현상의 제약이 있을 수 있습니다. 
            `}
                        btn={{
                            onClick: () => setConnectMethod(ConnectMethod.manual),
                        }}
                    />
                </div>
            </div>
        </ContentPanel>
    );
};
