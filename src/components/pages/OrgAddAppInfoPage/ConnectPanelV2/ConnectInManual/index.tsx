import React from 'react';
import { ApplicationPrototypeDto } from '^types/applicationPrototype.type';
import { ConnectMethod } from '../SelectConnectMethod';
import { ContentForm } from '^layouts/ContentLayout/ContentForm';
import { useForm } from 'react-hook-form';
import { ContentPanel, ContentPanelItem, ContentPanelList } from '^layouts/ContentLayout/ContentPanel';
import { InvoiceDropZone } from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2/ConnectInManual/InvoiceDropZone';

interface ConnectInManualProps {
  protoApp: ApplicationPrototypeDto;
  setConnectMethod: React.Dispatch<React.SetStateAction<ConnectMethod | undefined>>;
}

export const ConnectInManual = (props: ConnectInManualProps) => {
  const { protoApp, setConnectMethod } = props;
  const form = useForm();

  const onSubmitHandler = () => {

  };

  return (
    <ContentForm onSubmit={form.handleSubmit(onSubmitHandler)}>
      <ContentPanel title="인보이스(결제청구서)를 업로드해주세요." desc={`<b>${protoApp.name}</b> 에서 이메일로 전달받은 결제 청구서를 업로드해주세요.`}>
        <ContentPanelList>
          <InvoiceDropZone />
        </ContentPanelList>
      </ContentPanel>
    </ContentForm>
  )
}
