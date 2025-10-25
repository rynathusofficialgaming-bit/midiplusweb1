import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Music, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { appConfig } from '@/config/appConfig';

const GenreSelection = ({ onGenreSelect, onLogout, theme }) => {
  const genreIcons = theme.genreIcons;

  const enabledGenres = Object.entries(appConfig.genres)
    .filter(([_, genre]) => genre.enabled)
    .map(([key, genre]) => ({ key, ...genre }));

  const randomCounts = useMemo(() => {
    const counts = {};
    enabledGenres.forEach(genre => {
      counts[genre.key] = Math.floor(1000 + Math.random() * 9000);
    });
    return counts;
  }, [enabledGenres]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${theme.mainGradient} p-3 rounded-xl`}>
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme.mainGradientText} bg-clip-text text-transparent`}>
                MIDI PLUS
              </h1>
              <p className={`${theme.subTextColor} text-sm`}>AI Studio</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold ${theme.textColor} mb-4`}>
            Choose Your Genre
          </h2>
          <p className={`${theme.subTextColor} text-lg`}>
            Select a genre and let AI create the perfect MIDI for your next hit
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enabledGenres.map((genre, index) => (
            <motion.div
              key={genre.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
              onClick={() => onGenreSelect(genre)}
            >
              <div className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-${theme.accentColor}-500/50 transition-all shadow-xl hover:shadow-${theme.accentColor}-500/20`}>
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {genreIcons[genre.key] || '🎵'}
                </div>
                <h3 className={`text-2xl font-bold ${theme.textColor} mb-2`}>
                  {genre.name}
                </h3>
                <p className={`${theme.subTextColor} mb-4`}>
                  {randomCounts[genre.key].toLocaleString()} MIDI variations available
                </p>
                <div className={`flex items-center text-${theme.accentColor}-400 font-semibold group-hover:text-${theme.accentColor}-300 transition-colors`}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Now
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreSelection;