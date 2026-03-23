// Model Layer للأغراض - تخزين البيانات في الذاكرة (in-memory storage)
// مصفوفة تحتوي على بيانات تجريبية - البيانات ستُفقد عند إعادة تشغيل السيرفر
let items = [
  { id: 1, name: 'Omena' }, // تفاح
  { id: 2, name: 'Appelsiini' }, // برتقال
  { id: 3, name: 'Banaaneja' }, // موز
];

// إحضار قائمة جميع الأغراض من المصفوفة
const listAllItems = async () => items;

// البحث عن غرض واحد باستخدام ID - استخدام find للبحث في المصفوفة
const findItemById = async (id) => items.find((item) => item.id === id);

// إضافة غرض جديد إلى المصفوفة
const addItem = async (data) => {
  // توليد ID جديد تلقائياً: إيجاد أكبر ID موجود وإضافة 1
  const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  const newItem = { id: newId, ...data }; // دمج ID مع البيانات المُرسلة
  items.push(newItem); // إضافة الغرض الجديد إلى المصفوفة
  return newItem; // إرجاع الغرض المُضاف مع ID
};

// تحديث بيانات غرض موجود في المصفوفة
const updateItemById = async (id, data) => {
  const idx = items.findIndex((item) => item.id === id); // إيجاد موقع (index) الغرض
  if (idx === -1) return null; // إرجاع null إذا لم يوجد الغرض
  items[idx] = { ...items[idx], ...data }; // دمج البيانات القديمة مع الجديدة
  return items[idx]; // إرجاع الغرض المُحدَّث
};

// حذف غرض من المصفوفة
const deleteItemById = async (id) => {
  const idx = items.findIndex((item) => item.id === id); // البحث عن موقع الغرض
  if (idx === -1) return false; // إرجاع false إذا لم يكن موجوداً
  items.splice(idx, 1); // حذف الغرض من المصفوفة باستخدام splice
  return true; // إرجاع true عند نجاح الحذف
};

export { listAllItems, findItemById, addItem, updateItemById, deleteItemById };