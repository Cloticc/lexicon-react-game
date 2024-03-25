import { useEffect, useState } from 'react';

import clickSound from './../assets/menu-click-89198.mp3';
import hoverSound from './../assets/button-124476.mp3';
import walkSound from './../assets/indoor-footsteps-6385.mp3';
import pushboxSound from './../assets/push-100769.mp3';
import swooshSound from './../assets/swoosh-transition-with-metal-overtones-142375.mp3';
import boxindicationSound from './../assets/rightanswer-95219.mp3';
import leveldoneSound from './../assets/cute-level-up-1-189852.mp3';
import levelstartSound from './../assets/game-start-6104.mp3';
import reverseSound from './../assets/cinematic-whoosh-reverse-161307.mp3';
import drillSound from './../assets/drill-86224.mp3';
import collectSound from './../assets/collectcoin-6075.mp3';
import explodeSound from './../assets/exploding-building-1-185114.mp3';
import mineSound from './../assets/explosion-6055.mp3';
import doorSound from './../assets/recording-slidedoor-1547157608-fake-online-audio-convertercom-45829.mp3';
import mediumExplosionSound from './../assets/medium-explosion-40472.mp3';
import lostSound from './../assets/game-fx-9-40197.mp3';
import gameOverSound from './../assets/080205_life-lost-game-over-89697.mp3';

type SoundName =
    | 'click'
    | 'hover'
    | 'walk'
    | 'pushbox'
    | 'swoosh'
    | 'boxindication'
    | 'leveldone'
    | 'levelstart'
    | 'collect'
    | 'mine'
    | 'walldoor'
    | 'wallexplode'
    | 'boxexplode'
    | 'drill'
    | 'lost'
    | 'gameover'
    | 'reverse'; // Define sound names as string literals

const soundFiles: Record<SoundName, string> = {
    click: clickSound,
    hover: hoverSound,
    walk: walkSound,
    pushbox: pushboxSound,
    swoosh: swooshSound,
    boxindication: boxindicationSound,
    leveldone: leveldoneSound,
    levelstart: levelstartSound,
    collect: collectSound,
    mine: mineSound,
    walldoor: doorSound,
    wallexplode: explodeSound,
    boxexplode: mediumExplosionSound,
    drill: drillSound,
    lost: lostSound,
    gameover: gameOverSound,
    reverse: reverseSound,
    // Add more mappings as needed
};

export function SoundPlayer() {
    const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);

    useEffect(() => {
        return () => {
            audioElements.forEach((audio) => audio.remove());
            setAudioElements([]);
        };
    }, [audioElements]);

    return (
        <>
            {Object.entries(soundFiles).map(([soundName, soundFile]) => (
                <audio key={soundName} src={soundFile} />
            ))}
        </>
    );
}

export function playSound(soundname: SoundName, volume = 1): void {
    const audio = new Audio(soundFiles[soundname]);

    audio.volume = volume;
    audio.play();

    audio.onended = () => {
        // Optionally handle onended event
    };
}
