import { useState, useEffect } from 'react';
import { FileText, Clock, AlertCircle, Award } from 'lucide-react';

const EXAM_QUESTIONS = [
  {
    question: 'What is the primary objective of the National Service Training Program?',
    options: [
      'To provide military training to all students',
      'To promote civic consciousness and defense preparedness',
      'To replace regular academic courses',
      'To provide employment after graduation'
    ],
    correct: 1
  },
  {
    question: 'Which government agency oversees the implementation of NSTP?',
    options: ['Department of Education', 'Commission on Higher Education', 'Department of National Defense', 'All of the above'],
    correct: 3
  },
  {
    question: 'What does CWTS stand for?',
    options: [
      'Community Welfare Training Service',
      'Civic Welfare Training Service',
      'Community Work Training Service',
      'Civic Work and Training Service'
    ],
    correct: 1
  },
  {
    question: 'How many hours of training are required for NSTP completion?',
    options: ['25 hours', '36 hours', '54 hours', '72 hours'],
    correct: 2
  },
  {
    question: 'Which component focuses on teaching literacy to communities?',
    options: ['CWTS', 'LTS', 'MTS', 'ROTC'],
    correct: 1
  },
  {
    question: 'What is a key principle of community development discussed in the seminars?',
    options: [
      'Top-down approach',
      'Participatory development',
      'Individual focus',
      'Government-only initiative'
    ],
    correct: 1
  },
  {
    question: 'In disaster risk reduction, what does DRRM stand for?',
    options: [
      'Disaster Response and Recovery Management',
      'Disaster Risk Reduction and Management',
      'Defense and Risk Response Mechanism',
      'Disaster Relief and Rescue Mission'
    ],
    correct: 1
  },
  {
    question: 'Which of the following is NOT a component of NSTP?',
    options: ['CWTS', 'LTS', 'MTS', 'JROTC'],
    correct: 3
  },
  {
    question: 'What is the main focus of MTS (Military Training Service)?',
    options: [
      'Community service',
      'Literacy training',
      'Military training and national defense preparation',
      'Environmental conservation'
    ],
    correct: 2
  },
  {
    question: 'According to the Philippine Constitution, what is emphasized regarding citizenship?',
    options: [
      'Rights only',
      'Duties only',
      'Both rights and responsibilities',
      'Neither rights nor duties'
    ],
    correct: 2
  }
];

export default function QualifyingExam({ user, preferredComponent, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
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
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (submitted) return;

    let correct = 0;
    EXAM_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / EXAM_QUESTIONS.length) * 100);
    setScore(finalScore);
    setSubmitted(true);

    // Save exam result
    const examResult = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      preferredComponent,
      score: finalScore,
      timestamp: new Date().toISOString()
    };

    // Add to global exam results
    const allResults = JSON.parse(localStorage.getItem('qualifyingExamResults') || '[]');
    allResults.push(examResult);
    localStorage.setItem('qualifyingExamResults', JSON.stringify(allResults));

    // Save to user's record
    localStorage.setItem(`examResult-${user.id}`, JSON.stringify(examResult));
  };

  if (submitted) {
    return (
      <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-2xl w-full p-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Exam Submitted Successfully</h2>
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <p className="text-sm text-slate-600 mb-2">Your Score</p>
              <p className="text-5xl font-bold text-blue-600 mb-2">{score}%</p>
              <p className="text-sm text-slate-600">
                {score >= 80 ? 'Excellent performance!' : score >= 70 ? 'Good job!' : 'Thank you for participating'}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-yellow-900 mb-1">Awaiting Component Assignment</p>
                  <p className="text-sm text-yellow-800">
                    Your preferred component is <strong>{preferredComponent}</strong>. The NSTP Coordinator will review
                    all qualifying exam scores and assign students to components based on rankings and available slots.
                    You will be notified of your final component assignment.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onComplete(score)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full overflow-auto bg-slate-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">NSTP Qualifying Examination</h1>
              <p className="text-slate-600">Preferred Component: <strong>{preferredComponent}</strong></p>
            </div>
            <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="font-mono font-semibold text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Important Notice</p>
                <p>
                  Your exam score will determine your component placement. Students are ranked by score, and
                  those with the highest scores in each component get priority enrollment based on available slots.
                  If your preferred component is full, you will be assigned to another component with vacancies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-6">
          {EXAM_QUESTIONS.map((q, idx) => (
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
        <div className="bg-white rounded-xl border border-slate-200 p-6 sticky bottom-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">
                Questions answered: {Object.keys(answers).length} / {EXAM_QUESTIONS.length}
              </p>
              <p className="text-sm text-slate-600">
                Make sure to review all answers before submitting
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < EXAM_QUESTIONS.length}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Submit Examination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
