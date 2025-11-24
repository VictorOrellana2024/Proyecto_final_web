'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { NavHeader } from '@/components/nav-header';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { getCurrentUser, updateProgress } from '@/lib/storage';
import { topics, quizzes } from '@/lib/data';

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.quizId as string;
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

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

  const topic = topics.find(t => t.id === quizId);
  const quiz = quizzes[quizId];

  if (!topic || !quiz) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavHeader />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <p className="text-gray-600">Examen no encontrado</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard">Volver al Dashboard</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const correctAnswers = quiz.questions.filter((q, idx) => q.correctAnswer === selectedAnswers[idx]).length;
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    updateProgress(user.id, quizId, score);
    setShowResults(true);
  };

  const calculateScore = () => {
    const correctAnswers = quiz.questions.filter((q, idx) => q.correctAnswer === selectedAnswers[idx]).length;
    return {
      correct: correctAnswers,
      total: quiz.questions.length,
      percentage: Math.round((correctAnswers / quiz.questions.length) * 100)
    };
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score.percentage >= 60;

    return (
      <div className="min-h-screen bg-gray-50">
        <NavHeader />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                passed ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                {passed ? (
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-orange-600" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {passed ? '¡Felicitaciones!' : '¡Sigue intentando!'}
              </h2>
              <p className="text-gray-600 mb-4">
                Obtuviste {score.correct} de {score.total} respuestas correctas
              </p>
              <div className="text-5xl font-bold text-indigo-600 mb-6">
                {score.percentage}%
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {quiz.questions.map((question, idx) => {
                const userAnswer = selectedAnswers[idx];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <Card key={idx} className={`p-6 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <div className="flex items-start gap-3 mb-4">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-2">
                          {idx + 1}. {question.question}
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Tu respuesta:</span> {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-medium">Respuesta correcta:</span> {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-2 italic">
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/lesson/${quizId}`}>Revisar Lección</Link>
              </Button>
              <Button asChild className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                <Link href="/dashboard">Volver al Dashboard</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allQuestionsAnswered = selectedAnswers.length === quiz.questions.length && 
    selectedAnswers.every(a => a !== undefined);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/lesson/${quizId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a la Lección
          </Link>
        </Button>

        <Card className="p-8">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pregunta {currentQuestion + 1} de {quiz.questions.length}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>

          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswers[currentQuestion] === idx
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === idx
                      ? 'border-indigo-600 bg-indigo-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === idx && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="flex-1"
            >
              Anterior
            </Button>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Enviar Examen
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              >
                Siguiente
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
