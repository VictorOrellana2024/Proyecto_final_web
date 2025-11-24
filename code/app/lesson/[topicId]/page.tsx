'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NavHeader } from '@/components/nav-header';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/storage';
import { topics, lessons, quizzes } from '@/lib/data';

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const topicId = params.topicId as string;
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.type !== 'student') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Cargando...</div>;
  }

  const topic = topics.find(t => t.id === topicId);
  const lesson = lessons[topicId];
  const quiz = quizzes[topicId];

  if (!topic || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavHeader />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <p className="text-gray-600">Lección no encontrada</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard">Volver al Dashboard</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Link>
        </Button>

        <Card className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
            <p className="text-gray-600">{topic.description}</p>
          </div>

          <div className="prose max-w-none mb-8">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {lesson.content}
            </div>
          </div>

          {lesson.examples && lesson.examples.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ejemplos</h3>
              <div className="space-y-4">
                {lesson.examples.map((example, idx) => (
                  <Card key={idx} className="p-4 bg-blue-50 border-blue-200">
                    <p className="font-mono text-blue-900 mb-2">{example.text}</p>
                    <p className="text-sm text-blue-700">{example.explanation}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {quiz ? (
            <div className="pt-6 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    ¿Listo para el examen?
                  </h3>
                  <p className="text-gray-600">
                    Pon a prueba tus conocimientos con {quiz.questions.length} preguntas
                  </p>
                </div>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <Link href={`/quiz/${topicId}`}>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Tomar Examen
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="pt-6 border-t">
              <p className="text-gray-500 text-center">No hay examen disponible para este tema</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
