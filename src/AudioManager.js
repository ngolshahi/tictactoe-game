export default class AudioManager {
    constructor() {
      this.sounds = {
        move: new Audio("https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3"),
        win: new Audio("https://assets.mixkit.co/active_storage/sfx/1993/1993-preview.mp3"),
        draw: new Audio("https://assets.mixkit.co/active_storage/sfx/1265/1265-preview.mp3"), 
        jump: new Audio("https://assets.mixkit.co/active_storage/sfx/2681/2681-preview.mp3"),
        restart: new Audio("https://assets.mixkit.co/active_storage/sfx/1072/1072-preview.mp3")
      };
      
      // Preload sounds
      Object.values(this.sounds).forEach(audio => {
        audio.load();
      });
      
      // Set volumes
      this.sounds.move.volume = 0.3;
      this.sounds.win.volume = 0.4;
      this.sounds.draw.volume = 0.3;
      this.sounds.jump.volume = 0.2;
      this.sounds.restart.volume = 0.3;
    }
    
    play(soundName) {
      if (this.sounds[soundName]) {
        // Stop and reset the sound first
        this.sounds[soundName].pause();
        this.sounds[soundName].currentTime = 0;
        
        // Play the sound
        this.sounds[soundName].play().catch(error => {
          console.log("Audio playback error:", error);
        });
      }
    }
    
    stopAll() {
      Object.values(this.sounds).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  }