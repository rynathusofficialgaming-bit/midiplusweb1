export const appConfig = {
  theming: {
    activeTheme: "default", // Options: "default", "christmas", "halloween"
    themes: {
      default: {
        name: "Default",
        bgGradient: "from-slate-950 via-slate-900 to-slate-950",
        mainGradient: "from-cyan-500 to-blue-600",
        mainGradientText: "from-cyan-400 to-blue-500",
        textColor: "text-white",
        subTextColor: "text-slate-400",
        accentColor: "cyan",
        buttonHover: "hover:from-cyan-600 hover:to-blue-700",
        genreIcons: { trap: '🔥', lofi: '🌙', house: '🎧', drill: '⚡', rnb: '💫', edm: '🎆' },
        loaderIcon: "Loader2",
        successIcon: "CheckCircle",
        backgroundComponent: null,
      },
      christmas: {
        name: "Christmas",
        bgGradient: "from-gray-800 via-red-950 to-gray-800",
        mainGradient: "from-green-500 to-red-600",
        mainGradientText: "from-green-400 to-red-500",
        textColor: "text-white",
        subTextColor: "text-red-200",
        accentColor: "green",
        buttonHover: "hover:from-green-600 hover:to-red-700",
        genreIcons: { trap: '🎄', lofi: '☕', house: '🎁', drill: '🥶', rnb: '🌟', edm: '🎅' },
        loaderIcon: "Gift",
        successIcon: "Star",
        backgroundComponent: 'Snowfall',
      },
      halloween: {
        name: "Halloween",
        bgGradient: "from-gray-900 via-purple-950 to-black",
        mainGradient: "from-orange-500 to-purple-600",
        mainGradientText: "from-orange-400 to-purple-500",
        textColor: "text-white",
        subTextColor: "text-purple-300",
        accentColor: "orange",
        buttonHover: "hover:from-orange-600 hover:to-purple-700",
        genreIcons: { trap: '🎃', lofi: '👻', house: '💀', drill: '🔪', rnb: '🕸️', edm: '🦇' },
        loaderIcon: "Ghost",
        successIcon: "Sprout",
        backgroundComponent: 'FloatingPumpkins',
      }
    }
  },

  maintenanceMode: {
    enabled: false,
    message: "We're currently fine-tuning our AI engine to bring you even better melodies. We'll be back online shortly!"
  },
  
  generation: {
    time: { // in milliseconds
      min: 60000,
      max: 120000
    },
    fakeError: {
      enabled: true,
      chance: 0.5,
      message: "Our AI got a bit too creative and hit a block. Please try again!"
    }
  },

  users: [
    { username: "producer1", password: "beats2024" },
    { username: "admin", password: "admin123" },
    { username: "demo", password: "demo" }
  ],
  
  genres: {
    trap: { 
      enabled: true, 
      name: "Trap", 
      dropboxLinks: [
        "https://www.dropbox.com/s/example1/trap-midi-1.mid?dl=1",
        "https://www.dropbox.com/s/example2/trap-midi-2.mid?dl=1",
        "https://www.dropbox.com/s/example3/trap-midi-3.mid?dl=1"
      ] 
    },
    lofi: { 
      enabled: true, 
      name: "Lo-Fi", 
      dropboxLinks: [
        "https://www.dropbox.com/s/example4/lofi-midi-1.mid?dl=1"
      ] 
    },
    house: { 
      enabled: true, 
      name: "House", 
      dropboxLinks: [
        "https://www.dropbox.com/scl/fi/7y7ttwrzf1pkz4xy2keyv/midi1.mid?rlkey=hy5cbfea5ioolvmh5bkmp7gdh&st=inybuvbc&dl=1"
      ] 
    },
    drill: { 
      enabled: true, 
      name: "Drill", 
      dropboxLinks: [
        "https://www.dropbox.com/s/example9/drill-midi-1.mid?dl=1"
      ] 
    },
    rnb: { 
      enabled: true, 
      name: "R&B", 
      dropboxLinks: [
        "https://www.dropbox.com/s/example11/rnb-midi-1.mid?dl=1"
      ] 
    },
    edm: { 
      enabled: true, 
      name: "EDM", 
      dropboxLinks: [
        "https://www.dropbox.com/s/example13/edm-midi-1.mid?dl=1"
      ] 
    }
  }
};