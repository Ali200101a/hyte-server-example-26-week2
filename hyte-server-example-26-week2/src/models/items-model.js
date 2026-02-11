// نموذج البيانات للأغراض (الفواكه)
// بيانات تجريبية
let items = [
  { id: 1, name: 'Omena' }, // تفاح
  { id: 2, name: 'Appelsiini' }, // برتقال
  { id: 3, name: 'Banaaneja' }, // موز
];

// إحضار جميع الأغراض
const listAllItems = async () => items;

// البحث عن غرض بالمعرف
const findItemById = async (id) => items.find((item) => item.id === id);

// إضافة غرض جديد
const addItem = async (data) => {
  // إنشاء معرف جديد
  const newId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  const newItem = { id: newId, ...data }; // الغرض الجديد
  items.push(newItem); // إضافة إلى القائمة
  return newItem;
};

// تحديث غرض موجود
const updateItemById = async (id, data) => {
  const idx = items.findIndex((item) => item.id === id); // البحث عن الموقع
  if (idx === -1) return null; // إذا لم يوجد
  items[idx] = { ...items[idx], ...data }; // تحديث البيانات
  return items[idx];
};

// حذف غرض
const deleteItemById = async (id) => {
  const idx = items.findIndex((item) => item.id === id); // البحث عن الموقع
  if (idx === -1) return false; // إذا لم يوجد
  items.splice(idx, 1); // حذف من القائمة
  return true;
};

export { listAllItems, findItemById, addItem, updateItemById, deleteItemById };