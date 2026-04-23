import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { BookOpen, GraduationCap, Users, BarChart3, Settings, LogOut, Play, FileText, CheckCircle, Clock } from 'lucide-react';
import LoginPage from './components/LoginPage';
import GeneralEducation from './components/GeneralEducation';
import EnrollmentPage from './components/EnrollmentPage';
import QualifyingExam from './components/QualifyingExam';
import PendingAssignment from './components/PendingAssignment';
import ModulesPage from './components/ModulesPage';
import AssessmentsPage from './components/AssessmentsPage';
import ProgressTracker from './components/ProgressTracker';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('modules');

  useEffect(() => {
    const savedUser = localStorage.getItem('nstpUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('nstpUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nstpUser');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Check student enrollment status
  const generalEducationComplete = user.generalEducationComplete || false;
  const preferredComponent = user.preferredComponent || null;
  const examTaken = user.examTaken || false;
  const componentAssigned = user.component || null;

  if (!generalEducationComplete && user.role === 'student') {
    return <GeneralEducation
      user={user}
      onComplete={() => {
        const updatedUser = { ...user, generalEducationComplete: true };
        setUser(updatedUser);
        localStorage.setItem('nstpUser', JSON.stringify(updatedUser));
      }}
    />;
  }

  if (generalEducationComplete && !preferredComponent && user.role === 'student') {
    return <EnrollmentPage
      user={user}
      onEnroll={(component) => {
        const updatedUser = { ...user, preferredComponent: component };
        setUser(updatedUser);
        localStorage.setItem('nstpUser', JSON.stringify(updatedUser));
      }}
    />;
  }

  if (preferredComponent && !examTaken && user.role === 'student') {
    return <QualifyingExam
      user={user}
      preferredComponent={preferredComponent}
      onComplete={(score) => {
        const updatedUser = { ...user, examTaken: true, examScore: score };
        setUser(updatedUser);
        localStorage.setItem('nstpUser', JSON.stringify(updatedUser));
      }}
    />;
  }

  if (examTaken && !componentAssigned && user.role === 'student') {
    return <PendingAssignment user={user} onAssign={(component) => {
      const updatedUser = { ...user, component };
      setUser(updatedUser);
      localStorage.setItem('nstpUser', JSON.stringify(updatedUser));
    }} />;
  }

  return (
    <div className="size-full flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900">NSTP Learning Management System</h1>
              <p className="text-sm text-slate-600">
                {user.component && `${user.component} Component`} {user.role === 'admin' && '• Administrator'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-600">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="size-full flex flex-col">
          {/* Navigation */}
          <div className="bg-white border-b border-slate-200 px-6">
            <TabsList className="flex gap-1">
              {user.role === 'student' && (
                <>
                  <TabsTrigger
                    value="modules"
                    className="flex items-center gap-2 px-4 py-3 text-slate-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 hover:text-slate-900 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Modules
                  </TabsTrigger>
                  <TabsTrigger
                    value="assessments"
                    className="flex items-center gap-2 px-4 py-3 text-slate-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 hover:text-slate-900 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Assessments
                  </TabsTrigger>
                  <TabsTrigger
                    value="progress"
                    className="flex items-center gap-2 px-4 py-3 text-slate-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 hover:text-slate-900 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Progress
                  </TabsTrigger>
                </>
              )}
              {user.role === 'admin' && (
                <TabsTrigger
                  value="admin"
                  className="flex items-center gap-2 px-4 py-3 text-slate-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 hover:text-slate-900 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Admin Dashboard
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {user.role === 'student' && (
              <>
                <TabsContent value="modules" className="size-full p-0">
                  <ModulesPage user={user} />
                </TabsContent>
                <TabsContent value="assessments" className="size-full p-0">
                  <AssessmentsPage user={user} />
                </TabsContent>
                <TabsContent value="progress" className="size-full p-0">
                  <ProgressTracker user={user} />
                </TabsContent>
              </>
            )}
            {user.role === 'admin' && (
              <TabsContent value="admin" className="size-full p-0">
                <AdminDashboard />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
