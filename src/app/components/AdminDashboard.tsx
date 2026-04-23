import { useState, useEffect } from 'react';
import { Users, BookOpen, TrendingUp, Award, Search, Filter, ClipboardList } from 'lucide-react';
import ComponentAssignment from './ComponentAssignment';

const MOCK_STUDENTS = [
  { id: '1', name: 'Maria Santos', email: 'maria.santos@university.edu', component: 'CWTS', progress: 85, assessments: 7 },
  { id: '2', name: 'Juan Dela Cruz', email: 'juan.delacruz@university.edu', component: 'LTS', progress: 92, assessments: 8 },
  { id: '3', name: 'Anna Reyes', email: 'anna.reyes@university.edu', component: 'MTS (Army)', progress: 68, assessments: 5 },
  { id: '4', name: 'Carlos Garcia', email: 'carlos.garcia@university.edu', component: 'MTS (Navy)', progress: 78, assessments: 6 },
  { id: '5', name: 'Sofia Rodriguez', email: 'sofia.rodriguez@university.edu', component: 'CWTS', progress: 95, assessments: 9 },
  { id: '6', name: 'Miguel Torres', email: 'miguel.torres@university.edu', component: 'LTS', progress: 72, assessments: 6 },
];

export default function AdminDashboard() {
  const [view, setView] = useState('students'); // 'students' or 'assignments'
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const totalStudents = students.length;
  const avgProgress = Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length);
  const completionRate = Math.round((students.filter(s => s.progress === 100).length / totalStudents) * 100);

  const componentCounts = {
    'CWTS': students.filter(s => s.component === 'CWTS').length,
    'LTS': students.filter(s => s.component === 'LTS').length,
    'MTS (Army)': students.filter(s => s.component === 'MTS (Army)').length,
    'MTS (Navy)': students.filter(s => s.component === 'MTS (Navy)').length,
  };

  const filteredStudents = students.filter(student => {
    const matchesFilter = filter === 'all' || student.component === filter;
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
                         student.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (view === 'assignments') {
    return (
      <div className="size-full flex flex-col bg-slate-50">
        <div className="bg-white border-b border-slate-200 px-8 py-4">
          <button
            onClick={() => setView('students')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <ComponentAssignment />
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-auto bg-slate-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
          <button
            onClick={() => setView('assignments')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <ClipboardList className="w-5 h-5" />
            Component Assignments
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-600">Total Students</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalStudents}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Avg Progress</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{avgProgress}%</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">Completion Rate</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{completionRate}%</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-slate-600">Active Modules</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">8</p>
          </div>
        </div>

        {/* Component Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <h3 className="font-semibold text-slate-900 mb-4">Student Distribution by Component</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(componentCounts).map(([component, count]) => (
              <div key={component} className="text-center">
                <p className="text-2xl font-bold text-slate-900">{count}</p>
                <p className="text-sm text-slate-600">{component}</p>
                <div className="mt-2 bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(count / totalStudents) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Student Management</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="all">All Components</option>
                <option value="CWTS">CWTS</option>
                <option value="LTS">LTS</option>
                <option value="MTS (Army)">MTS (Army)</option>
                <option value="MTS (Navy)">MTS (Navy)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Component</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Progress</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Assessments</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-sm text-slate-600">{student.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {student.component}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[120px]">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-900">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-slate-700">{student.assessments}/9</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium ${
                        student.progress === 100
                          ? 'bg-green-100 text-green-700'
                          : student.progress >= 70
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {student.progress === 100 ? 'Completed' : student.progress >= 70 ? 'On Track' : 'Needs Support'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
