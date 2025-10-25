import React from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, ArrowLeft, Music, Star, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap = {
    CheckCircle, Star, Sprout
};

const DownloadScreen = ({ downloadLink, genre, onBackToGenres, theme }) => {
  const handleDownload = () => {
    window.location.href = downloadLink;
  };

  const SuccessIcon = iconMap[theme.successIcon] || CheckCircle;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
             <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-full">
              <SuccessIcon className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl font-bold text-center ${theme.textColor} mb-4`}
          >
            Your MIDI is Ready! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`text-center ${theme.subTextColor} mb-8 text-lg`}
          >
            AI has successfully generated your {genre.name} MIDI file
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/50 rounded-xl p-6 mb-8 border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <Music className={`w-6 h-6 text-${theme.accentColor}-400`} />
              <div>
                <p className={`${theme.textColor} font-semibold`}>
                  {genre.name}_MIDI_AI_Generated.mid
                </p>
                <p className={`${theme.subTextColor} text-sm`}>
                  Ready for your DAW
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Button
              onClick={handleDownload}
              className={`w-full bg-gradient-to-r ${theme.mainGradient} ${theme.buttonHover} text-white font-semibold py-6 text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg`}
            >
              <Download className="w-5 h-5 mr-2" />
              Download MIDI File
            </Button>

            <Button
              onClick={onBackToGenres}
              variant="outline"
              className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 py-6 text-lg rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Generate Another
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DownloadScreen;