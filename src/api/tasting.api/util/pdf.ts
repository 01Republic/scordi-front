import {PDFPageProxy} from 'pdfjs-dist';
import * as pdfJs from 'pdfjs-dist';

async function getPdfTextOnPage(page: PDFPageProxy) {
    const textContext = await page.getTextContent();
    const itemTexts = textContext.items.map((item) => {
        return (item as any).str || '';
    });
    return itemTexts.join(' ');
}

export async function getPdfText(base64String: string) {
    pdfJs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJs.version}/pdf.worker.min.js`;
    const decodedData = atob(base64String.replace(/-/g, '+').replace(/_/g, '/'));
    const pdfDoc = pdfJs.getDocument({data: decodedData});
    const pdf = await pdfDoc.promise;
    const totalPage = pdf.numPages;
    const pageTexts: string[] = [];
    for (let i = 0; i < totalPage; i++) {
        pageTexts.push(await pdf.getPage(i + 1).then(getPdfTextOnPage));
    }
    return pageTexts.join('\n\n');
}
