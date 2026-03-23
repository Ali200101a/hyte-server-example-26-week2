// Controllers للأغراض - نفس البنية مثل users-controller
import { listAllItems, findItemById, addItem, updateItemById, deleteItemById as deleteItemFromModel } from '../models/items-model.js';

// READ operation - إحضار جميع الأغراض من الذاكرة
const getItems = async (req, res, next) => {
  try {
    const items = await listAllItems(); // استدعاء Model function
    res.json(items); // إرجاع البيانات بصيغة JSON للـ client
  } catch (e) {
    next(e); // تمرير الخطأ إلى middleware معالج الأخطاء
  }
};

// READ operation - إحضار غرض واحد محدد
const getItemById = async (req, res, next) => {
  try {
    const item = await findItemById(Number(req.params.id)); // تحويل id من string إلى number
    if (!item) return res.status(404).json({ error: 'item not found' }); // 404 Not Found
    res.json(item); // إرسال الغرض كـ JSON
  } catch (e) {
    next(e);
  }
};

// CREATE operation - إضافة غرض جديد للنظام
const postNewItem = async (req, res, next) => {
  try {
    if (!req.body.name) return res.status(400).json({ error: 'name required' }); // تحقق بسيط من وجود الاسم
    const newItem = await addItem(req.body); // إضافة الغرض الجديد إلى array
    res.status(201).json({ message: 'new item added', item: newItem }); // 201 Created status code
  } catch (e) {
    next(e);
  }
};

// UPDATE operation - تحديث بيانات غرض موجود
const putItemById = async (req, res, next) => {
  try {
    const updated = await updateItemById(Number(req.params.id), req.body); // تحديث البيانات في الذاكرة
    if (!updated) return res.status(404).json({ error: 'item not found' }); // إذا لم يوجد الغرض
    res.json({ message: 'item updated', item: updated }); // إرجاع البيانات المحدثة
  } catch (e) {
    next(e);
  }
};

// DELETE operation - حذف غرض من النظام
const deleteItemById = async (req, res, next) => {
  try {
    const deleted = await deleteItemFromModel(Number(req.params.id)); // حذف من المصفوفة
    if (!deleted) return res.status(404).json({ error: 'item not found' }); // 404 إذا غير موجود
    res.json({ message: 'item deleted' }); // رسالة تأكيد الحذف
  } catch (e) {
    next(e);
  }
};

export { getItems, getItemById, postNewItem, putItemById, deleteItemById };