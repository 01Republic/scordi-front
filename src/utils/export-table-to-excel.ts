interface Option {
    filename?: string;
}

export const exportTableToExcel = (tableElementId: string, option: Option = {}) => {
    const {filename = 'table.xls'} = option;

    // Get the table HTML
    const table = document.getElementById(tableElementId);
    if (!table) return;

    const tableHTML = table.outerHTML.replace(/ /g, '%20');

    // Specify the data type
    const dataType = 'application/vnd.ms-excel';

    // Define the file name
    const fileName = filename.endsWith('.xls') ? filename : `${filename}.xls`;

    // Create a download link element
    const downloadLink = document.createElement('a');

    // Browser check to support Microsoft Excel file download
    // @ts-ignore
    if (navigator.msSaveOrOpenBlob) {
        const blob = new Blob(['\ufeff', tableHTML], {
            type: dataType,
        });
        // @ts-ignore
        navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
        // Create a link to the file
        downloadLink.href = `data:${dataType}, ${tableHTML}`;

        // Setting the file name
        downloadLink.download = fileName;

        // Triggering the function
        downloadLink.click();
    }
};
