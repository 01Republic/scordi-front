/* eslint-disable */
import Document, {Html, Head, Main, NextScript} from 'next/document';
import ExternalCDNScripts from '../components/ExternalCDNScripts';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
