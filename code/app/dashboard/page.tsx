'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NavHeader } from '@/components/nav-header';
import { BookOpen, CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import { getCurrentUser, getStudentProgress } from '@/lib/storage';
import { levels, topics } from '@/lib/data';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.type !== 'student') {
      router.push('/login');
      return;
    }
    
    setUser(currentUser);
    const studentProgress = getStudentProgress(currentUser.id);
    setProgress(studentProgress);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>;
  }

  const completedTopics = progress.filter(p => p.completed).length;
  const totalTopics = topics.length;
  const progressPercentage = (completedTopics / totalTopics) * 100;

  const isTopicUnlocked = (topicOrder: number, levelId: string) => {
    if (topicOrder === 1) return true;
    
    const previousTopic = topics.find(t => t.levelId === levelId && t.order === topicOrder - 1);
    if (!previousTopic) return false;
    
    return progress.some(p => p.topicId === previousTopic.id && p.completed);
  };

  const getTopicProgress = (topicId: string) => {
    return progress.find(p => p.topicId === topicId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Tu Progreso General</h2>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Temas completados</span>
              <span className="font-bold">{completedTopics} / {totalTopics}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <p className="text-indigo-100 mt-2">
            ¡Has completado el {Math.round(progressPercentage)}% del curso!
          </p>
        </Card>

        {/* Levels and Topics */}
        {levels.map((level) => {
          const levelTopics = topics.filter(t => t.levelId === level.id);
          const levelCompleted = levelTopics.filter(t => progress.some(p => p.topicId === t.id && p.completed)).length;

          return (
            <div key={level.id} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">
                  {level.id === 'beginner' && '📚'}
                  {level.id === 'intermediate' && '🎯'}
                  {level.id === 'advanced' && '🏆'}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{level.name}</h3>
                  <p className="text-gray-600">{level.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {levelCompleted} de {levelTopics.length} temas completados
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {levelTopics.map((topic) => {
                  const topicProgress = getTopicProgress(topic.id);
                  const isUnlocked = isTopicUnlocked(topic.order, level.id);
                  const isCompleted = topicProgress?.completed || false;

                  return (
                    <Card
                      key={topic.id}
                      className={`p-5 transition-all ${
                        isCompleted
                          ? 'bg-green-50 border-green-200'
                          : isUnlocked
                          ? 'hover:shadow-lg cursor-pointer'
                          : 'bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : isUnlocked ? (
                            <PlayCircle className="w-6 h-6 text-indigo-600" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1">{topic.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{topic.description}</p>
                          
                          {topicProgress && (
                            <div className="text-xs text-gray-500 mb-3">
                              Último intento: {topicProgress.score}% - {topicProgress.attempts} intento(s)
                            </div>
                          )}

                          {isUnlocked ? (
                            <div className="flex gap-2">
                              <Button
                                asChild
                                size="sm"
                                variant={isCompleted ? "outline" : "default"}
                                className="flex-1"
                              >
                                <Link href={`/lesson/${topic.id}`}>
                                  <BookOpen className="w-4 h-4 mr-1" />
                                  {isCompleted ? 'Revisar' : 'Aprender'}
                                </Link>
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" disabled className="w-full">
                              Bloqueado
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
