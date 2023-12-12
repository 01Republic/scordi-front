import React, {memo, useState} from 'react';
import {WysiwygEditor} from '^components/WysiwygEditor';
import {UseFormReturn} from 'react-hook-form';
import {CreatePostByAdminDto} from '^models/Post/type';

interface BlogEditorProps {
    id: string;
    value: string;
    onChange: (value: string) => any;
}

export const BlogEditor = memo((props: BlogEditorProps) => {
    const {id, value, onChange} = props;

    return (
        <WysiwygEditor
            width="100%"
            height="400px"
            valueType="html"
            initialEditType="wysiwyg"
            initialValue={value}
            placeholder="앱을 아직 사용한 적 없는 분들을 대상으로 간단하게 소개하는 글을 입력해주세요."
            onChange={onChange}
        />
    );
});
