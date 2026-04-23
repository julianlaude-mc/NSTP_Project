import { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Settings, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const COMPONENTS = ['CWTS', 'LTS', 'MTS (Army)', 'MTS (Navy)'];

export default function ComponentAssignment() {
  const [examResults, setExamResults] = useState([]);
  const [slotLimits, setSlotLimits] = useState({
    'CWTS': 600,
    'LTS': 400,
    'MTS (Army)': 300,
    'MTS (Navy)': 200
  });
  const [assignments, setAssignments] = useState({});
  const [selectedComponent, setSelectedComponent] = useState('all');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = () => {
    const results = JSON.parse(localStorage.getItem('qualifyingExamResults') || '[]');
    setExamResults(results);
  };

  const handleSlotChange = (component, value) => {
    setSlotLimits(prev => ({
      ...prev,
      [component]: parseInt(value) || 0
    }));
  };

  const assignComponents = () => {
    // Sort all students by score (highest first)
    const sortedResults = [...examResults].sort((a, b) => b.score - a.score);

    // Track slots filled per component
    const slotsUsed = {
      'CWTS': 0,
      'LTS': 0,
      'MTS (Army)': 0,
      'MTS (Navy)': 0
    };

    const newAssignments = {};
    const unassigned = [];

    // First pass: assign students to their preferred components if slots available
    sortedResults.forEach(result => {
      const preferred = result.preferredComponent;

      if (slotsUsed[preferred] < slotLimits[preferred]) {
        newAssignments[result.userId] = {
          ...result,
          assignedComponent: preferred,
          rank: slotsUsed[preferred] + 1,
          status: 'assigned-preferred'
        };
        slotsUsed[preferred]++;
      } else {
        unassigned.push(result);
      }
    });

    // Second pass: assign remaining students to components with vacancies
    unassigned.forEach(result => {
      // Find component with available slots
      const availableComponent = COMPONENTS.find(comp => slotsUsed[comp] < slotLimits[comp]);

      if (availableComponent) {
        newAssignments[result.userId] = {
          ...result,
          assignedComponent: availableComponent,
          rank: slotsUsed[availableComponent] + 1,
          status: 'assigned-alternative'
        };
        slotsUsed[availableComponent]++;
      } else {
        newAssignments[result.userId] = {
          ...result,
          assignedComponent: null,
          status: 'waitlisted'
        };
      }
    });

    setAssignments(newAssignments);

    // Save assignments back to localStorage
    const updatedResults = examResults.map(result => ({
      ...result,
      assignedComponent: newAssignments[result.userId]?.assignedComponent,
      rank: newAssignments[result.userId]?.rank,
      status: newAssignments[result.userId]?.status
    }));
    localStorage.setItem('qualifyingExamResults', JSON.stringify(updatedResults));
  };

  const getComponentStats = (component) => {
    const preferred = examResults.filter(r => r.preferredComponent === component);
    const assigned = Object.values(assignments).filter(a => a.assignedComponent === component);
    const limit = slotLimits[component];

    return {
      preferred: preferred.length,
      assigned: assigned.length,
      limit,
      available: limit - assigned.length,
      avgScore: assigned.length > 0
        ? Math.round(assigned.reduce((sum, a) => sum + a.score, 0) / assigned.length)
        : 0
    };
  };

  const filteredResults = selectedComponent === 'all'
    ? examResults
    : examResults.filter(r => r.preferredComponent === selectedComponent);

  const sortedFiltered = [...filteredResults].sort((a, b) => b.score - a.score);

  return (
    <div className="size-full overflow-auto bg-slate-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Component Assignment & Ranking</h2>
          <button
            onClick={assignComponents}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Assign Components
          </button>
        </div>

        {/* Slot Configuration */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-slate-600" />
            <h3 className="font-semibold text-slate-900">Component Slot Limits</h3>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {COMPONENTS.map(component => (
              <div key={component}>
                <label className="block text-sm font-medium text-slate-700 mb-2">{component}</label>
                <input
                  type="number"
                  value={slotLimits[component]}
                  onChange={(e) => handleSlotChange(component, e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Component Statistics */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {COMPONENTS.map(component => {
            const stats = getComponentStats(component);
            return (
              <div key={component} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-3">{component}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Preferred:</span>
                    <span className="font-semibold text-slate-900">{stats.preferred}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Assigned:</span>
                    <span className="font-semibold text-blue-600">{stats.assigned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Limit:</span>
                    <span className="font-semibold text-slate-900">{stats.limit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Available:</span>
                    <span className={`font-semibold ${stats.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stats.available}
                    </span>
                  </div>
                  {stats.assigned > 0 && (
                    <div className="flex justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-600">Avg Score:</span>
                      <span className="font-semibold text-purple-600">{stats.avgScore}%</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${stats.assigned > stats.limit ? 'bg-red-600' : 'bg-blue-600'}`}
                    style={{ width: `${Math.min((stats.assigned / stats.limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Rankings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-slate-900">Student Rankings & Assignments</h3>
            <select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Components</option>
              {COMPONENTS.map(comp => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Score</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Preferred</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Assigned</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedFiltered.map((result, idx) => {
                  const assignment = assignments[result.userId];
                  const isPriority = idx < slotLimits[result.preferredComponent];

                  return (
                    <tr key={result.userId} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-900">#{idx + 1}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-slate-900">{result.userName}</p>
                          <p className="text-sm text-slate-600">{result.userEmail}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-600" />
                          <span className="font-semibold text-slate-900">{result.score}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                          {result.preferredComponent}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {assignment?.assignedComponent ? (
                          <div className="flex items-center gap-2">
                            {assignment.assignedComponent !== result.preferredComponent && (
                              <ArrowRight className="w-4 h-4 text-orange-600" />
                            )}
                            <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium ${
                              assignment.assignedComponent === result.preferredComponent
                                ? 'bg-green-100 text-green-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}>
                              {assignment.assignedComponent}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-slate-400">Not assigned</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {assignment ? (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium ${
                            assignment.status === 'assigned-preferred'
                              ? 'bg-green-100 text-green-700'
                              : assignment.status === 'assigned-alternative'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {assignment.status === 'assigned-preferred' && <CheckCircle className="w-4 h-4" />}
                            {assignment.status === 'assigned-alternative' && <AlertCircle className="w-4 h-4" />}
                            {assignment.status === 'assigned-preferred' ? 'Preferred' :
                             assignment.status === 'assigned-alternative' ? 'Reassigned' :
                             'Waitlisted'}
                          </span>
                        ) : isPriority ? (
                          <span className="text-sm text-green-600 font-medium">Priority</span>
                        ) : (
                          <span className="text-sm text-slate-500">Pending</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
