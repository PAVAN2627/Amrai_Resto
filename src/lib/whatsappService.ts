import type { Bill, BillItem, BusinessSettings } from '@/types';
import { formatWhatsAppMobile, WHATSAPP_BASE } from '@/lib/constants';

export interface WhatsAppSendResult {
  success: boolean;
  message: string;
  autoSent: boolean;
}

/**
 * Direct WhatsApp Itemized Text Receipt & Dynamic PDF Link Service
 * Uses 100% pure standard ASCII text with zero emojis, zero bullets, and zero question mark symbols.
 */
export async function sendAutoWhatsAppBillPDF(
  bill: Bill,
  items?: BillItem[],
  _settings?: BusinessSettings | null
): Promise<WhatsAppSendResult> {
  const mobileNumber = formatWhatsAppMobile(bill.customer_mobile);
  const billItemsList = items && items.length > 0 ? items : (bill.bill_items || []);

  let itemsText = '';
  if (billItemsList.length > 0) {
    itemsText = '\n--- DISHES ORDERED ---\n' + billItemsList.map((i) => `- ${i.name} x ${i.quantity} = Rs. ${i.total}`).join('\n') + '\n----------------------\n';
  }

  const dateStr = new Date(bill.created_at).toLocaleDateString('en-IN');
  const timeStr = new Date(bill.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const taxDetails = bill.tax > 0 
    ? `CGST (9%): Rs. ${(bill.tax / 2).toFixed(2)}\nSGST (9%): Rs. ${(bill.tax / 2).toFixed(2)}\n` 
    : '';

  const tableStr = bill.table_number ? `Table No: ${bill.table_number}\n` : '';

  // Dynamic origin URL (Vercel deployment URL or localhost)
  const appBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aamrairesort.com';
  const billPdfUrl = `${appBaseUrl}/bill/${bill.bill_number}`;

  const messageText = `*AAMRAI RESORT - OFFICIAL BILL RECEIPT*\n\nBill No: ${bill.bill_number}\nDate: ${dateStr} ${timeStr}\nCustomer: ${bill.customer_name} (${bill.customer_mobile})\n${tableStr}${itemsText}Subtotal: Rs. ${bill.subtotal}\n${taxDetails}*GRAND TOTAL: Rs. ${bill.total}*\nPayment Mode: ${bill.payment_method.toUpperCase()}\n\nView / Download Digital PDF Bill:\n${billPdfUrl}\n\nThank you for visiting Aamrai Resort!\nNH4 Highway, Shendre, Satara\nPhone: 7030906868 / 7030926868`;

  // Optional background WhatsApp Cloud API Gateway
  const apiEndpoint = import.meta.env.VITE_WHATSAPP_API_URL;
  const apiToken = import.meta.env.VITE_WHATSAPP_API_TOKEN;

  if (apiEndpoint && apiToken) {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: mobileNumber,
          type: 'text',
          text: { body: messageText },
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: `Itemized Bill ${bill.bill_number} sent directly to WhatsApp!`,
          autoSent: true,
        };
      }
    } catch (e) {
      console.warn('WhatsApp API gateway fallback to direct link.', e);
    }
  }

  // Open WhatsApp directly with clean itemized text receipt & PDF link
  window.open(`${WHATSAPP_BASE}${mobileNumber}?text=${encodeURIComponent(messageText)}`, '_blank');

  return {
    success: true,
    message: `Bill saved & digital receipt sent to WhatsApp for +${mobileNumber}`,
    autoSent: false,
  };
}
