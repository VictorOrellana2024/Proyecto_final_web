'use client';

// Tipos para el almacenamiento local
export interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  email: string;
  password: string;
}

export interface Progress {
  studentId: string;
  topicId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: string;
}

// Claves para localStorage
const STUDENTS_KEY = 'english_app_students';
const ADMINS_KEY = 'english_app_admins';
const PROGRESS_KEY = 'english_app_progress';
const CURRENT_USER_KEY = 'english_app_current_user';

// Inicializar datos por defecto
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  // Crear admin por defecto si no existe
  const admins = getAdmins();
  if (admins.length === 0) {
    const defaultAdmin: Admin = {
      id: 'admin1',
      email: 'admin@admin.com',
      password: 'admin123',
    };
    localStorage.setItem(ADMINS_KEY, JSON.stringify([defaultAdmin]));
  }
}

// Funciones para estudiantes
export function getStudents(): Student[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STUDENTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function addStudent(student: Omit<Student, 'id' | 'createdAt'>): Student {
  const students = getStudents();
  const newStudent: Student = {
    ...student,
    id: `student_${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  students.push(newStudent);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  return newStudent;
}

export function getStudentByEmail(email: string): Student | undefined {
  return getStudents().find(s => s.email === email);
}

// Funciones para admins
export function getAdmins(): Admin[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(ADMINS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getAdminByEmail(email: string): Admin | undefined {
  return getAdmins().find(a => a.email === email);
}

// Funciones para progreso
export function getProgress(): Progress[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : [];
}

export function getStudentProgress(studentId: string): Progress[] {
  return getProgress().filter(p => p.studentId === studentId);
}

export function updateProgress(studentId: string, topicId: string, score: number) {
  const allProgress = getProgress();
  const existingIndex = allProgress.findIndex(
    p => p.studentId === studentId && p.topicId === topicId
  );

  const newProgress: Progress = {
    studentId,
    topicId,
    completed: score >= 60,
    score,
    attempts: existingIndex >= 0 ? allProgress[existingIndex].attempts + 1 : 1,
    lastAttempt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    allProgress[existingIndex] = newProgress;
  } else {
    allProgress.push(newProgress);
  }

  localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
}

// Funciones para usuario actual
export function getCurrentUser(): { type: 'student' | 'admin'; id: string; email: string } | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: { type: 'student' | 'admin'; id: string; email: string }) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
