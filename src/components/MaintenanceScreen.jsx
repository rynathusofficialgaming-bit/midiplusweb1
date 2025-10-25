import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Music } from 'lucide-react';
import { appConfig } from '@/config/appConfig';

const MaintenanceScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl text-center"
      >
        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-full">
              <HardHat className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Under Maintenance
          </h1>
          
          <p className="text-slate-400 mb-8 text-lg">
            {appConfig.maintenanceMode.message}
          </p>

          <motion.div
            className="mt-8 flex justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Music className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MIDI PLUS
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MaintenanceScreen;