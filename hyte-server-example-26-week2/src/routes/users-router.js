// موجه المسارات للمستخدمين
import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
} from '../controllers/users-controller.js';
import { body, validationResult } from 'express-validator'; // للتحقق من صحة البيانات

const router = express.Router(); // إنشاء موجه

// المسار: /api/users
router.route('/')
  .get(getUsers) // احضار جميع المستخدمين
  .post(
    // التحقق من صحة البيانات
    body('email').trim().isEmail(), // التحقق من البريد الإلكتروني
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(), // التحقق من اسم المستخدم (3-20 حرف)
    body('password').trim().isLength({min: 8}), // التحقق من كلمة المرور (8 أحرف على الأقل)
    (req, res, next) => {
      const errors = validationResult(req); // فحص الأخطاء
      if (!errors.isEmpty()) { // إذا وجدت أخطاء
        const error = new Error('Invalid or missing fields');
        error.status = 400;
        return next(error);
      }
      next(); // متابعة التنفيذ
    },
    postUser // إضافة مستخدم جديد
  );

// المسار: /api/users/:id
router.route('/:id')
  .get(getUserById) // احضار مستخدم واحد
  .put(
    // التحقق من صحة البيانات (اختياري)
    body('email').optional().trim().isEmail(),
    body('username').optional().trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').optional().trim().isLength({min: 8}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('Invalid or missing fields');
        error.status = 400;
        return next(error);
      }
      next();
    },
    putUserById // تحديث مستخدم
  )
  .delete(deleteUserById); // حذف مستخدم

export default router;