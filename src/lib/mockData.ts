import type { MenuItem, Bill, BillItem, Review, GalleryImage, EventPackage, Room, BusinessSettings } from '@/types';

export const mockSettings: BusinessSettings = {
  id: '1',
  restaurant_name: 'Aamrai Resort',
  logo: '/logo.png',
  tagline: "Nature's Escape on the NH4 Highway",
  phone: '7030906868',
  whatsapp: '7030926868',
  email: 'amruta9762@gmail.com',
  address: 'Pune Bangalore Highway, Shendre, Satara, Maharashtra 415002',
  opening_hours: '06:00 AM - 11:30 PM',
  bill_footer: 'Thank you for visiting Aamrai Resort. Visit Again - Dine - Relax - Celebrate',
  tax_percentage: 18,
  tax_enabled: true,
  gst_number: '27AAAAA0000A1Z5',
  maps_link: 'https://www.google.com/maps/search/?api=1&query=Aamrai+Resort+Shendre+Satara',
  social_links: {},
  updated_at: new Date().toISOString(),
};

export const mockMenuItems: MenuItem[] = [
  { id: 'm1', name: 'Paneer Tikka', description: 'Grilled cottage cheese marinated in yogurt and aromatic spices', category: 'Starters', is_veg: true, price: 240, image_url: 'https://images.pexels.com/photos/33430556/pexels-photo-33430556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: true, is_bar_item: false, sort_order: 1, created_at: '', updated_at: '' },
  { id: 'm2', name: 'Satara Mutton Handi', description: 'Signature Satara style slow-cooked mutton in rich spicy gravy with authentic local spices', category: 'Main Course', is_veg: false, price: 420, image_url: 'https://images.pexels.com/photos/6113813/pexels-photo-6113813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: true, is_bar_item: false, sort_order: 2, created_at: '', updated_at: '' },
  { id: 'm3', name: 'Chicken Tikka', description: 'Tender chicken pieces marinated in tandoori spices and grilled', category: 'Starters', is_veg: false, price: 280, image_url: 'https://images.pexels.com/photos/36701469/pexels-photo-36701469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: false, is_bar_item: false, sort_order: 3, created_at: '', updated_at: '' },
  { id: 'm4', name: 'Solkadhi', description: 'Refreshing Konkan-Satara pink digestive drink made from kokum extract and coconut milk with garlic and chilies', category: 'Beverages', is_veg: true, price: 60, image_url: 'https://images.pexels.com/photos/29650995/pexels-photo-29650995.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: true, is_bar_item: false, sort_order: 4, created_at: '', updated_at: '' },
  { id: 'm5', name: 'Chicken Biryani', description: 'Aromatic basmati rice with tender chicken and saffron', category: 'Biryani', is_veg: false, price: 280, image_url: 'https://images.pexels.com/photos/28674660/pexels-photo-28674660.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: true, is_bar_item: false, sort_order: 5, created_at: '', updated_at: '' },
  { id: 'm6', name: 'Veg Biryani', description: 'Fragrant basmati rice with mixed vegetables and spices', category: 'Biryani', is_veg: true, price: 220, image_url: 'https://images.pexels.com/photos/9609869/pexels-photo-9609869.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: false, is_featured: true, is_bar_item: false, sort_order: 6, created_at: '', updated_at: '' },
  { id: 'm7', name: 'Butter Chicken', description: 'Creamy tomato-based chicken curry with butter and spices', category: 'Main Course', is_veg: false, price: 320, image_url: 'https://images.pexels.com/photos/20408432/pexels-photo-20408432.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: true, is_bar_item: false, sort_order: 7, created_at: '', updated_at: '' },
  { id: 'm8', name: 'Paneer Butter Masala', description: 'Cottage cheese in a rich creamy tomato gravy', category: 'Main Course', is_veg: true, price: 260, image_url: 'https://images.pexels.com/photos/35993886/pexels-photo-35993886.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: false, is_featured: true, is_bar_item: false, sort_order: 8, created_at: '', updated_at: '' },
  { id: 'm9', name: 'Satara Special Veg Thali', description: 'Grand Maharashtrian vegetarian feast with 2 curries, bhakri/chapati, dal fry, steamed rice, solkadhi & sweet', category: 'Specials', is_veg: true, price: 260, image_url: 'https://images.pexels.com/photos/35008222/pexels-photo-35008222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: true, is_bar_item: false, sort_order: 9, created_at: '', updated_at: '' },
  { id: 'm10', name: 'Satara Special Mutton Thali', description: 'Authentic Satara non-veg feast with Mutton Sukka, Tambda Rassa, Pandhra Rassa, Chapati/Bhakri & Indrayani Rice', category: 'Specials', is_veg: false, price: 440, image_url: 'https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: true, is_featured: true, is_bar_item: false, sort_order: 10, created_at: '', updated_at: '' },
  { id: 'm11', name: 'Butter Naan', description: 'Soft tandoor-baked bread brushed with butter', category: 'Roti / Bread', is_veg: true, price: 50, image_url: 'https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: false, is_featured: false, is_bar_item: false, sort_order: 11, created_at: '', updated_at: '' },
  { id: 'm12', name: 'Veg Manchurian', description: 'Crispy vegetable balls in a tangy Indo-Chinese sauce', category: 'Chinese', is_veg: true, price: 180, image_url: 'https://images.pexels.com/photos/28674530/pexels-photo-28674530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: false, is_featured: false, is_bar_item: false, sort_order: 12, created_at: '', updated_at: '' },
  { id: 'm13', name: 'Gulab Jamun', description: 'Soft milk dumplings soaked in rose-flavored sugar syrup', category: 'Specials', is_veg: true, price: 80, image_url: 'https://images.pexels.com/photos/37294501/pexels-photo-37294501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: false, is_featured: false, is_bar_item: false, sort_order: 13, created_at: '', updated_at: '' },
  { id: 'm14', name: 'Chicken 65', description: 'Spicy deep-fried chicken with curry leaves and green chilies', category: 'Starters', is_veg: false, price: 220, image_url: 'https://images.pexels.com/photos/37180957/pexels-photo-37180957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: false, is_featured: false, is_bar_item: false, sort_order: 14, created_at: '', updated_at: '' },
  { id: 'm15', name: 'Masala Chai', description: 'Traditional Indian spiced tea with milk', category: 'Beverages', is_veg: true, price: 30, image_url: 'https://images.pexels.com/photos/29650995/pexels-photo-29650995.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, is_special: false, is_featured: false, is_bar_item: false, sort_order: 15, created_at: '', updated_at: '' },
];

export const mockGalleryImages: GalleryImage[] = [
  { id: 'g1', url: 'https://1qlik.com/Vendor_img/1729504904868.jpg', category: 'Resort & Garden', sort_order: 1, created_at: '' },
  { id: 'g2', url: 'https://1qlik.com/Vendor_img/IMG_20241021_151913.jpg', category: 'Property', sort_order: 1, created_at: '' },
  { id: 'g3', url: 'https://1qlik.com/Vendor_img/IMG_20241021_151952.jpg', category: 'Restaurant', sort_order: 1, created_at: '' },
  { id: 'g4', url: 'https://1qlik.com/Vendor_img/IMG_20241021_151927.jpg', category: 'Events', sort_order: 1, created_at: '' },
  { id: 'g5', url: 'https://1qlik.com/Vendor_img/IMG_20241021_151938.jpg', category: 'Evening Ambience', sort_order: 1, created_at: '' },
  { id: 'g6', url: 'https://1qlik.com/Vendor_img/IMG_20241021_152004.jpg', category: 'Parking', sort_order: 1, created_at: '' },
  { id: 'g7', url: 'https://images.pexels.com/photos/14024976/pexels-photo-14024976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Resort & Garden', sort_order: 2, created_at: '' },
  { id: 'g8', url: 'https://images.pexels.com/photos/14723039/pexels-photo-14723039.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Resort & Garden', sort_order: 3, created_at: '' },
  { id: 'g9', url: 'https://images.pexels.com/photos/38406260/pexels-photo-38406260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Property', sort_order: 2, created_at: '' },
  { id: 'g10', url: 'https://images.pexels.com/photos/14036439/pexels-photo-14036439.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Resort & Garden', sort_order: 4, created_at: '' },
  { id: 'g11', url: 'https://images.pexels.com/photos/14024974/pexels-photo-14024974.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Resort & Garden', sort_order: 5, created_at: '' },
  { id: 'g12', url: 'https://images.pexels.com/photos/10918632/pexels-photo-10918632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Resort & Garden', sort_order: 6, created_at: '' },
  { id: 'g13', url: 'https://images.pexels.com/photos/30196346/pexels-photo-30196346.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Resort & Garden', sort_order: 7, created_at: '' },
  { id: 'g14', url: 'https://images.pexels.com/photos/29819295/pexels-photo-29819295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Restaurant', sort_order: 2, created_at: '' },
  { id: 'g15', url: 'https://images.pexels.com/photos/11828428/pexels-photo-11828428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Restaurant', sort_order: 3, created_at: '' },
  { id: 'g16', url: 'https://images.pexels.com/photos/2291619/pexels-photo-2291619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Evening Ambience', sort_order: 2, created_at: '' },
  { id: 'g17', url: 'https://images.pexels.com/photos/37240654/pexels-photo-37240654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Evening Ambience', sort_order: 3, created_at: '' },
  { id: 'g18', url: 'https://images.pexels.com/photos/31217382/pexels-photo-31217382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Events', sort_order: 2, created_at: '' },
  { id: 'g19', url: 'https://images.pexels.com/photos/4887782/pexels-photo-4887782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Events', sort_order: 3, created_at: '' },
  { id: 'g20', url: 'https://images.pexels.com/photos/10997901/pexels-photo-10997901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Events', sort_order: 4, created_at: '' },
  { id: 'g21', url: 'https://images.pexels.com/photos/4678065/pexels-photo-4678065.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'EV Charging', sort_order: 1, created_at: '' },
  { id: 'g22', url: 'https://images.pexels.com/photos/9800004/pexels-photo-9800004.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'EV Charging', sort_order: 2, created_at: '' },
  { id: 'g23', url: 'https://images.pexels.com/photos/9716297/pexels-photo-9716297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Parking', sort_order: 2, created_at: '' },
  { id: 'g24', url: 'https://images.pexels.com/photos/14025911/pexels-photo-14025911.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Property', sort_order: 3, created_at: '' },
  { id: 'g25', url: 'https://images.pexels.com/photos/14025023/pexels-photo-14025023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Property', sort_order: 4, created_at: '' },
  { id: 'g26', url: 'https://images.pexels.com/photos/14025024/pexels-photo-14025024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', category: 'Property', sort_order: 5, created_at: '' },
];

export const mockReviews: (Review & { textMr?: string })[] = [
  { id: 'r1', author_name: 'Rajesh Patil', rating: 5, text: 'Aamrai Resort is a perfect stop on the highway. The food was delicious and the ambience is so peaceful. We loved the garden area.', textMr: 'आमराई रिसॉर्ट हे महामार्गावरील अत्यंत उत्तम ठिकाण आहे. जेवण उत्कृष्ट आणि वातावरण अतिशय शांत व प्रसन्न आहे.', is_published: true, is_verified: true, created_at: '' },
  { id: 'r2', author_name: 'Sunita Deshmukh', rating: 5, text: 'We celebrated our anniversary here. The staff was very cooperative and the decoration was beautiful. Highly recommended for family functions.', textMr: 'आम्ही आमचा लग्नाचा वाढदिवस येथे साजरा केला. स्टाफ अत्यंत नम्र आणि डेकोरेशन सुंदर होते. कौटुंबिक सोहळ्यांसाठी उत्तम.', is_published: true, is_verified: true, created_at: '' },
  { id: 'r3', author_name: 'Amit Kulkarni', rating: 4, text: 'Great food and quick service. The paneer tikka was exceptional. Will definitely stop again on our next trip.', textMr: 'उत्कृष्ट जेवण आणि तत्पर सर्व्हिस. पनीर टिक्का अतिशय अप्रतिम होता. पुढील प्रवासात नक्की पुन्हा भेट देऊ.', is_published: true, is_verified: true, created_at: '' },
  { id: 'r4', author_name: 'Priya Jadhav', rating: 5, text: 'Beautiful resort with lush greenery. The separate bar section is well-maintained. Perfect place to relax on a weekend.', textMr: 'प्रसन्न रिसॉर्ट वातावरण. सेपरेट एसी बार विभाग उत्तम आहे. वीकेंडला विश्रांतीसाठी उत्तम ठिकाण.', is_published: true, is_verified: true, created_at: '' },
  { id: 'r5', author_name: 'Mahesh Shinde', rating: 4, text: 'Good highway restaurant with ample parking. The biryani was flavorful and portions are generous. EV charging was a bonus.', textMr: 'प्रशस्त पार्किंग सुविधा असलेले उत्तम हायवे रेस्टॉरंट. बिरयानी अप्रतिम होती आणि ईव्ही चार्जिंगची सोय खूप उपयोगी पडली.', is_published: true, is_verified: true, created_at: '' },
  { id: 'r6', author_name: 'Deepali Pawar', rating: 5, text: 'Hosted a birthday party here and it was wonderful. The event lawn is spacious and the staff took care of everything. Thank you Aamrai!', textMr: 'येथे वाढदिवसाचा सोहळा आयोजित केला होता. इव्हेंट लॉन भव्य आहे आणि स्टाफने सर्व तयारी उत्तम प्रकारे सांभाळली.', is_published: true, is_verified: true, created_at: '' },
];

export const mockEvents: EventPackage[] = [
  { id: 'e1', name: 'Wedding Celebration', capacity: 'Up to 500 guests', description: 'Celebrate your special day amidst nature. Our spacious event lawn with lush greenery provides the perfect backdrop for weddings.', starting_price: 150000, image_url: 'https://images.pexels.com/photos/31217382/pexels-photo-31217382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', amenities: 'Event Lawn, Decoration, Catering, Parking, Power Backup', availability: 'Available throughout the year', contact: '7030926868', created_at: '' },
  { id: 'e2', name: 'Mehendi & Sangeet', capacity: 'Up to 200 guests', description: 'Vibrant pre-wedding celebrations in our garden setting with dedicated decor and music arrangements.', starting_price: 50000, image_url: 'https://images.pexels.com/photos/4887782/pexels-photo-4887782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', amenities: 'Garden Area, Sound System, Decoration, Catering', availability: 'Available throughout the year', contact: '7030926868', created_at: '' },
  { id: 'e3', name: 'Birthday Party', capacity: 'Up to 100 guests', description: 'Make birthdays memorable with special decorations, dedicated dining area, and customized menu options.', starting_price: 15000, image_url: 'https://images.pexels.com/photos/32994495/pexels-photo-32994495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', amenities: 'Decoration, Cake Table, Dining Area, Music', availability: 'Available throughout the year', contact: '7030926868', created_at: '' },
  { id: 'e4', name: 'Corporate Event', capacity: 'Up to 150 guests', description: 'Professional event space for corporate meetings, team outings, and business gatherings with full catering support.', starting_price: 35000, image_url: 'https://images.pexels.com/photos/14608923/pexels-photo-14608923.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', amenities: 'Seating Arrangement, Projector Setup, Catering, Parking', availability: 'Available throughout the year', contact: '7030926868', created_at: '' },
  { id: 'e5', name: 'Anniversary Celebration', capacity: 'Up to 80 guests', description: 'Intimate celebration space for anniversaries and get-togethers with special ambiance and personalized service.', starting_price: 12000, image_url: 'https://images.pexels.com/photos/10997901/pexels-photo-10997901.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', amenities: 'Decoration, Private Dining, Cake Table, Music', availability: 'Available throughout the year', contact: '7030926868', created_at: '' },
];

export const mockRooms: Room[] = [
  { id: 'rm1', name: 'Deluxe Room', description: 'Comfortable room with modern amenities and garden view', amenities: 'AC, TV, Hot Water, Wi-Fi, Attached Bathroom', price: 1800, image_url: 'https://images.pexels.com/photos/14025023/pexels-photo-14025023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, created_at: '' },
  { id: 'rm2', name: 'Premium Room', description: 'Spacious room with premium furnishings and natural light', amenities: 'AC, TV, Hot Water, Wi-Fi, Mini Fridge, Garden View', price: 2500, image_url: 'https://images.pexels.com/photos/14025024/pexels-photo-14025024.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, created_at: '' },
  { id: 'rm3', name: 'Family Suite', description: 'Large family room with multiple beds and sitting area', amenities: 'AC, TV, Hot Water, Wi-Fi, Mini Fridge, Sitting Area, Garden View', price: 4000, image_url: 'https://images.pexels.com/photos/14025911/pexels-photo-14025911.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, created_at: '' },
  { id: 'rm4', name: 'Nature Cottage', description: 'Wooden cottage surrounded by greenery for a peaceful stay', amenities: 'AC, TV, Hot Water, Wi-Fi, Private Veranda, Garden Access', price: 3500, image_url: 'https://images.pexels.com/photos/14025910/pexels-photo-14025910.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', is_available: true, created_at: '' },
];

const NAMES = ['Rajesh Patil', 'Sunita Deshmukh', 'Amit Kulkarni', 'Priya Jadhav', 'Mahesh Shinde', 'Deepali Pawar', 'Suresh Mohite', 'Kavita Nair', 'Vijay Bhosale', 'Anjali Rao', 'Sanjay Gaikwad', 'Meera Joshi', 'Nilesh Kadam', 'Pooja Desai', 'Rahul Vaidya', 'Sneha Kapre', 'Arun Mahadik', 'Jyoti More', 'Ganpat Pawar', 'Lata Shinde'];
const MOBILES = ['9876543210', '9823456789', '9970123456', '9420112233', '9158001234', '9890123456', '9923456780', '9876123450', '9021345678', '9420987654'];
const PAYMENTS: ('cash' | 'upi' | 'card' | 'other')[] = ['cash', 'upi', 'card', 'other'];
const COUNTERS = ['Counter Staff', 'Admin'];

function generateMockBills(): Bill[] {
  const bills: Bill[] = [];
  const billItemsMap: Record<string, BillItem[]> = {};
  const nonBarItems = mockMenuItems.filter((m) => !m.is_bar_item);

  for (let i = 1; i <= 60; i++) {
    const billNo = `AR-${String(i).padStart(6, '0')}`;
    const custName = NAMES[i % NAMES.length];
    const custMobile = MOBILES[i % MOBILES.length];
    const payMethod = PAYMENTS[i % PAYMENTS.length];
    const counterName = COUNTERS[i % 2];
    const daysAgo = Math.floor(Math.random() * 90);
    const hoursAgo = Math.floor(Math.random() * 12);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);

    const numItems = Math.floor(Math.random() * 3) + 1;
    const items: BillItem[] = [];
    let subtotal = 0;

    for (let j = 0; j < numItems; j++) {
      const item = nonBarItems[Math.floor(Math.random() * nonBarItems.length)];
      const qty = Math.floor(Math.random() * 2) + 1;
      const total = item.price * qty;
      subtotal += total;
      items.push({
        id: `${billNo}-item-${j}`,
        bill_id: billNo,
        menu_item_id: item.id,
        name: item.name,
        price_at_purchase: item.price,
        quantity: qty,
        total,
      });
    }

    const discount = Math.random() < 0.2 ? subtotal * 0.05 : 0;
    const grandTotal = subtotal - discount;

    bills.push({
      id: billNo,
      bill_number: billNo,
      customer_name: custName,
      customer_mobile: custMobile,
      table_number: '',
      num_guests: Math.floor(Math.random() * 4) + 1,
      special_notes: '',
      subtotal,
      discount,
      tax: 0,
      total: grandTotal,
      payment_method: payMethod,
      status: 'paid',
      counter_user_id: null,
      counter_user_name: counterName,
      created_at: date.toISOString(),
      bill_items: items,
    });

    billItemsMap[billNo] = items;
  }

  bills.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return bills;
}

export const mockBills: Bill[] = generateMockBills();

export const aboutSliderImages = [
  'https://1qlik.com/Vendor_img/1729504904868.jpg',
  'https://1qlik.com/Vendor_img/IMG_20241021_151913.jpg',
  'https://1qlik.com/Vendor_img/IMG_20241021_151952.jpg',
  'https://1qlik.com/Vendor_img/IMG_20241021_151927.jpg',
  'https://1qlik.com/Vendor_img/IMG_20241021_151938.jpg',
  'https://1qlik.com/Vendor_img/IMG_20241021_152004.jpg',
];
