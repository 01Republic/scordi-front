import React, { useMemo, useState } from 'react';
import { ApplicationPrototypeDto } from '^types/applicationPrototype.type';
import { ConnectMethod } from '../SelectConnectMethod';
import { ContentPanel, ContentPanelItem, ContentPanelList } from '^layouts/ContentLayout/ContentPanel';
import { InvoiceDropZone } from '^components/pages/OrgAddAppInfoPage/ConnectPanelV2/ConnectInManual/InvoiceDropZone';
import { AppCode, ApplicationConnectApi } from '^api/applicationConnect.api';
import { InvoiceDataDto } from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import { IoChevronBackOutline } from '@react-icons/all-files/io5/IoChevronBackOutline';
import { IoFlash } from '@react-icons/all-files/io5/IoFlash';

interface ConnectInManualProps {
  protoApp: ApplicationPrototypeDto;
  setConnectMethod: React.Dispatch<React.SetStateAction<ConnectMethod | undefined>>;
}

export const ConnectInManual = (props: ConnectInManualProps) => {
  const { protoApp, setConnectMethod } = props;
  const [parsedInvoiceDataList, setParsedInvoiceDataList] = useState<InvoiceDataDto[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const api = useMemo(() => new ApplicationConnectApi(protoApp.name as AppCode), [protoApp.name]);
  const connectable = parsedInvoiceDataList.length > 0;

  const onSubmit = () => {
    setIsSaving(true);
    console.log(parsedInvoiceDataList);
    setTimeout(() => {
      setIsSaving(false);
    }, 2000);
  }

  return (
    <ContentPanel title="인보이스(결제청구서)를 업로드해주세요." desc={`<b>${protoApp.name}</b> 에서 이메일로 전달받은 결제 청구서를 업로드해주세요.`}>
      <ContentPanelList>
        <InvoiceDropZone
          api={api}
          results={parsedInvoiceDataList}
          setResults={setParsedInvoiceDataList}
          isSaving={isSaving}
        />

        {/* Buttons */}
        <ContentPanelItem>
          <div className="flex w-full justify-between">
            <button
              type="button"
              className="btn btn-ghost border-[#dbd6e1] gap-2"
              onClick={() => setConnectMethod(undefined)}
            >
              <IoChevronBackOutline /> 처음으로
            </button>

            <button
              className="btn btn-secondary text-lg gap-2"
              disabled={!connectable}
              onClick={onSubmit}
            >
              <IoFlash /> Add App
            </button>
          </div>
        </ContentPanelItem>
      </ContentPanelList>
    </ContentPanel>
  )
}
