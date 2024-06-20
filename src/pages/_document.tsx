/* eslint-disable */
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {BodyTagGTM} from '^components/ExternalCDNScripts/google-tag-manager/BodyTagGTM';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <BodyTagGTM />

                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
