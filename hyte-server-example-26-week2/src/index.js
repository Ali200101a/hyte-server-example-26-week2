// استيراد المكتبات المطلوبة
import express from 'express';
import itemsRouter from './routes/items-router.js';
import usersRouter from './routes/users-router.js';
import { notFoundHandler, errorHandler } from './middlewares/error-handler.js'; // معالجات الأخطاء

// إعدادات السيرفر
const hostname = '127.0.0.1'; // عنوان السيرفر
const app = express(); // إنشاء تطبيق Express
const port = 3000; // رقم المنفذ

// تحويل البيانات الواردة إلى JSON
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Server is running! Visit /api for the API.');
});

// صفحة API الرئيسية
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});

// نقاط النهاية للأغراض (الفواكه)
app.use('/api/items', itemsRouter);

// نقاط النهاية للمستخدمين
app.use('/api/users', usersRouter);

// إذا المسار غير موجود
app.use(notFoundHandler);

// معالج الأخطاء (آخر شيء)
app.use(errorHandler);

// تشغيل السيرفر
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});