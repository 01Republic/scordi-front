import '@toast-ui/editor/dist/i18n/ko-kr';
import React, {forwardRef, memo, MutableRefObject, useCallback, useEffect, useRef} from 'react';
import dynamic from 'next/dynamic';
import {Editor as EditorType, EditorProps} from '@toast-ui/react-editor';

interface TuiEditorWithForwardedProps extends EditorProps {
    forwardedRef?: MutableRefObject<EditorType>;
}

interface EditorPropsWithHandlers extends EditorProps {
    onChange?(value: string): void;
}

const Editor = dynamic<TuiEditorWithForwardedProps>(
    () =>
        import('@toast-ui/react-editor').then(({Editor}) => {
            return (props: TuiEditorWithForwardedProps) => <Editor {...props} ref={props.forwardedRef} />;
        }),
    {ssr: false},
);

const EditorWithForwardedRef = forwardRef<EditorType | undefined, EditorPropsWithHandlers>((props, ref) => (
    <Editor {...props} forwardedRef={ref as React.MutableRefObject<EditorType>} />
));

export interface WysiwygEditorProps extends EditorProps {
    onChange(value: string): void;
    valueType?: 'markdown' | 'html';
    width?: string;
}

export const WysiwygEditor = (props: WysiwygEditorProps) => {
    const {
        width,
        height,
        onChange,
        initialValue,
        valueType,
        previewStyle,
        initialEditType,
        useCommandShortcut,
        ...left
    } = props;
    const editorRef = useRef<EditorType>();

    const handleChange = useCallback(() => {
        if (!editorRef.current) return;

        const instance = editorRef.current.getInstance();
        const valueType = props.valueType || 'markdown';

        props.onChange(valueType === 'markdown' ? instance.getMarkdown() : instance.getHTML());
    }, [props, editorRef]);

    useEffect(() => {
        if (!editorRef.current) return;
        if (!initialValue) return;

        const instance = editorRef.current.getInstance();
        const valueType = props.valueType || 'markdown';

        if (valueType === 'markdown') {
            instance.setMarkdown(initialValue, true);
        } else if (valueType === 'html') {
            instance.setHTML(initialValue, true);
        }
    }, [initialValue]);

    return (
        <div style={{width}}>
            <EditorWithForwardedRef
                {...left}
                initialValue={initialValue || 'hello react editor world!'}
                previewStyle={previewStyle || 'vertical'}
                height={height || '600px'}
                initialEditType={initialEditType || 'markdown'}
                useCommandShortcut={useCommandShortcut || true}
                ref={editorRef}
                onChange={handleChange}
                language="ko-KR"
                autofocus={false}
            />
        </div>
    );
};
