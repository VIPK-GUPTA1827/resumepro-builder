import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPDF(filename = 'Resume.pdf') {
  // Target template renderer element
  const element = document.getElementById('resume-pdf-content') || document.getElementById('resume-content');
  if (!element) {
    console.error('PDF Export Error: Target element not found in DOM.');
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2.5,               // Ultra-high 2.5x retina canvas scaling for sharp text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();    // 210mm
    const pageHeight = pdf.internal.pageSize.getHeight();  // 297mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Page 1
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pageHeight;

    // Multi-page auto-splitting loop if resume content exceeds 1 A4 page
    while (heightLeft > 5) {
      position = position - pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF Export Error:', error);
  }
}
