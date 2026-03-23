// ملف التوجيه (Router) للأغراض - بنية مشابهة لـ users-router لكن بدون validation
import express from 'express';
// استيراد دوال التحكم (Controllers) التي تحتوي على منطق العمليات
import {
  getItems,
  getItemById,
  postNewItem,
  putItemById,
  deleteItemById,
} from '../controllers/items-controller.js';

const router = express.Router();

// المسار: /api/items - تنفيذ REST API مع HTTP methods
router.route('/')
  .get(getItems) // GET - إحضار قائمة الأغراض
  .post(postNewItem); // POST - إضافة غرض جديد

// المسار: /api/items/:id - العمليات على غرض واحد محدد
router.route('/:id')
  .get(getItemById) // GET - إحضار غرض واحد حسب المعرف
  .put(putItemById) // PUT - تحديث غرض موجود
  .delete(deleteItemById); // DELETE - حذف غرض من النظام

export default router;