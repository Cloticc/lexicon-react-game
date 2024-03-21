import React, { useContext, useState, useEffect, useRef } from "react";
import { MyContext } from "./../ContextProvider/ContextProvider";
import uiMusic from "./../assets/neon-gaming-128925.mp3";
import playMusic from "./../assets/synthwave-background-music-155701.mp3";
import playMusic2 from "./../assets/risk-136788.mp3";
import playMusic3 from "./../assets/thinking-time-148496.mp3";

interface MusicProps {
    audio: string;
}

export const Music: React.FC<MusicProps> = ({ audio }) => {
    const [music, setMusic] = useState<string>(""); // Initialize music state with null
    const { level, isMuted } = useContext(MyContext);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Set the music based on the audio prop
        if (audio === "ui") {
            setMusic(uiMusic);
        } else if (audio === "play") {
            if (level <= 8) {
                setMusic(playMusic);
            } else if (level > 8 && level <= 19) {
                setMusic(playMusic2);
            } else if (level > 19) {
                setMusic(playMusic3);
            }
        }
    }, [audio, level]);

    useEffect(() => {
        // Play music when music state changes
        const musicPlayer = audioRef.current;

        if (music && musicPlayer && !isMuted) {
            musicPlayer.src = music;
            musicPlayer.loop = true;
            musicPlayer.play().catch(error => {
                console.error("Failed to play music:", error);
            });
        }

        return () => {
            // Cleanup function to pause music when component unmounts
            if (musicPlayer && !musicPlayer.paused) {
                musicPlayer.pause();
            }
        };
    }, [music, isMuted]);

    return (
        <button onClick={playAudio} style={{ display: "none" }}>
            Play Audio
        </button>
    );

    function playAudio() {
        const musicPlayer = audioRef.current;
        if (musicPlayer) {
            musicPlayer.play().catch(error => {
                console.error("Failed to play music:", error);
            });
        }
    }

    return <audio id="music" autoPlay loop ref={audioRef} />;
};
