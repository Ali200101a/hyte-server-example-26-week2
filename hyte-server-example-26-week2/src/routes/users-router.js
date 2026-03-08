// موجه المسارات للمستخدمين
import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
} from '../controllers/users-controller.js';
import { body, param } from 'express-validator'; // للتحقق من صحة البيانات
import { validationErrorHandler } from '../middlewares/error-handler.js'; // معالج أخطاء التحقق

const router = express.Router(); // إنشاء موجه

// المسار: /api/users
router
  .route('/')
  .get(getUsers) // احضار جميع المستخدمين
  .post(
    // التحقق من صحة البيانات
    body('email').trim().isEmail(), // التحقق من البريد الإلكتروني
    body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(), // التحقق من اسم المستخدم (3-20 حرف)
    body('password').trim().isLength({ min: 8 }), // التحقق من كلمة المرور (8 أحرف على الأقل)
    validationErrorHandler, // إذا في أخطاء يرجّع 400
    postUser // إضافة مستخدم جديد
  );

// المسار: /api/users/:id
router
  .route('/:id')
  .get(
    param('id').isInt(), // التحقق من أن id رقم صحيح
    validationErrorHandler,
    getUserById // احضار مستخدم واحد
  )
  .put(
    param('id').isInt(),
    // التحقق من صحة البيانات (اختياري)
    body('email').optional().trim().isEmail(),
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric(),
    body('password').optional().trim().isLength({ min: 8 }),
    validationErrorHandler,
    putUserById // تحديث مستخدم
  )
  .delete(
    param('id').isInt(),
    validationErrorHandler,
    deleteUserById // حذف مستخدم
  );

export default router;