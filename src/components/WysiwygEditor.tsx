import dynamic from 'next/dynamic';
import {memo, useEffect, useState} from 'react';
import {FieldValue, FieldValues, UseFormReturn} from 'react-hook-form';
import {WysiwygEditorProps} from '^utils/WysiwygEditor';

export const WysiwygEditor = dynamic(() => import('../utils/WysiwygEditor').then((m) => m.WysiwygEditor), {ssr: false});
