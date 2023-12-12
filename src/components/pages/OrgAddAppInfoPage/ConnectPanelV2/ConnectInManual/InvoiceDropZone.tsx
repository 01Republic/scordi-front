import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {ContentPanelItem} from '^layouts/ContentLayout/ContentPanel';
import {AiOutlineCloudUpload} from '@react-icons/all-files/ai/AiOutlineCloudUpload';
import {ApplicationConnectApi} from '^api/applicationConnect.api';
import {errorNotify} from '^utils/toast-notify';
import {InvoiceDataDto} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import {BillingCycleTerm} from '^models/Subscription/types/billingCycleType';
import {IoTrash} from '@react-icons/all-files/io5/IoTrash';
import {IoClose} from '@react-icons/all-files/io5/IoClose';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer',
};

const focusedStyle = {
    borderColor: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744',
};

interface InvoiceDropZoneProps {
    api: ApplicationConnectApi;
    results: InvoiceDataDto[];
    setResults: Dispatch<SetStateAction<InvoiceDataDto[]>>;
    isSaving: boolean;
}

export function InvoiceDropZone<T>(props: InvoiceDropZoneProps) {
    const {api, results, setResults, isSaving} = props;
    const [isLoading, setIsLoading] = useState(false);
    const {getRootProps, isFocused, isDragAccept, isDragReject, acceptedFiles} = useDropzone({
        multiple: true,
        disabled: isLoading || isSaving,
        onDrop: (files) => {
            setIsLoading(true);

            api.postInvoiceFiles(files)
                .then((res) => {
                    setIsLoading(false);
                    appendInvoices(res.data);
                })
                .catch(errorNotify);
        },
    });

    const getTime = (timeStr: string) => new Date(timeStr).getTime();

    function appendInvoices(targets: InvoiceDataDto[]) {
        const dataList = [...results, ...targets];
        setResults(dataList.sort((a, b) => getTime(a.issuedAt) - getTime(b.issuedAt)));
    }

    function removeInvoice(idx: number) {
        const dataList = results.filter((_, i) => i !== idx);
        setResults(dataList);
    }

    const style: any = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject],
    );

    return (
        <>
            <ContentPanelItem>
                <div {...getRootProps({className: 'dropzone', style})}>
                    {isLoading ? (
                        <>
                            <p>
                                <AiOutlineCloudUpload size={30} />
                            </p>
                            <em>업로드 중 ...</em>
                        </>
                    ) : (
                        <>
                            <p>
                                <AiOutlineCloudUpload size={30} />
                            </p>
                            <p>파일을 끌어다 여기에 놓으세요.</p>
                        </>
                    )}
                </div>
            </ContentPanelItem>

            {isLoading
                ? acceptedFiles.map((file, i) => (
                      <ContentPanelItem key={i}>
                          {isLoading ? (
                              <p className="text-sm text-gray-500 italic">(분석중...) {file.name}</p>
                          ) : (
                              <p className="text-sm">{file.name}</p>
                          )}
                      </ContentPanelItem>
                  ))
                : results.map((result, i) => {
                      const issuedDate = new Date(result.issuedAt);
                      const term = (() => {
                          switch (result.cycleTerm) {
                              case BillingCycleTerm.monthly:
                                  return '/month';
                              case BillingCycleTerm.yearly:
                                  return '/year';
                              default:
                                  return '';
                          }
                      })();

                      return (
                          <ContentPanelItem key={i}>
                              <div className="bs-container">
                                  <div className={`bs-row text-sm items-center ${isSaving ? 'opacity-50' : ''}`}>
                                      <div className="bs-col">
                                          <b>{result.displayName}</b>
                                      </div>
                                      <div className="bs-col">
                                          <span>{issuedDate.toLocaleDateString()}</span>
                                      </div>
                                      <div className="bs-col">
                                          <span>{result.planName} plan</span>
                                      </div>
                                      <div className="bs-col">
                                          <span>
                                              {result.unitPrice} {term}
                                          </span>
                                          <span>{result.isPerUser && ' (per user)'}</span>
                                      </div>
                                      <div className="bs-col">
                                          <b className="italic">Total: {result.currentCycleBillAmount}</b>
                                      </div>
                                      <div className="bs-col-1 text-right">
                                          <button
                                              type="button"
                                              disabled={isSaving}
                                              className="btn btn-sm btn-square btn-error text-white"
                                              onClick={() => {
                                                  removeInvoice(i);
                                              }}
                                          >
                                              <IoClose size={20} />
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </ContentPanelItem>
                      );
                  })}
        </>
    );
}
