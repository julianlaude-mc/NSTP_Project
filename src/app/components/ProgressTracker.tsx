import { useEffect, useState } from 'react';
import { TrendingUp, Award, Clock, Target, CheckCircle, BookOpen } from 'lucide-react';

export default function ProgressTracker({ user }) {
  const [progress, setProgress] = useState({});
  const [assessments, setAssessments] = useState({});

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${user.id}`);
    const savedAssessments = localStorage.getItem(`assessments-${user.id}`);

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedAssessments) setAssessments(JSON.parse(savedAssessments));
  }, [user.id]);

  const totalModules = 8;
  const totalContactHours = 25;
  const completedModules = Object.keys(progress).length;
  const completedAssessments = Object.keys(assessments).length;
  const averageScore = Object.keys(assessments).length > 0
    ? Math.round(Object.values(assessments).reduce((acc, r) => acc + r.score, 0) / Object.keys(assessments).length)
    : 0;

  const milestones = [
    { title: 'First Module Completed', completed: completedModules >= 1, icon: BookOpen },
    { title: '5 Assessments Passed', completed: completedAssessments >= 5, icon: CheckCircle },
    { title: '15 Contact Hours', completed: false, icon: Clock },
    { title: 'Midterm Exam Passed', completed: assessments['midterm']?.passed, icon: Award },
    { title: 'All Modules Completed', completed: completedModules === totalModules, icon: Target },
    { title: 'Final Exam Passed', completed: assessments['final']?.passed, icon: Award }
  ];

  return (
    <div className="size-full overflow-auto bg-slate-50">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Progress</h2>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-600">Modules</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {completedModules}<span className="text-xl text-slate-600">/{totalModules}</span>
            </p>
            <div className="mt-3 bg-slate-100 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(completedModules / totalModules) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Contact Hours</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Math.round((completedModules / totalModules) * totalContactHours)}
              <span className="text-xl text-slate-600">/{totalContactHours}</span>
            </p>
            <div className="mt-3 bg-slate-100 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(completedModules / totalModules) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">Assessments</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {completedAssessments}<span className="text-xl text-slate-600">/9</span>
            </p>
            <div className="mt-3 bg-slate-100 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${(completedAssessments / 9) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-slate-600">Avg Score</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {averageScore}<span className="text-xl text-slate-600">%</span>
            </p>
            <div className="mt-3 bg-slate-100 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all"
                style={{ width: `${averageScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Milestones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((milestone, idx) => {
              const Icon = milestone.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-4 rounded-lg border-2 ${
                    milestone.completed
                      ? 'border-green-200 bg-green-50'
                      : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    milestone.completed ? 'bg-green-600' : 'bg-slate-300'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      milestone.completed ? 'text-green-900' : 'text-slate-600'
                    }`}>
                      {milestone.title}
                    </p>
                  </div>
                  {milestone.completed && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {Object.entries(assessments)
              .slice(-5)
              .reverse()
              .map(([id, result]) => (
                <div key={id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className={`w-5 h-5 ${result.passed ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <p className="font-medium text-slate-900">Assessment Completed</p>
                      <p className="text-sm text-slate-600">
                        Score: {result.score}% • {new Date(result.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg ${
                    result.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <span className="text-xs font-semibold">
                      {result.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>
                </div>
              ))}
            {Object.keys(assessments).length === 0 && (
              <p className="text-center text-slate-500 py-8">No activity yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
