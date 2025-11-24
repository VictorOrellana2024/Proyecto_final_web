'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { NavHeader } from '@/components/nav-header';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import { getCurrentUser, getStudents, getProgress } from '@/lib/storage';
import { topics, levels } from '@/lib/data';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [allProgress, setAllProgress] = useState<any[]>([]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.type !== 'admin') {
      router.push('/login');
      return;
    }

    const studentsList = getStudents();
    const progressList = getProgress();
    setStudents(studentsList);
    setAllProgress(progressList);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>;
  }

  const totalTopics = topics.length;
  const totalCompletions = allProgress.filter(p => p.completed).length;
  const averageScore = allProgress.length > 0 
    ? Math.round(allProgress.reduce((sum, p) => sum + p.score, 0) / allProgress.length)
    : 0;

  const getStudentProgress = (studentId: string) => {
    const studentProgress = allProgress.filter(p => p.studentId === studentId);
    const completed = studentProgress.filter(p => p.completed).length;
    const percentage = (completed / totalTopics) * 100;
    const avgScore = studentProgress.length > 0
      ? Math.round(studentProgress.reduce((sum, p) => sum + p.score, 0) / studentProgress.length)
      : 0;
    
    return { completed, percentage, avgScore, totalAttempts: studentProgress.length };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Monitorea el progreso de todos los estudiantes</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Temas Totales</p>
                <p className="text-2xl font-bold text-gray-900">{totalTopics}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completados</p>
                <p className="text-2xl font-bold text-gray-900">{totalCompletions}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Promedio General</p>
                <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Students List */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Progreso de Estudiantes</h2>
          
          {students.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hay estudiantes registrados aún</p>
            </div>
          ) : (
            <div className="space-y-6">
              {students.map((student) => {
                const progress = getStudentProgress(student.id);
                
                return (
                  <Card key={student.id} className="p-6 bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Registrado: {new Date(student.createdAt).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-indigo-600 mb-1">
                          {progress.avgScore}%
                        </div>
                        <p className="text-xs text-gray-600">Promedio</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progreso del curso</span>
                        <span>{progress.completed} / {totalTopics} temas</span>
                      </div>
                      <Progress value={progress.percentage} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Completados</p>
                        <p className="font-semibold text-gray-900">{progress.completed}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Intentos</p>
                        <p className="font-semibold text-gray-900">{progress.totalAttempts}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Completado</p>
                        <p className="font-semibold text-gray-900">{Math.round(progress.percentage)}%</p>
                      </div>
                    </div>

                    {/* Progress by Level */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-3">Progreso por nivel:</p>
                      <div className="grid grid-cols-3 gap-3">
                        {levels.map((level) => {
                          const levelTopics = topics.filter(t => t.levelId === level.id);
                          const levelProgress = allProgress.filter(p => 
                            p.studentId === student.id && 
                            levelTopics.some(t => t.id === p.topicId) && 
                            p.completed
                          ).length;
                          const levelPercentage = (levelProgress / levelTopics.length) * 100;

                          return (
                            <div key={level.id} className="bg-white p-3 rounded-lg">
                              <p className="text-xs text-gray-600 mb-1">{level.name}</p>
                              <Progress value={levelPercentage} className="h-1.5 mb-1" />
                              <p className="text-xs font-medium text-gray-900">
                                {levelProgress}/{levelTopics.length}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
