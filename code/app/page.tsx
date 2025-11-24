import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Target, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-6 text-balance">
            Master English at Your Own Pace
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty">
            Learn English through structured lessons, interactive exercises, and personalized progress tracking. 
            From beginner to advanced, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8">
              <Link href="/register">Start Learning Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-indigo-600 text-indigo-600 hover:bg-indigo-50">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">3 Learning Levels</h3>
            <p className="text-gray-600">
              Progress from beginner to advanced with carefully structured content
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">21 Topics</h3>
            <p className="text-gray-600">
              7 topics per level covering grammar, vocabulary, and real-world usage
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Interactive Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with quizzes after each lesson
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your learning journey and celebrate achievements
            </p>
          </div>
        </div>

        {/* Levels Preview */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">
            Your Learning Path
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Beginner</h3>
              <p className="text-gray-600 mb-4">
                Build a solid foundation with basic grammar, vocabulary, and sentence structures
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Present Simple Tense</li>
                <li>• Basic Vocabulary</li>
                <li>• Question Formation</li>
                <li>• And 4 more topics...</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-500">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Intermediate</h3>
              <p className="text-gray-600 mb-4">
                Enhance your skills with complex structures and natural conversations
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Past Tenses</li>
                <li>• Conditional Sentences</li>
                <li>• Phrasal Verbs</li>
                <li>• And 4 more topics...</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Advanced</h3>
              <p className="text-gray-600 mb-4">
                Master sophisticated English for professional and academic success
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Advanced Grammar</li>
                <li>• Idiomatic Expressions</li>
                <li>• Business English</li>
                <li>• And 4 more topics...</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center bg-indigo-900 text-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join thousands of learners improving their English every day
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 text-lg px-8">
            <Link href="/register">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
