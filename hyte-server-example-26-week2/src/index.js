// استيراد مكتبة Express لبناء تطبيق الويب والـ API
import express from 'express';
// استيراد ملفات التوجيه (Routers) التي تحتوي على نقاط النهاية للموارد المختلفة
import itemsRouter from './routes/items-router.js';
import usersRouter from './routes/users-router.js';
// استيراد معالجات الأخطاء المخصصة (Custom Error Handlers)
import { notFoundHandler, errorHandler } from './middlewares/error-handler.js';

// تحديد عنوان IP الذي سيعمل عليه السيرفر (localhost)
const hostname = '127.0.0.1';
// إنشاء تطبيق Express - هذا هو قلب التطبيق
const app = express();
// تحديد رقم المنفذ (Port) الذي سيستمع عليه السيرفر
const port = 3000;

// Middleware: تحويل البيانات الواردة من JSON إلى كائنات JavaScript
// هذا ضروري لقراءة req.body في الطلبات
app.use(express.json());

// نقطة نهاية رئيسية للتحقق من أن السيرفر يعمل
app.get('/', (req, res) => {
  res.send('Server is running! Visit /api for the API.');
});

// نقطة نهاية تجريبية للـ API
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// تسجيل موجه الأغراض (Items Router) - جميع الطلبات التي تبدأ بـ /api/items
// سيتم توجيهها إلى itemsRouter للمعالجة
app.use('/api/items', itemsRouter);

// تسجيل موجه المستخدمين (Users Router) - جميع الطلبات التي تبدأ بـ /api/users
// سيتم توجيهها إلى usersRouter للمعالجة
app.use('/api/users', usersRouter);

// معالج 404 - يتم تشغيله إذا لم يتطابق أي مسار مع الطلب
// يجب أن يكون قبل معالج الأخطاء العام
app.use(notFoundHandler);

// معالج الأخطاء العام - يجب أن يكون آخر middleware
// يلتقط جميع الأخطاء التي تحدث في التطبيق
app.use(errorHandler);

// تشغيل السيرفر والاستماع على المنفذ المحدد
// عند بدء التشغيل بنجاح، سيطبع رسالة في Console
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});