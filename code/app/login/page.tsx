'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';
import { getStudentByEmail, getAdminByEmail, setCurrentUser, initializeStorage } from '@/lib/storage';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    initializeStorage();
  }, []);

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const student = getStudentByEmail(studentEmail);
    
    if (!student) {
      toast.error('Estudiante no encontrado');
      return;
    }
    
    if (student.password !== studentPassword) {
      toast.error('Contraseña incorrecta');
      return;
    }

    setCurrentUser({ type: 'student', id: student.id, email: student.email });
    toast.success('Bienvenido ' + student.name);
    router.push('/dashboard');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const admin = getAdminByEmail(adminEmail);
    
    if (!admin) {
      toast.error('Admin no encontrado');
      return;
    }
    
    if (admin.password !== adminPassword) {
      toast.error('Contraseña incorrecta');
      return;
    }

    setCurrentUser({ type: 'admin', id: admin.id, email: admin.email });
    toast.success('Bienvenido Admin');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">English Learning Platform</h1>
          <p className="text-gray-600">Inicia sesión para continuar aprendiendo</p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="student">Estudiante</TabsTrigger>
            <TabsTrigger value="admin">Administrador</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card className="p-6">
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div>
                  <Label htmlFor="student-email">Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-password">Contraseña</Label>
                  <Input
                    id="student-password"
                    type="password"
                    placeholder="••••••••"
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                  Iniciar Sesión
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">¿No tienes cuenta? </span>
                <Link href="/register" className="text-indigo-600 hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card className="p-6">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@admin.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="admin-password">Contraseña</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Acceso Admin
                </Button>
              </form>
              <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-900">
                  <strong>Credenciales por defecto:</strong><br />
                  Email: admin@admin.com<br />
                  Password: admin123
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-indigo-600">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
