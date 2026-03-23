// Middleware لمعالجة الأخطاء - يتم تنفيذها بين Router و Controller
import { validationResult } from 'express-validator';

// Middleware للتحقق من نتائج express-validator
// يتم استدعاؤها بعد validation rules في Router
export const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req); // جمع جميع أخطاء التحقق من الطلب

  if (!errors.isEmpty()) {
    // إذا كانت هناك أخطاء، إرسال 400 Bad Request مع تفاصيل الأخطاء
    return res.status(400).json({
      message: 'Invalid request',
      errors: errors.array().map((e) => ({
        field: e.path, // اسم الحقل الذي فشل في التحقق
        message: e.msg, // رسالة الخطأ
      })),
    });
  }

  next(); // إذا لم تكن هناك أخطاء، الانتقال إلى الـ middleware التالي (Controller)
};

// Error Handler Middleware العام - يلتقط جميع الأخطاء في التطبيق
// يجب أن يكون آخر middleware في السلسلة
export const errorHandler = (err, req, res, next) => {
  console.error(err); // طباعة الخطأ في console للمطورين

  const status = err.status || 500; // استخدام status code من الخطأ أو 500 كافتراضي
  res.status(status).json({
    message: err.message || 'Internal server error',
    status,
  });
};

// Middleware لمعالجة المسارات غير الموجودة (404)
// يتم تنفيذها إذا لم يتطابق الطلب مع أي route مسجل
export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Not found' });
};