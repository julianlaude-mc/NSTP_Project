import { useEffect, useState } from 'react';
import { Clock, Award, AlertCircle } from 'lucide-react';

export default function PendingAssignment({ user, onAssign }) {
  const [examResult, setExamResult] = useState(null);

  useEffect(() => {
    const result = localStorage.getItem(`examResult-${user.id}`);
    if (result) {
      setExamResult(JSON.parse(result));
    }

    // Check if admin has assigned component
    const checkAssignment = setInterval(() => {
      const allResults = JSON.parse(localStorage.getItem('qualifyingExamResults') || '[]');
      const userResult = allResults.find(r => r.userId === user.id);

      if (userResult && userResult.assignedComponent) {
        onAssign(userResult.assignedComponent);
      }
    }, 2000);

    return () => clearInterval(checkAssignment);
  }, [user.id, onAssign]);

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-2xl w-full p-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Clock className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Awaiting Component Assignment</h2>
            <p className="text-slate-600">
              The NSTP Coordinator is reviewing all qualifying exam results and will assign components based on rankings.
            </p>
          </div>

          {examResult && (
            <div className="space-y-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Your Score</p>
                    <div className="flex items-baseline gap-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <p className="text-3xl font-bold text-slate-900">{examResult.score}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Preferred Component</p>
                    <p className="text-xl font-semibold text-slate-900">{examResult.preferredComponent}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">What happens next?</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>All students are ranked by their qualifying exam scores</li>
                      <li>Top scorers in each component get priority enrollment</li>
                      <li>If your preferred component is full, you'll be assigned to a component with vacancies</li>
                      <li>You'll be notified automatically when assignments are complete</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-slate-500">
              This page will automatically update when your component has been assigned.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
