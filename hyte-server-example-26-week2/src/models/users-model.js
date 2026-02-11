// نموذج البيانات للمستخدمين
// بيانات تجريبية
let users = [
  { id: 1, username: 'johndoe', password: 'password1', email: 'johndoe@example.com' },
  { id: 2, username: 'janedoe', password: 'password2', email: 'janedoe@example.com' },
  { id: 3, username: 'bobsmith', password: 'password3', email: 'bobsmith@example.com' },
];

// إزالة كلمة المرور من بيانات المستخدم
const safeUser = (user) => {
  const { password, ...withoutPassword } = user; // فصل كلمة المرور
  return withoutPassword; // إرجاع البيانات بدون كلمة المرور
};

// إحضار جميع المستخدمين
const listAllUsers = async () => users.map(safeUser); // إرسال المستخدمين بدون كلمات المرور

// البحث عن مستخدم بالمعرف
const findUserById = async (id) => {
  const user = users.find((u) => u.id === id); // البحث عن المستخدم
  return user ? safeUser(user) : null; // إرجاع بدون كلمة المرور
};

// إضافة مستخدم جديد
const addUser = async (data) => {
  // إنشاء معرف جديد
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: newId, ...data }; // المستخدم الجديد
  users.push(newUser); // إضافة إلى القائمة
  return safeUser(newUser); // إرجاع بدون كلمة المرور
};

// تحديث مستخدم موجود
const updateUserById = async (id, data) => {
  const idx = users.findIndex((u) => u.id === id); // البحث عن الموقع
  if (idx === -1) return null; // إذا لم يوجد
  users[idx] = { ...users[idx], ...data }; // تحديث البيانات
  return safeUser(users[idx]); // إرجاع بدون كلمة المرور
};

// حذف مستخدم
const deleteUserById = async (id) => {
  const idx = users.findIndex((u) => u.id === id); // البحث عن الموقع
  if (idx === -1) return false; // إذا لم يوجد
  users.splice(idx, 1); // حذف من القائمة
  return true;
};

export { listAllUsers, findUserById, addUser, updateUserById, deleteUserById };