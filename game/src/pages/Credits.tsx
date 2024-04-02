import { SelectPageProps } from './../components/InterfacePages';
import { playSound } from './../components/playSound';

export function Credits({ onPageChange }: SelectPageProps) {
    const handleBackClick = () => {
        onPageChange('selectlevel');
        playSound('click', 0.25);
        playSound('swoosh', 0.15);
    };

    function handleMouseOver() {
        playSound('hover', 0.15);
    }

    return (
        <>
            <div id="selectlevel">
                <h1>Credits</h1>
                <div id="credits">
                    <p>
                        <strong>Phoneix</strong> was the name of the group at{' '}
                        <strong>Lexicon React course 2024 (Sweden)</strong>, where we got the task
                        to make the Sokoban game in React. Hope you enjoy it and go make some maps
                        for others to play.
                    </p>
                    <h2>Graphics</h2>
                    <h4>
                        <a href="https://opengameart.org/content/sokoban-100-tiles" target="_blank">
                            Kenny
                        </a>
                    </h4>
                    <h2>Sound</h2>
                    <h4>
                        <a href="https://pixabay.com/">Pixabay</a>
                    </h4>
                    <h2>HTML, CSS, React</h2>
                    <h5>
                        <a href="https://diam.se" target="_blank">
                            Fredrik Berglund
                        </a>
                    </h5>
                    <h5>Andreas Isidorsson</h5>
                    <h5>Alireza Kafshdartoosi</h5>
                    <h5>Abbas Mansoori</h5>
                    <h5>Konstantios (Had to leave early)</h5>
                    <br />
                </div>

                <div id="menubuttons">
                    <div
                        id="btn-levels"
                        className="button"
                        onClick={handleBackClick}
                        onMouseOver={handleMouseOver}
                    ></div>
                </div>
            </div>
        </>
    );
}
