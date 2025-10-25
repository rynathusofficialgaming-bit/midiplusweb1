import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import LoginScreen from '@/components/LoginScreen';
import GenreSelection from '@/components/GenreSelection';
import GenerationScreen from '@/components/GenerationScreen';
import DownloadScreen from '@/components/DownloadScreen';
import MaintenanceScreen from '@/components/MaintenanceScreen';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { appConfig } from '@/config/appConfig';

const Snowfall = lazy(() => import('@/components/effects/Snowfall'));
const FloatingPumpkins = lazy(() => import('@/components/effects/FloatingPumpkins'));

const themeComponents = {
  Snowfall,
  FloatingPumpkins,
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('genre');
  const [selectedGenre, setSelectedGenre] = useState(() => {
    const savedGenre = localStorage.getItem('midiplus_selectedGenre');
    return savedGenre ? JSON.parse(savedGenre) : null;
  });
  const [downloadLink, setDownloadLink] = useState('');
  const { toast } = useToast();

  const currentThemeName = appConfig.theming.activeTheme;
  const currentTheme = appConfig.theming.themes[currentThemeName] || appConfig.theming.themes.default;

  useEffect(() => {
    document.body.className = `bg-gradient-to-br ${currentTheme.bgGradient}`;
  }, [currentTheme]);

  useEffect(() => {
    const authStatus = localStorage.getItem('midiplus_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('midiplus_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('midiplus_auth');
    localStorage.removeItem('midiplus_selectedGenre');
    setCurrentScreen('genre');
    setSelectedGenre(null);
    setDownloadLink('');
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    localStorage.setItem('midiplus_selectedGenre', JSON.stringify(genre));
    setCurrentScreen('generating');
  };

  const handleGenerationComplete = (link) => {
    setDownloadLink(link);
    setCurrentScreen('download');
  };

  const handleGenerationError = (message) => {
    toast({
      title: "Generation Failed 🤖",
      description: message,
      variant: "destructive",
    });
    setCurrentScreen('genre');
    setSelectedGenre(null);
    localStorage.removeItem('midiplus_selectedGenre');
  }

  const handleBackToGenres = () => {
    setCurrentScreen('genre');
    setSelectedGenre(null);
    localStorage.removeItem('midiplus_selectedGenre');
    setDownloadLink('');
  };
  
  const BackgroundComponent = currentTheme.backgroundComponent ? themeComponents[currentTheme.backgroundComponent] : null;

  if (appConfig.maintenanceMode.enabled) {
    return (
      <>
        <Helmet>
          <title>MIDI PLUS - Under Maintenance</title>
          <meta name="description" content="MIDI PLUS is currently undergoing maintenance." />
        </Helmet>
        <MaintenanceScreen />
      </>
    );
  }

  const screensProps = {
    theme: currentTheme,
  };

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>MIDI PLUS - AI MIDI Generator for Producers</title>
          <meta name="description" content="Generate professional MIDI files with AI. Choose your genre and let our AI create the perfect MIDI for your production." />
        </Helmet>
        {BackgroundComponent && <Suspense fallback={null}><BackgroundComponent /></Suspense>}
        <LoginScreen onLogin={handleLogin} {...screensProps} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>MIDI PLUS - AI MIDI Generator</title>
        <meta name="description" content="Generate professional MIDI files with AI. Choose your genre and let our AI create the perfect MIDI for your production." />
      </Helmet>
      {BackgroundComponent && <Suspense fallback={null}><BackgroundComponent /></Suspense>}
      <div className="min-h-screen relative z-10">
        {currentScreen === 'genre' && (
          <GenreSelection onGenreSelect={handleGenreSelect} onLogout={handleLogout} {...screensProps} />
        )}
        {currentScreen === 'generating' && selectedGenre && (
          <GenerationScreen 
            genre={selectedGenre} 
            onComplete={handleGenerationComplete}
            onError={handleGenerationError}
            {...screensProps}
          />
        )}
        {currentScreen === 'download' && selectedGenre && (
          <DownloadScreen 
            downloadLink={downloadLink}
            genre={selectedGenre}
            onBackToGenres={handleBackToGenres}
            {...screensProps}
          />
        )}
      </div>
      <Toaster />
    </>
  );
}

export default App;