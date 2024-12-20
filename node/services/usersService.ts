// داده‌های نمونه کاربران
const users = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
];

// دریافت تمام کاربران
const getAllUsers = () => {
  return users;
};

// دریافت یک کاربر بر اساس شناسه
const getUserById = (id: number) => {
  return users.find(user => user.id === id);
};

export default { getAllUsers, getUserById };
