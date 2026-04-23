import { useState } from 'react';
import { GraduationCap, Mail, Lock } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo login - in production, this would authenticate against a backend
    if (email === 'admin@nstp.edu' && password === 'admin') {
      onLogin({
        id: 'admin-1',
        name: 'Administrator',
        email: email,
        role: 'admin'
      });
    } else {
      onLogin({
        id: 'student-' + Date.now(),
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: 'student',
        enrolled: false
      });
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-full max-w-md p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">NSTP Learning System</h1>
          <p className="text-slate-600">National Service Training Program</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="student@university.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-2">Demo Credentials</p>
            <div className="text-xs text-slate-600 space-y-1">
              <p><strong>Admin:</strong> admin@nstp.edu / admin</p>
              <p><strong>Student:</strong> Any email / Any password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
