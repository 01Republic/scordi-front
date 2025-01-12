import {useFormContext} from 'react-hook-form';
import {useCallback, useEffect} from 'react';
import {Accept, useDropzone} from 'react-dropzone';

interface DropZoneFileInputProps {
    name: string;
    label?: string;
    accept?: Accept;
}

export const DropZoneFileInput = (props: DropZoneFileInputProps) => {
    const {name, label = name, accept} = props;
    const {register, unregister, setValue, watch} = useFormContext();
    const files = watch(name) as File[] | undefined;

    const onDrop = useCallback(
        (droppedFiles: File[]) => {
            setValue(name, droppedFiles, {shouldValidate: true});
        },
        [setValue, name],
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1,
        onDrop,
        accept,
    });

    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);

    return (
        <div {...getRootProps()}>
            <input
                id={name}
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                {...getInputProps()}
            />

            <div
                className={`w-full border border-dashed border-gray-900 p-2 ${
                    isDragActive ? 'bg-gray-400' : 'bg-gray-200'
                }`}
            >
                {isDragActive ? (
                    <div className="text-14 my-2 text-center">Drop the files here ...</div>
                ) : (
                    <div className="text-14 my-2 text-center">
                        Drag 'n' drop some files here, or click to select files
                    </div>
                )}

                {!!files?.length && (
                    <div className="mt-2 grid grid-cols-1 gap-1">
                        {files.map((file) => (
                            <div key={file.name}>
                                <p>{file.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
