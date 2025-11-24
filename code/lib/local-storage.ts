// Sistema de almacenamiento local para estudiantes y progreso

export interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Level {
  id: number;
  name: string;
  description: string;
}

export interface Topic {
  id: number;
  levelId: number;
  order: number;
  title: string;
  description: string;
}

export interface Lesson {
  id: number;
  topicId: number;
  title: string;
  content: string;
  examples: Array<{ text: string; explanation: string }>;
}

export interface Quiz {
  id: number;
  topicId: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudentProgress {
  studentId: string;
  topicId: number;
  completed: boolean;
  score: number | null;
  completedAt: string | null;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: number;
  topicId: number;
  score: number;
  totalQuestions: number;
  answers: number[];
  attemptedAt: string;
}

// Inicializar datos base
export function initializeData() {
  if (typeof window === 'undefined') return;
  
  // Crear admin por defecto si no existe
  const students = getStudents();
  if (students.length === 0) {
    const adminStudent: Student = {
      id: 'admin-001',
      name: 'Administrador',
      email: 'admin@english.com',
      password:
