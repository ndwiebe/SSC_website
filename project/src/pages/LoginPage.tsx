import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        await signup(formData.email, formData.password, formData.name);
      }
      navigate('/');
    } catch (err) {
      setError(isLogin ? 'Invalid email or password' : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-ssc-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-3 mb-8">
            <img
              src="/ssc-logo.png"
              alt="Slab Savvy CPA Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-ssc-gold shadow-gold"
            />
            <div className="text-left">
              <span className="font-headline text-lg tracking-wide text-white">SLAB SAVVY CPA</span>
              <p className="text-xs text-ssc-chrome font-body">The Hobby's Accountant</p>
            </div>
          </Link>

          <h2 className="font-headline text-3xl text-ssc-gold tracking-wide">
            {isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h2>
          <p className="mt-2 text-ssc-chrome font-body">
            {isLogin
              ? 'Sign in to access your cards and wishlist'
              : 'Join the community'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-ssc-white p-8 border border-ssc-border shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-body font-medium text-ssc-text mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-ssc-chrome-dark" />
                  <input
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-body font-medium text-ssc-text mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-ssc-chrome-dark" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-ssc-text mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-ssc-chrome-dark" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-ssc-chrome-dark hover:text-ssc-text"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-body font-medium text-ssc-text mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-ssc-chrome-dark" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-red-600 font-body">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ssc-gold hover:bg-ssc-gold-dark disabled:bg-ssc-chrome-dark text-white px-4 py-3 font-body font-semibold transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? <LogIn className="w-5 h-5 mr-2" /> : <UserPlus className="w-5 h-5 mr-2" />}
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-ssc-text-secondary">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={toggleMode}
                className="ml-1 text-ssc-gold hover:text-ssc-gold-dark font-body font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-ssc-gold/5 border border-ssc-gold/20">
            <h4 className="font-body font-medium text-ssc-text mb-2">Demo Credentials</h4>
            <div className="text-sm font-mono text-ssc-text-secondary space-y-1">
              <p><strong>Admin:</strong> admin@slabsavvy.com / password</p>
              <p><strong>User:</strong> demo@example.com / password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};