import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock, Award, AlertCircle } from 'lucide-react';

const ASSESSMENTS = [
  {
    id: 'q1',
    type: 'quiz',
    title: 'Module 1 Quiz: Introduction to NSTP',
    moduleId: 'm1',
    questions: 10,
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'q2',
    type: 'quiz',
    title: 'Module 2 Quiz: Citizenship Training',
    moduleId: 'm2',
    questions: 10,
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'q3',
    type: 'quiz',
    title: 'Module 3 Quiz: Community Development',
    moduleId: 'm3',
    questions: 12,
    passingScore: 70,
    timeLimit: 20
  },
  {
    id: 'q4',
    type: 'quiz',
    title: 'Module 4 Quiz: Leadership',
    moduleId: 'm4',
    questions: 10,
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'midterm',
    type: 'exam',
    title: 'Midterm Examination',
    moduleId: 'm4',
    questions: 50,
    passingScore: 75,
    timeLimit: 90
  },
  {
    id: 'q5',
    type: 'quiz',
    title: 'Module 5 Quiz: Disaster Risk Reduction',
    moduleId: 'm5',
    questions: 12,
    passingScore: 70,
    timeLimit: 20
  },
  {
    id: 'q6',
    type: 'quiz',
    title: 'Module 6 Quiz: Health and Wellness',
    moduleId: 'm6',
    questions: 10,
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'q7',
    type: 'quiz',
    title: 'Module 7 Quiz: Environmental Conservation',
    moduleId: 'm7',
    questions: 10,
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'final',
    type: 'exam',
    title: 'Final Examination',
    moduleId: 'm8',
    questions: 75,
    passingScore: 75,
    timeLimit: 120
  }
];

const SAMPLE_QUESTIONS = [
  {
    question: 'What does NSTP stand for?',
    options: [
      'National Service Training Program',
      'National Student Training Program',
      'National Security Training Program',
      'National Service Teaching Program'
    ],
    correct: 0
  },
  {
    question: 'How many components does NSTP have?',
    options: ['2', '3', '4', '5'],
    correct: 1
  },
  {
    question: 'Which component focuses on teaching literacy?',
    options: ['CWTS', 'LTS', 'MTS', 'ROTC'],
    correct: 1
  }
];

export default function AssessmentsPage({ user }) {
  const [results, setResults] = useState({});
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(`assessments-${user.id}`);
    if (saved) {
      setResults(JSON.parse(saved));
    }
  }, [user.id]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const startAssessment = (assessment) => {
    setActiveAssessment(assessment);
    setAnswers({});
    setTimeLeft(assessment.timeLimit * 60);
  };

  const handleSubmit = () => {
    const score = Math.floor(Math.random() * 30) + 70;
    const newResults = {
      ...results,
      [activeAssessment.id]: {
        score,
        passed: score >= activeAssessment.passingScore,
        date: new Date().toISOString()
      }
    };
    setResults(newResults);
    localStorage.setItem(`assessments-${user.id}`, JSON.stringify(newResults));
    setActiveAssessment(null);
    setTimeLeft(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (activeAssessment) {
    return (
      <div className="size-full overflow-auto bg-slate-50">
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-900">{activeAssessment.title}</h1>
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
                <Clock className="w-5 h-5" />
                <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <span>{activeAssessment.questions} questions</span>
              <span>Passing score: {activeAssessment.passingScore}%</span>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-6 mb-6">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  {idx + 1}. {q.question}
                </h3>
                <div className="space-y-3">
                  {q.options.map((option, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        answers[idx] === optIdx
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        checked={answers[idx] === optIdx}
                        onChange={() => setAnswers({ ...answers, [idx]: optIdx })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Questions answered: {Object.keys(answers).length} / {SAMPLE_QUESTIONS.length}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveAssessment(null)}
                  className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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

  return (
    <div className="size-full overflow-auto bg-slate-50">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Assessments & Examinations</h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-slate-600">Total Assessments</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{ASSESSMENTS.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Completed</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Object.keys(results).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-slate-600">Average Score</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {Object.keys(results).length > 0
                ? Math.round(Object.values(results).reduce((acc, r) => acc + r.score, 0) / Object.keys(results).length)
                : 0}%
            </p>
          </div>
        </div>

        {/* Assessment List */}
        <div className="space-y-4">
          {ASSESSMENTS.map((assessment) => {
            const result = results[assessment.id];
            const isExam = assessment.type === 'exam';

            return (
              <div
                key={assessment.id}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isExam ? (
                        <div className="bg-purple-100 px-3 py-1 rounded-lg">
                          <span className="text-xs font-semibold text-purple-700">MAJOR EXAM</span>
                        </div>
                      ) : (
                        <div className="bg-blue-100 px-3 py-1 rounded-lg">
                          <span className="text-xs font-semibold text-blue-700">QUIZ</span>
                        </div>
                      )}
                      {result && (
                        <div className={`px-3 py-1 rounded-lg ${
                          result.passed ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <span className={`text-xs font-semibold ${
                            result.passed ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {result.passed ? 'PASSED' : 'FAILED'}
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{assessment.title}</h3>
                    <div className="flex items-center gap-6 text-sm text-slate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {assessment.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {assessment.timeLimit} minutes
                      </span>
                      <span>Passing: {assessment.passingScore}%</span>
                    </div>
                    {result && (
                      <div className="flex items-center gap-2 text-sm">
                        <Award className={`w-4 h-4 ${result.passed ? 'text-green-600' : 'text-red-600'}`} />
                        <span className="font-semibold text-slate-900">Score: {result.score}%</span>
                        <span className="text-slate-600">
                          • Taken on {new Date(result.date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => startAssessment(assessment)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      result
                        ? 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {result ? 'Retake' : 'Start Assessment'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
