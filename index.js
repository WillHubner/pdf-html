function gerarPDF() {    
    const element = document.getElementById('content');

    const options = {
        margin: 1,             // Margens do PDF em cm
        filename: 'documento.pdf',   // Nome do arquivo gerado
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).toPdf().output('blob').then((pdfBlob) => {
    
        if (navigator.canShare && navigator.canShare({ files: [pdfBlob] })) {
            const file = new File([pdfBlob], 'documento.pdf', { type: 'application/pdf' });
            navigator.share({
                title: 'Compartilhar PDF',
                files: [file]
            }).then(() => {
                console.log('PDF compartilhado com sucesso!');
            }).catch((error) => {
                console.error('Erro ao compartilhar:', error);
            });
        } else {
            console.log('O compartilhamento de arquivos não é suportado neste dispositivo.');
        }
    });    
}
