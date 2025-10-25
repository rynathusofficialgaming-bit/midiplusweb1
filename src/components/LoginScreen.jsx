import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/config/appConfig';
import { useToast } from '@/components/ui/use-toast';

const LoginScreen = ({ onLogin, theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = appConfig.users.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      toast({
        title: "Welcome back! 🎵",
        description: "Login successful. Let's create some fire!",
      });
      setTimeout(() => onLogin(), 500);
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid username or password. Try again!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className={`bg-gradient-to-br ${theme.mainGradient} p-4 rounded-full`}>
              <Music className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-3xl font-bold text-center mb-2 bg-gradient-to-r ${theme.mainGradientText} bg-clip-text text-transparent`}
          >
            MIDI PLUS
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-center ${theme.subTextColor} mb-8`}
          >
            AI-Powered MIDI Generation
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className={`block text-sm font-medium ${theme.subTextColor} mb-2`}>
                Username
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.subTextColor}`} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-${theme.accentColor}-500 focus:border-transparent text-white placeholder-slate-500 transition-all`}
                  placeholder="Enter username"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className={`block text-sm font-medium ${theme.subTextColor} mb-2`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${theme.subTextColor}`} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-${theme.accentColor}-500 focus:border-transparent text-white placeholder-slate-500 transition-all`}
                  placeholder="Enter password"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r ${theme.mainGradient} ${theme.buttonHover} text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg`}
              >
                Access Studio
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;