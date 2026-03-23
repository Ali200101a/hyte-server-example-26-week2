// Controllers - الطبقة التي تحتوي على منطق التطبيق وتربط بين Routes و Models
import { listAllUsers, findUserById, addUser, updateUserById, deleteUserById as deleteUserFromModel } from '../models/users-model.js';

// Controller للحصول على جميع المستخدمين - READ operation من CRUD
const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers(); // استدعاء Model للحصول على البيانات من الذاكرة
    res.json(users); // إرسال استجابة JSON للـ client مع البيانات
  } catch (e) {
    next(e); // في حالة الخطأ، إرسال الخطأ إلى Error Handler Middleware
  }
};

// Controller للحصول على مستخدم واحد بناءً على ID - READ operation
const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(Number(req.params.id)); // req.params.id يحتوي على المعرف من URL
    if (!user) return res.status(404).json({ error: 'user not found' }); // إرسال 404 إذا لم يوجد المستخدم
    res.json(user); // إرسال بيانات المستخدم كـ JSON response
  } catch (e) {
    next(e);
  }
};

// Controller لإضافة مستخدم جديد - CREATE operation من CRUD
const postUser = async (req, res, next) => {
  try {
    // التحقق اليدوي من وجود الحقول المطلوبة (بجانب express-validator)
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ error: 'required fields missing' });
    }
    const newUser = await addUser(req.body); // req.body يحتوي على البيانات المُرسلة من client
    res.status(201).json({ message: 'new user added', user: newUser }); // 201 Created - رمز النجاح عند إنشاء مورد جديد
  } catch (e) {
    next(e);
  }
};

// Controller لتحديث بيانات مستخدم موجود - UPDATE operation من CRUD
const putUserById = async (req, res, next) => {
  try {
    const updated = await updateUserById(Number(req.params.id), req.body); // دمج البيانات الجديدة مع الموجودة
    if (!updated) return res.status(404).json({ error: 'user not found' }); // 404 إذا لم يكن المستخدم موجوداً
    res.json({ message: 'user updated', user: updated }); // إرسال البيانات المحدثة في الاستجابة
  } catch (e) {
    next(e);
  }
};

// Controller لحذف مستخدم من النظام - DELETE operation من CRUD
const deleteUserById = async (req, res, next) => {
  try {
    const deleted = await deleteUserFromModel(Number(req.params.id)); // حذف المستخدم من المصفوفة
    if (!deleted) return res.status(404).json({ error: 'user not found' }); // 404 إذا لم يكن موجوداً
    res.json({ message: 'user deleted' }); // رسالة تأكيد الحذف
  } catch (e) {
    next(e);
  }
};

export { getUsers, getUserById, postUser, putUserById, deleteUserById };