import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, FileText, CheckCircle, Play, Lock, Award } from 'lucide-react';

const SEMINARS = [
  {
    id: 'sem1',
    title: 'Seminar 1: Introduction to National Service',
    speaker: 'Dr. Maria Elena Santos',
    position: 'NSTP Program Director',
    duration: 3,
    date: '2026-04-25',
    time: '9:00 AM - 12:00 PM',
    status: 'upcoming',
    description: 'Overview of NSTP, its legal basis, and the role of civic consciousness in nation-building.'
  },
  {
    id: 'sem2',
    title: 'Seminar 2: Philippine Constitution and Citizenship',
    speaker: 'Atty. Carlos Reyes',
    position: 'Constitutional Law Expert',
    duration: 3,
    date: '2026-04-26',
    time: '1:00 PM - 4:00 PM',
    status: 'scheduled',
    description: 'Understanding constitutional rights, duties, and responsibilities of Filipino citizens.'
  },
  {
    id: 'sem3',
    title: 'Seminar 3: Community Development Strategies',
    speaker: 'Engr. Ramon Torres',
    position: 'Community Development Specialist',
    duration: 3,
    date: '2026-04-28',
    time: '9:00 AM - 12:00 PM',
    status: 'scheduled',
    description: 'Participatory approaches to community needs assessment and sustainable development.'
  },
  {
    id: 'sem4',
    title: 'Seminar 4: Leadership and Ethics',
    speaker: 'Dr. Anna Marie Cruz',
    position: 'Leadership Development Coach',
    duration: 3,
    date: '2026-04-29',
    time: '2:00 PM - 5:00 PM',
    status: 'scheduled',
    description: 'Developing ethical leadership, effective communication, and team collaboration skills.'
  },
  {
    id: 'sem5',
    title: 'Seminar 5: Disaster Risk Reduction and Management',
    speaker: 'Col. Jose Villanueva (Ret.)',
    position: 'DRRM Coordinator',
    duration: 4,
    date: '2026-05-02',
    time: '8:00 AM - 12:00 PM',
    status: 'scheduled',
    description: 'Emergency preparedness, response protocols, and community-based disaster management.'
  },
  {
    id: 'sem6',
    title: 'Seminar 6: Public Health and Wellness',
    speaker: 'Dr. Sofia Mendoza',
    position: 'Public Health Officer',
    duration: 3,
    date: '2026-05-05',
    time: '1:00 PM - 4:00 PM',
    status: 'scheduled',
    description: 'Health promotion, disease prevention, and mental health awareness in communities.'
  },
  {
    id: 'sem7',
    title: 'Seminar 7: Environmental Conservation',
    speaker: 'Dr. Miguel Garcia',
    position: 'Environmental Scientist',
    duration: 3,
    date: '2026-05-07',
    time: '9:00 AM - 12:00 PM',
    status: 'scheduled',
    description: 'Climate change, waste management, and sustainable environmental practices.'
  },
  {
    id: 'sem8',
    title: 'Seminar 8: Service Learning and Reflection',
    speaker: 'Prof. Isabel Fernandez',
    position: 'Service Learning Coordinator',
    duration: 3,
    date: '2026-05-09',
    time: '2:00 PM - 5:00 PM',
    status: 'scheduled',
    description: 'Integrating learning with community service, reflection, and documentation.'
  }
];

export default function GeneralEducation({ user, onComplete }) {
  const [seminars, setSeminars] = useState([]);
  const [selectedSeminar, setSelectedSeminar] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const [assessmentActive, setAssessmentActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`seminars-${user.id}`);
    if (saved) {
      setSeminars(JSON.parse(saved));
    } else {
      setSeminars(SEMINARS);
    }
  }, [user.id]);

  const totalHours = seminars.reduce((acc, s) => acc + (s.completed ? s.duration : 0), 0);
  const completedCount = seminars.filter(s => s.completed).length;
  const canComplete = totalHours >= 25 && completedCount === SEMINARS.length;

  const joinSeminar = (seminar) => {
    setSelectedSeminar(seminar);
    setIsLive(true);
  };

  const startAssessment = () => {
    setIsLive(false);
    setAssessmentActive(true);
  };

  const completeAssessment = (score) => {
    const updatedSeminars = seminars.map(s =>
      s.id === selectedSeminar.id
        ? { ...s, completed: true, score, completedDate: new Date().toISOString() }
        : s
    );
    setSeminars(updatedSeminars);
    localStorage.setItem(`seminars-${user.id}`, JSON.stringify(updatedSeminars));
    setSelectedSeminar(null);
    setAssessmentActive(false);
  };

  // Live Seminar View
  if (isLive && selectedSeminar) {
    return (
      <div className="size-full flex flex-col bg-slate-900">
        {/* Video Area */}
        <div className="flex-1 flex items-center justify-center bg-slate-800 relative">
          <div className="text-center">
            <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="w-16 h-16 text-slate-400" />
            </div>
            <p className="text-white text-xl mb-2">{selectedSeminar.speaker}</p>
            <p className="text-slate-400">{selectedSeminar.position}</p>
            <div className="mt-6 flex items-center justify-center gap-2 text-red-500">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="font-semibold">LIVE</span>
            </div>
          </div>

          {/* Live indicator */}
          <div className="absolute top-4 left-4 bg-red-600 px-4 py-2 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-white font-semibold text-sm">LIVE SESSION</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-900 border-t border-slate-700 p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{selectedSeminar.title}</h2>
                <p className="text-slate-400">{selectedSeminar.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={startAssessment}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Proceed to Assessment
                </button>
                <button
                  onClick={() => {
                    setSelectedSeminar(null);
                    setIsLive(false);
                  }}
                  className="px-6 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Leave Session
                </button>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedSeminar.duration} hours
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {selectedSeminar.date}
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {selectedSeminar.speaker}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assessment View
  if (assessmentActive && selectedSeminar) {
    return (
      <div className="size-full overflow-auto bg-slate-50">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Assessment: {selectedSeminar.title}
            </h1>
            <p className="text-slate-600">
              Complete the assessment based on the seminar by {selectedSeminar.speaker}
            </p>
          </div>

          <div className="space-y-6 mb-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Question {num}: Sample question related to {selectedSeminar.title}
                </h3>
                <div className="space-y-3">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-slate-300 cursor-pointer"
                    >
                      <input type="radio" name={`q${num}`} className="w-4 h-4 text-blue-600" />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">
                Make sure to review all answers before submitting
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setAssessmentActive(false)}
                  className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => completeAssessment(Math.floor(Math.random() * 20) + 80)}
                  className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700"
                >
                  Submit Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Seminar Schedule View
  return (
    <div className="size-full overflow-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            General Education - 25 Contact Hours
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Complete all required seminars and assessments before selecting your NSTP component.
            Each seminar is conducted live by expert speakers.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-600">Hours Completed</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {totalHours}<span className="text-xl text-slate-600">/25</span>
            </p>
            <div className="mt-3 bg-slate-100 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(totalHours / 25) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Video className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Seminars Completed</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {completedCount}<span className="text-xl text-slate-600">/{SEMINARS.length}</span>
            </p>
            <div className="mt-3 bg-slate-100 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${(completedCount / SEMINARS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">Average Score</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {completedCount > 0
                ? Math.round(seminars.filter(s => s.completed).reduce((acc, s) => acc + s.score, 0) / completedCount)
                : 0}%
            </p>
          </div>
        </div>

        {/* Seminar Schedule */}
        <div className="space-y-4 mb-8">
          {seminars.map((seminar, index) => {
            const isLocked = index > 0 && !seminars[index - 1]?.completed;

            return (
              <div
                key={seminar.id}
                className={`bg-white rounded-xl border-2 p-6 ${
                  seminar.completed
                    ? 'border-green-200 bg-green-50'
                    : isLocked
                    ? 'border-slate-200 opacity-60'
                    : 'border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{seminar.title}</h3>
                      {seminar.completed && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {isLocked && <Lock className="w-4 h-4 text-slate-400" />}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{seminar.description}</p>

                    <div className="flex items-center gap-6 text-sm text-slate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {seminar.speaker}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {seminar.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {seminar.time} ({seminar.duration}h)
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">{seminar.position}</p>

                    {seminar.completed && (
                      <div className="mt-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">
                          Score: {seminar.score}% • Completed on {new Date(seminar.completedDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => !isLocked && !seminar.completed && joinSeminar(seminar)}
                    disabled={isLocked || seminar.completed}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      seminar.completed
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : isLocked
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {seminar.completed ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </>
                    ) : isLocked ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Locked
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Join Seminar
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Button */}
        {canComplete && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-slate-900">Congratulations!</h3>
            </div>
            <p className="text-slate-600 mb-6">
              You've completed all {SEMINARS.length} seminars totaling {totalHours} contact hours.
              You can now proceed to select your NSTP component.
            </p>
            <button
              onClick={onComplete}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
            >
              Proceed to Component Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
