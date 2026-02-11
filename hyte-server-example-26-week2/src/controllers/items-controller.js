// وحدة التحكم للأغراض (الفواكه)
import { listAllItems, findItemById, addItem, updateItemById, deleteItemById as deleteItemFromModel } from '../models/items-model.js';

// إحضار جميع الأغراض
const getItems = async (req, res, next) => {
  try {
    const items = await listAllItems(); // الحصول على قائمة الأغراض
    res.json(items); // إرسال القائمة كـ JSON
  } catch (e) {
    next(e); // إرسال الخطأ للمعالج
  }
};

// إحضار غرض واحد بالمعرف
const getItemById = async (req, res, next) => {
  try {
    const item = await findItemById(Number(req.params.id)); // البحث عن الغرض
    if (!item) return res.status(404).json({ error: 'item not found' }); // إذا لم يوجد
    res.json(item); // إرسال الغرض
  } catch (e) {
    next(e);
  }
};

// إضافة غرض جديد
const postNewItem = async (req, res, next) => {
  try {
    if (!req.body.name) return res.status(400).json({ error: 'name required' }); // التحقق من الاسم
    const newItem = await addItem(req.body); // إضافة الغرض الجديد
    res.status(201).json({ message: 'new item added', item: newItem }); // إرسال رد النجاح
  } catch (e) {
    next(e);
  }
};

// تحديث غرض موجود
const putItemById = async (req, res, next) => {
  try {
    const updated = await updateItemById(Number(req.params.id), req.body); // تحديث الغرض
    if (!updated) return res.status(404).json({ error: 'item not found' }); // إذا لم يوجد
    res.json({ message: 'item updated', item: updated }); // إرسال رد النجاح
  } catch (e) {
    next(e);
  }
};

// حذف غرض
const deleteItemById = async (req, res, next) => {
  try {
    const deleted = await deleteItemFromModel(Number(req.params.id)); // حذف الغرض
    if (!deleted) return res.status(404).json({ error: 'item not found' }); // إذا لم يوجد
    res.json({ message: 'item deleted' }); // إرسال رد النجاح
  } catch (e) {
    next(e);
  }
};

export { getItems, getItemById, postNewItem, putItemById, deleteItemById };