import { jsPDF } from 'jspdf';
import type { Bill, BillItem, BusinessSettings } from '@/types';
import { BUSINESS_INFO } from '@/lib/constants';
import { LOGO_BASE64 } from '@/lib/logoBase64';

export function generateBillPDF(
  bill: Bill,
  items: BillItem[],
  settings?: BusinessSettings | null
): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 12;

  const name = settings?.restaurant_name || BUSINESS_INFO.name;
  const tagline = settings?.tagline || BUSINESS_INFO.tagline;
  const address = settings?.address || `${BUSINESS_INFO.location}, ${BUSINESS_INFO.city}`;
  const phones = BUSINESS_INFO.phones.join(' / ');
  const gstNum = settings?.gst_number || '27AAAAA0000A1Z5';
  const rawFooter = settings?.bill_footer || 'Thank you for visiting Aamrai Resort. Visit Again - Dine - Relax - Celebrate';
  const billFooter = rawFooter.replace(/[^\x00-\x7F]/g, '');

  // --- HEADER SECTION WITH OFFICIAL HOTEL LOGO ---
  try {
    const logoWidth = 26;
    const logoHeight = 26;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(LOGO_BASE64, 'PNG', logoX, y, logoWidth, logoHeight);
    y += logoHeight + 4;
  } catch (e) {
    y += 4;
  }

  // Restaurant Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(35, 21, 12); // Espresso dark brown
  doc.text(name, pageWidth / 2, y, { align: 'center' });
  y += 6;

  // Tagline & Business Category
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(180, 131, 47); // Warm amber gold
  doc.text(`"${tagline}"`, pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('FAMILY RESTAURANT  |  SEPARATE AC BAR  |  EVENT LAWNS  |  LODGING & EV', pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 100, 100);
  doc.text(address, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text(`Phone: ${phones}  |  GSTIN: ${gstNum}`, pageWidth / 2, y, { align: 'center' });
  y += 6;

  // Top Accent Divider Line
  doc.setDrawColor(180, 131, 47);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // --- BILL METADATA BAR ---
  doc.setFillColor(250, 246, 240); // Soft luxury cream background fill
  doc.rect(margin, y, contentWidth, 18, 'F');
  doc.setDrawColor(230, 210, 180);
  doc.rect(margin, y, contentWidth, 18, 'S');

  let metaY = y + 5;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(35, 21, 12);
  doc.text(`Bill No: ${bill.bill_number}`, margin + 4, metaY);
  doc.text(`Date: ${new Date(bill.created_at).toLocaleDateString('en-IN')}`, pageWidth - margin - 4, metaY, { align: 'right' });

  metaY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Customer: ${bill.customer_name} (${bill.customer_mobile})`, margin + 4, metaY);
  doc.text(`Time: ${new Date(bill.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}`, pageWidth - margin - 4, metaY, { align: 'right' });

  if (bill.table_number) {
    metaY += 5;
    doc.text(`Table No: ${bill.table_number}`, margin + 4, metaY);
  }

  y += 24;

  // --- TABLE HEADER ---
  doc.setFillColor(35, 21, 12); // Espresso dark background
  doc.rect(margin, y, contentWidth, 9, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);

  const colItem = margin + 4;
  const colQty = margin + contentWidth * 0.52;
  const colRate = margin + contentWidth * 0.70;
  const colTotal = pageWidth - margin - 4;

  doc.text('ITEM DESCRIPTION', colItem, y + 6);
  doc.text('QTY', colQty, y + 6);
  doc.text('RATE (Rs.)', colRate, y + 6);
  doc.text('TOTAL (Rs.)', colTotal, y + 6, { align: 'right' });
  y += 13;

  // --- ITEMS LIST ---
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);

  items.forEach((item, index) => {
    // Zebra row background
    if (index % 2 === 1) {
      doc.setFillColor(252, 250, 247);
      doc.rect(margin, y - 4.5, contentWidth, 7, 'F');
    }

    const itemName = item.name.length > 38 ? item.name.substring(0, 35) + '...' : item.name;
    doc.text(itemName, colItem, y);
    doc.text(String(item.quantity), colQty, y);
    doc.text(`${item.price_at_purchase}`, colRate, y);
    doc.text(`${item.total}`, colTotal, y, { align: 'right' });
    y += 7.5;
  });

  y += 2;
  doc.setDrawColor(210, 210, 210);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  // --- SUMMARY TOTALS SECTION ---
  const summaryX = margin + contentWidth * 0.45;
  const summaryWidth = contentWidth * 0.55;

  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  doc.text('Subtotal:', summaryX, y);
  doc.text(`Rs. ${bill.subtotal}`, colTotal, y, { align: 'right' });
  y += 6;

  if (bill.discount > 0) {
    doc.text('Discount:', summaryX, y);
    doc.text(`-Rs. ${bill.discount}`, colTotal, y, { align: 'right' });
    y += 6;
  }

  if (bill.tax > 0) {
    const halfTax = bill.tax / 2;
    doc.text('CGST (9%):', summaryX, y);
    doc.text(`Rs. ${halfTax.toFixed(2)}`, colTotal, y, { align: 'right' });
    y += 6;
    doc.text('SGST (9%):', summaryX, y);
    doc.text(`Rs. ${halfTax.toFixed(2)}`, colTotal, y, { align: 'right' });
    y += 6;
  }

  // Grand Total Box
  doc.setFillColor(35, 21, 12);
  doc.rect(summaryX - 2, y - 4.5, summaryWidth + 2, 10, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(230, 194, 120); // Gold text
  doc.text('GRAND TOTAL:', summaryX + 3, y + 2);
  doc.text(`Rs. ${bill.total}`, colTotal - 2, y + 2, { align: 'right' });
  y += 13;

  // Payment Details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(70, 70, 70);
  const payMethod = bill.payment_method.toUpperCase();
  doc.text(`Payment Mode: ${payMethod}`, margin, y);
  doc.text(`Billed By: ${bill.counter_user_name || 'Staff'}`, pageWidth - margin, y, { align: 'right' });

  // --- FOOTER SECTION WITH LOGO BADGE ---
  const footerY = pageHeight - 32;

  doc.setDrawColor(180, 131, 47);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  try {
    const footerLogoSize = 14;
    const footerLogoX = (pageWidth - footerLogoSize) / 2;
    doc.addImage(LOGO_BASE64, 'PNG', footerLogoX, footerY + 3, footerLogoSize, footerLogoSize);
  } catch (e) {
    // Ignore fallback
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(35, 21, 12);
  doc.text('Thank you for visiting Aamrai Resort!', pageWidth / 2, footerY + 21, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(110, 110, 110);
  doc.text(billFooter, pageWidth / 2, footerY + 26, { align: 'center' });

  return doc;
}

export function downloadBillPDF(bill: Bill, items: BillItem[], settings?: BusinessSettings | null) {
  const doc = generateBillPDF(bill, items, settings);
  doc.save(`${bill.bill_number}.pdf`);
}

export function openBillPDF(bill: Bill, items: BillItem[], settings?: BusinessSettings | null) {
  const doc = generateBillPDF(bill, items, settings);
  doc.output('dataurlnewwindow');
}
