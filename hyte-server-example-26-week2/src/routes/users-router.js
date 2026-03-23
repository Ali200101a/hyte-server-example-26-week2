// ملف التوجيه (Router) للمستخدمين - يحدد جميع نقاط النهاية المتعلقة بالمستخدمين
import express from 'express';
// استيراد دوال التحكم (Controller Functions) التي تنفذ منطق العمليات
import {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
} from '../controllers/users-controller.js';
// استيراد دوال التحقق من express-validator للتحقق من صحة البيانات
import { body, param } from 'express-validator';
// استيراد middleware الذي يفحص نتائج التحقق ويرجع أخطاء إن وُجدت
import { validationErrorHandler } from '../middlewares/error-handler.js';

// إنشاء Router جديد لتنظيم المسارات
const router = express.Router();

// المسار: /api/users - استخدام route() يسمح بربط HTTP methods مختلفة بنفس المسار
router
  .route('/')
  .get(getUsers) // GET request - إحضار قائمة بجميع المستخدمين
  .post(
    // سلسلة من validations تُنفذ بالترتيب قبل الوصول إلى controller
    body('email').trim().isEmail(), // التحقق من صحة البريد الإلكتروني
    body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(), // اسم المستخدم: 3-20 حرف، أحرف وأرقام فقط
    body('password').trim().isLength({ min: 8 }), // كلمة المرور: 8 أحرف كحد أدنى
    validationErrorHandler, // إذا فشل أي validation، يوقف الطلب ويرجع خطأ 400
    postUser // POST request - إضافة مستخدم جديد إلى النظام
  );

// المسار: /api/users/:id - استخدام :id يجعله route parameter ديناميكي
router
  .route('/:id')
  .get(
    param('id').isInt(), // التحقق من أن id المرسل في URL هو رقم صحيح
    validationErrorHandler,
    getUserById // GET request - إحضار مستخدم واحد بناءً على ID
  )
  .put(
    param('id').isInt(), // التحقق من صحة المعرف
    // استخدام optional() يعني أن الحقل ليس إجبارياً - يمكن تحديث بعض البيانات فقط
    body('email').optional().trim().isEmail(),
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric(),
    body('password').optional().trim().isLength({ min: 8 }),
    validationErrorHandler,
    putUserById // PUT request - تحديث بيانات مستخدم موجود
  )
  .delete(
    param('id').isInt(),
    validationErrorHandler,
    deleteUserById // DELETE request - حذف مستخدم من النظام
  );

export default router;