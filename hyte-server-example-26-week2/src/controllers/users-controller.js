// وحدة التحكم للمستخدمين
import { listAllUsers, findUserById, addUser, updateUserById, deleteUserById as deleteUserFromModel } from '../models/users-model.js';

// إحضار جميع المستخدمين
const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers(); // الحصول على قائمة المستخدمين
    res.json(users); // إرسال القائمة كـ JSON
  } catch (e) {
    next(e); // إرسال الخطأ للمعالج
  }
};

// إحضار مستخدم واحد بالمعرف
const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(Number(req.params.id)); // البحث عن المستخدم
    if (!user) return res.status(404).json({ error: 'user not found' }); // إذا لم يوجد
    res.json(user); // إرسال المستخدم
  } catch (e) {
    next(e);
  }
};

// إضافة مستخدم جديد
const postUser = async (req, res, next) => {
  try {
    // التحقق من الحقول المطلوبة
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ error: 'required fields missing' });
    }
    const newUser = await addUser(req.body); // إضافة المستخدم الجديد
    res.status(201).json({ message: 'new user added', user: newUser }); // إرسال رد النجاح
  } catch (e) {
    next(e);
  }
};

// تحديث مستخدم موجود
const putUserById = async (req, res, next) => {
  try {
    const updated = await updateUserById(Number(req.params.id), req.body); // تحديث المستخدم
    if (!updated) return res.status(404).json({ error: 'user not found' }); // إذا لم يوجد
    res.json({ message: 'user updated', user: updated }); // إرسال رد النجاح
  } catch (e) {
    next(e);
  }
};

// حذف مستخدم
const deleteUserById = async (req, res, next) => {
  try {
    const deleted = await deleteUserFromModel(Number(req.params.id)); // حذف المستخدم
    if (!deleted) return res.status(404).json({ error: 'user not found' }); // إذا لم يوجد
    res.json({ message: 'user deleted' }); // إرسال رد النجاح
  } catch (e) {
    next(e);
  }
};

export { getUsers, getUserById, postUser, putUserById, deleteUserById };