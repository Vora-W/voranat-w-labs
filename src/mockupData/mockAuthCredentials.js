/**
 * Mock credentials สำหรับ demo / development
 * ใช้ใน validation ตอน login/signup (แทนการเรียก API จริง)
 * ตอนต่อ API จริง ให้เปลี่ยน validation ให้เรียก API แทน
 */

/** อีเมลที่ถือว่ามีในระบบแล้ว (สำหรับ demo login) */
export const MOCK_EXISTING_EMAILS = [
  "moodeng.cute@gmail.com",
  "test@example.com",
];

/** รหัสผ่านที่ถือว่าถูกต้อง (สำหรับ demo login) */
export const MOCK_CORRECT_PASSWORDS = [
  "123456",
  "123456789",
  "password",
  "222222",
];
