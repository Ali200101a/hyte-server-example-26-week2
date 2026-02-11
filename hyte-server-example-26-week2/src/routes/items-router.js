// موجه المسارات للأغراض (الفواكه)
import express from 'express';
import {
  getItems,
  getItemById,
  postNewItem,
  putItemById,
  deleteItemById,
} from '../controllers/items-controller.js';

const router = express.Router(); // إنشاء موجه

// المسار: /api/items
router.route('/')
  .get(getItems) // احضار جميع الأغراض
  .post(postNewItem); // إضافة غرض جديد

// المسار: /api/items/:id
router.route('/:id')
  .get(getItemById) // احضار غرض واحد
  .put(putItemById) // تحديث غرض
  .delete(deleteItemById); // حذف غرض

export default router;