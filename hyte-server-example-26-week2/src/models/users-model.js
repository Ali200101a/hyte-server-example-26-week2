// Model Layer - طبقة البيانات التي تتعامل مع تخزين واسترجاع المعلومات
// في هذا المشروع، نستخدم in-memory storage (مصفوفة في الذاكرة) بدلاً من قاعدة بيانات حقيقية
// ملاحظة: البيانات ستُفقد عند إعادة تشغيل السيرفر
let users = [
  { id: 1, username: 'johndoe', password: 'password1', email: 'johndoe@example.com' },
  { id: 2, username: 'janedoe', password: 'password2', email: 'janedoe@example.com' },
  { id: 3, username: 'bobsmith', password: 'password3', email: 'bobsmith@example.com' },
];

// دالة مساعدة لإزالة كلمة المرور من كائن المستخدم قبل إرساله للـ client
// استخدام destructuring لفصل password عن باقي البيانات
const safeUser = (user) => {
  const { password, ...withoutPassword } = user;
  return withoutPassword; // إرجاع المستخدم بدون حقل password (أمان)
};

// إحضار جميع المستخدمين من المصفوفة - استخدام map لتطبيق safeUser على كل عنصر
const listAllUsers = async () => users.map(safeUser);

// البحث عن مستخدم واحد بناءً على ID - استخدام find للبحث في المصفوفة
const findUserById = async (id) => {
  const user = users.find((u) => u.id === id);
  return user ? safeUser(user) : null; // إرجاع null إذا لم يُعثر على المستخدم
};

// إضافة مستخدم جديد إلى المصفوفة
const addUser = async (data) => {
  // توليد ID جديد: إيجاد أكبر ID موجود وإضافة 1
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: newId, ...data }; // دمج ID مع البيانات المُرسلة
  users.push(newUser); // إضافة المستخدم الجديد إلى المصفوفة
  return safeUser(newUser); // إرجاع بدون كلمة المرور
};

// تحديث بيانات مستخدم موجود في المصفوفة
const updateUserById = async (id, data) => {
  const idx = users.findIndex((u) => u.id === id); // إيجاد موقع (index) المستخدم
  if (idx === -1) return null; // إرجاع null إذا لم يوجد
  users[idx] = { ...users[idx], ...data }; // دمج البيانات القديمة مع الجديدة (spread operator)
  return safeUser(users[idx]); // إرجاع البيانات المحدثة بدون password
};

// حذف مستخدم من المصفوفة
const deleteUserById = async (id) => {
  const idx = users.findIndex((u) => u.id === id); // البحث عن موقع المستخدم
  if (idx === -1) return false; // إرجاع false إذا لم يكن موجوداً
  users.splice(idx, 1); // حذف المستخدم من المصفوفة باستخدام splice
  return true; // إرجاع true عند نجاح الحذف
};

export { listAllUsers, findUserById, addUser, updateUserById, deleteUserById };