import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Music, Zap, Brain, ListMusic, Gift, Ghost } from 'lucide-react';
import { appConfig } from '@/config/appConfig';

const iconMap = {
    Loader2, Sparkles, Music, Zap, Brain, ListMusic, Gift, Ghost
};

const GenerationScreen = ({ genre, onComplete, onError, theme }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = [
    { text: "Analyzing genre patterns...", icon: Brain },
    { text: "Thinking of melodies...", icon: Music },
    { text: "Creating chord progressions...", icon: Sparkles },
    { text: "Generating rhythm patterns...", icon: Zap },
    { text: "Crafting the perfect flow...", icon: ListMusic },
    { text: "Finalizing MIDI file...", icon: Music }
  ];
  
  const LoaderIcon = iconMap[theme.loaderIcon] || Loader2;

  useEffect(() => {
    const { time } = appConfig.generation;
    const generationDuration = Math.random() * (time.max - time.min) + time.min;
    const messageIntervalTime = generationDuration / messages.length;
    const progressIntervalTime = 50;
    const progressIncrement = (progressIntervalTime / generationDuration) * 100;

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => Math.min(prev + 1, messages.length - 1));
    }, messageIntervalTime);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + progressIncrement;
      });
    }, progressIntervalTime);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        const { fakeError } = appConfig.generation;
        if (fakeError.enabled && Math.random() < fakeError.chance) {
          onError(fakeError.message);
        } else {
          const genreData = appConfig.genres[genre.key];
          const randomIndex = Math.floor(Math.random() * genreData.dropboxLinks.length);
          const selectedLink = genreData.dropboxLinks[randomIndex];
          onComplete(selectedLink);
        }
      }, 1000);
    }
  }, [progress, genre, onComplete, onError]);

  const CurrentIcon = messages[currentMessage].icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mb-8"
          >
            <div className={`bg-gradient-to-br ${theme.mainGradient} p-6 rounded-full`}>
              <LoaderIcon className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <h2 className={`text-3xl font-bold text-center ${theme.textColor} mb-4`}>
            AI is Creating Your {genre.name} MIDI
          </h2>

          <div className="mb-8">
            <div className="bg-slate-900/50 rounded-full h-3 overflow-hidden">
              <motion.div
                className={`bg-gradient-to-r ${theme.mainGradient} h-full rounded-full`}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            <p className={`text-center ${theme.subTextColor} mt-2 text-sm`}>
              {Math.min(Math.round(progress), 100)}% Complete
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 bg-slate-900/50 rounded-xl p-6"
            >
              <CurrentIcon className={`w-6 h-6 text-${theme.accentColor}-400`} />
              <p className={`text-lg ${theme.textColor} font-medium`}>
                {messages[currentMessage].text}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="mt-8 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 bg-${theme.accentColor}-500 rounded-full`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GenerationScreen;