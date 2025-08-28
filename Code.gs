function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('BN TRANSPORT - บริการรถบรรทุกครบวงจร')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ฟังก์ชันจัดการ Contact Form
function submitContactForm(formData) {
  try {
    // สร้าง Google Sheet หรือส่งอีเมลได้
    console.log('Contact Form Data:', formData);
    return { success: true, message: 'ข้อมูลถูกส่งเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 24 ชั่วโมง' };
  } catch (error) {
    return { success: false, message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' };
  }
}

// ฟังก์ชันคำนวณราคาเบื้องต้น
function calculatePrice(truckType, distance, service) {
  const basePrices = {
    '4wheel': { base: 800, perKm: 15 },
    '6wheel': { base: 1200, perKm: 18 },
    '10wheel': { base: 2000, perKm: 25 },
    'crane': { base: 1500, perKm: 20 }
  };
  
  const serviceMultiplier = {
    'delivery': 1,
    'moving': 1.2,
    'construction': 1.3
  };
  
  const base = basePrices[truckType] || basePrices['6wheel'];
  const total = (base.base + (distance * base.perKm)) * (serviceMultiplier[service] || 1);
  
  return Math.round(total);
}
