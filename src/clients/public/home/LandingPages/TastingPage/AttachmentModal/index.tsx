import React, {memo} from 'react';
import {atom, useRecoilState} from 'recoil';

type AttachmentFile = {
    fileName: string;
    url?: string;
};

export const attachmentModalState = atom<AttachmentFile | null>({
    key: 'attachmentModalState',
    default: null,
});

export const AttachmentModal = memo(() => {
    const [attachment, setAttachment] = useRecoilState(attachmentModalState);
    const isShow = !!attachment;

    const close = () => setAttachment(null);
    const prevent = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const url = !attachment
        ? ''
        : (() => {
              if (attachment.url?.toLowerCase().endsWith('pdf')) {
                  return [attachment.url, 'toolbar=0&navpanes=0&scrollbar=0&view=FitH'].join('#');
              } else {
                  return attachment.url;
              }
          })();

    return (
        <div className={`modal cursor-pointer ${isShow ? 'modal-open' : ''}`} onClick={close}>
            <div className={`modal-box cursor-default h-full`} onClick={prevent}>
                {attachment && (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">{attachment.fileName}</h3>
                            {/*<button onClick={close} className="btn btn-link p-0 text-gray-500 hover:text-gray-900">*/}
                            {/*    <IoClose size={26} />*/}
                            {/*</button>*/}
                        </div>
                        <iframe
                            src={`${url}`}
                            frameBorder="0"
                            className="w-full h-full"
                            style={{
                                maxHeight: 'calc(100% - (28px + 24px * 2))',
                            }}
                        />
                        <div className="modal-action sticky bottom-0 justify-center bg-white py-4">
                            {/*<button className="btn btn-block btn-scordi normal-case">Save</button>*/}
                            {attachment.url ? (
                                <div className="grid grid-cols-2 gap-2 w-full">
                                    <button className="btn btn-block normal-case" onClick={close}>
                                        현재 창 닫기
                                    </button>
                                    <button
                                        className="btn btn-block normal-case"
                                        onClick={() => window.open(attachment.url, '_blank')}
                                    >
                                        새 창에서 열기
                                    </button>
                                </div>
                            ) : (
                                <button className="btn btn-block normal-case" onClick={close}>
                                    현재 창 닫기
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});
