import React, { useContext, useEffect } from 'react';

import { MyContext } from './../ContextProvider/ContextProvider';

interface HighScoreProps {
    currentLevel: string;
    counter: number;
    elapsedTime: number;
}

const HighScore: React.FC<HighScoreProps> = ({ counter, elapsedTime }) => {
    // const [highestScores, setHighestScores] = useState<{
    //   [level: string]: { score: number; elapsedTime: number };
    // }>({});
    const { setHighestScores, level } = useContext(MyContext);
    useEffect(() => {
        const storedScores = localStorage.getItem('highestScores');
        if (storedScores) {
            setHighestScores(JSON.parse(storedScores));
        } else {
            setHighestScores({});
        }
        /*...*/
    }, []);

    useEffect(() => {
        const updateHighScores = () => {
            setHighestScores((prevHighestScores) => {
                const levelData = prevHighestScores[level] || {
                    score: Infinity,
                    elapsedTime: 0,
                };
                if (
                    counter < levelData.score ||
                    (counter === levelData.score && elapsedTime < levelData.elapsedTime)
                ) {
                    const updatedScores = {
                        ...prevHighestScores,
                        [level]: { score: counter, elapsedTime },
                    };
                    localStorage.setItem('highestScores', JSON.stringify(updatedScores));
                    return updatedScores;
                }
                return prevHighestScores;
            });
        };

        updateHighScores();
    }, [level, counter, elapsedTime]); // Use level instead of currentLevel

    return <></>;
};

export default HighScore;
