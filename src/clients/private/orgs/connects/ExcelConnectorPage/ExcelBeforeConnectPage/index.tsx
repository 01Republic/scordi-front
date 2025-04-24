import {memo, useState} from 'react';
import {GuideSection} from './GuideSection';
import {HeaderSection} from './HeaderSection';

interface ExcelBeforeConnectPageProps {
    onSubmit: (file: File) => void;
}

export const ExcelBeforeConnectPage = memo(function ExcelBeforeConnectPage({onSubmit}: ExcelBeforeConnectPageProps) {
    const [file, setFile] = useState<File>();
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <div className="py-16 px-12 min-h-lvh">
            <HeaderSection
                file={file}
                errorMsg={errorMsg}
                setFile={setFile}
                setErrorMsg={setErrorMsg}
                onSubmit={onSubmit}
            />

            <div className="grid sm:grid-cols-2">
                <div></div>
                <div>
                    <GuideSection />
                </div>
            </div>
        </div>
    );
});
