import { useState, useEffect } from 'react';
import { Play, BookOpen, Clock, CheckCircle, Lock, FileText, Video, Download } from 'lucide-react';

const COMMON_MODULES = [
  {
    id: 'm1',
    title: 'Module 1: Introduction to NSTP',
    description: 'Understanding the National Service Training Program, its history, and objectives',
    hours: 3,
    sections: [
      { id: 's1', type: 'video', title: 'NSTP History and Legal Basis', duration: '15 min' },
      { id: 's2', type: 'reading', title: 'NSTP Components Overview', duration: '20 min' },
      { id: 's3', type: 'lesson', title: 'Program Objectives and Expected Outcomes', duration: '25 min' }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2: Citizenship Training',
    description: 'Rights, responsibilities, and duties of Filipino citizens',
    hours: 3,
    sections: [
      { id: 's1', type: 'video', title: 'Philippine Constitution and Citizenship', duration: '18 min' },
      { id: 's2', type: 'reading', title: 'Bill of Rights and Human Rights', duration: '22 min' },
      { id: 's3', type: 'lesson', title: 'Civic Duties and Responsibilities', duration: '20 min' }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3: Community Development',
    description: 'Principles and practices of community engagement and development',
    hours: 4,
    sections: [
      { id: 's1', type: 'lesson', title: 'Community Needs Assessment', duration: '25 min' },
      { id: 's2', type: 'video', title: 'Participatory Development Approaches', duration: '20 min' },
      { id: 's3', type: 'reading', title: 'Project Planning and Implementation', duration: '30 min' }
    ]
  },
  {
    id: 'm4',
    title: 'Module 4: Leadership and Team Building',
    description: 'Developing leadership skills and collaborative teamwork',
    hours: 3,
    sections: [
      { id: 's1', type: 'video', title: 'Leadership Styles and Theories', duration: '20 min' },
      { id: 's2', type: 'lesson', title: 'Effective Communication Skills', duration: '25 min' },
      { id: 's3', type: 'reading', title: 'Team Dynamics and Collaboration', duration: '15 min' }
    ]
  },
  {
    id: 'm5',
    title: 'Module 5: Disaster Risk Reduction',
    description: 'Preparedness, response, and recovery from disasters',
    hours: 4,
    sections: [
      { id: 's1', type: 'video', title: 'Types of Disasters and Hazards', duration: '18 min' },
      { id: 's2', type: 'lesson', title: 'Emergency Response Protocols', duration: '27 min' },
      { id: 's3', type: 'reading', title: 'Community-Based DRR Planning', duration: '20 min' }
    ]
  },
  {
    id: 'm6',
    title: 'Module 6: Health and Wellness',
    description: 'Promoting health awareness and wellness in communities',
    hours: 3,
    sections: [
      { id: 's1', type: 'lesson', title: 'Public Health Fundamentals', duration: '20 min' },
      { id: 's2', type: 'video', title: 'Disease Prevention and Control', duration: '22 min' },
      { id: 's3', type: 'reading', title: 'Mental Health Awareness', duration: '18 min' }
    ]
  },
  {
    id: 'm7',
    title: 'Module 7: Environmental Conservation',
    description: 'Understanding environmental issues and sustainable practices',
    hours: 3,
    sections: [
      { id: 's1', type: 'video', title: 'Climate Change and Environmental Challenges', duration: '20 min' },
      { id: 's2', type: 'lesson', title: 'Waste Management and Recycling', duration: '23 min' },
      { id: 's3', type: 'reading', title: 'Sustainable Development Goals', duration: '17 min' }
    ]
  },
  {
    id: 'm8',
    title: 'Module 8: Final Project and Reflection',
    description: 'Integrating learning through community service projects',
    hours: 2,
    sections: [
      { id: 's1', type: 'lesson', title: 'Community Service Planning', duration: '30 min' },
      { id: 's2', type: 'reading', title: 'Reflection and Documentation', duration: '15 min' }
    ]
  }
];

export default function ModulesPage({ user }) {
  const [progress, setProgress] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(`progress-${user.id}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, [user.id]);

  const completeSection = (moduleId, sectionId) => {
    const newProgress = {
      ...progress,
      [moduleId]: {
        ...progress[moduleId],
        [sectionId]: true
      }
    };
    setProgress(newProgress);
    localStorage.setItem(`progress-${user.id}`, JSON.stringify(newProgress));
  };

  const getModuleProgress = (module) => {
    const completed = module.sections.filter(s => progress[module.id]?.[s.id]).length;
    return Math.round((completed / module.sections.length) * 100);
  };

  const isModuleUnlocked = (moduleIndex) => {
    if (moduleIndex === 0) return true;
    const prevModule = COMMON_MODULES[moduleIndex - 1];
    return getModuleProgress(prevModule) === 100;
  };

  const totalHours = COMMON_MODULES.reduce((acc, m) => acc + (getModuleProgress(m) === 100 ? m.hours : 0), 0);

  if (selectedModule) {
    return (
      <div className="size-full overflow-auto bg-slate-50">
        <div className="max-w-5xl mx-auto p-8">
          <button
            onClick={() => setSelectedModule(null)}
            className="text-blue-600 hover:text-blue-700 mb-6 flex items-center gap-2"
          >
            ← Back to Modules
          </button>

          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">{selectedModule.title}</h1>
            <p className="text-slate-600 mb-4">{selectedModule.description}</p>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedModule.hours} hours
              </span>
              <span>{selectedModule.sections.length} sections</span>
              <span>{getModuleProgress(selectedModule)}% complete</span>
            </div>
          </div>

          <div className="space-y-4">
            {selectedModule.sections.map((section) => {
              const isCompleted = progress[selectedModule.id]?.[section.id];
              const Icon = section.type === 'video' ? Video : section.type === 'reading' ? BookOpen : FileText;

              return (
                <div key={section.id} className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-slate-100'}`}>
                        <Icon className={`w-5 h-5 ${isCompleted ? 'text-green-600' : 'text-slate-600'}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{section.title}</h3>
                        <p className="text-sm text-slate-600">{section.duration}</p>
                      </div>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-slate-600 mb-3">
                      {section.type === 'video' && 'Watch the instructional video to learn about this topic.'}
                      {section.type === 'reading' && 'Read the learning materials and documentation provided.'}
                      {section.type === 'lesson' && 'Complete the interactive lesson and activities.'}
                    </p>
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600">Content would load here</span>
                    </div>
                  </div>

                  {!isCompleted && (
                    <button
                      onClick={() => completeSection(selectedModule.id, section.id)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-auto bg-slate-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-600">Contact Hours</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalHours}<span className="text-xl text-slate-600">/25</span></p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Modules Completed</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {COMMON_MODULES.filter(m => getModuleProgress(m) === 100).length}
              <span className="text-xl text-slate-600">/{COMMON_MODULES.length}</span>
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">Overall Progress</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Math.round((totalHours / 25) * 100)}%
            </p>
          </div>
        </div>

        {/* Module List */}
        <h2 className="text-xl font-bold text-slate-900 mb-4">Common Module (25 Hours)</h2>
        <div className="space-y-4">
          {COMMON_MODULES.map((module, index) => {
            const moduleProgress = getModuleProgress(module);
            const unlocked = isModuleUnlocked(index);

            return (
              <div
                key={module.id}
                className={`bg-white rounded-xl border border-slate-200 p-6 ${
                  unlocked ? 'cursor-pointer hover:shadow-lg transition-shadow' : 'opacity-60'
                }`}
                onClick={() => unlocked && setSelectedModule(module)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{module.title}</h3>
                      {!unlocked && <Lock className="w-4 h-4 text-slate-400" />}
                      {moduleProgress === 100 && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.hours} hours
                      </span>
                      <span>{module.sections.length} sections</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-slate-100 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600">{moduleProgress}% complete</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
