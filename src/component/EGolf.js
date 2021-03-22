import logo from '../asset/images/logo.svg';
import golf from '../asset/images/golf-car.png';
import hamburger from '../asset/images/hamburger.svg';
import { useState, useEffect, useRef } from 'react';
import SmallMenu from './SmallMenu';

export default function EGolf() {
    let [isViewportSuitableForSmallMenuState, setIsViewportSuitableForSmallMenuState] = useState(false);
    let [displaySmallMenu, setDisplaySmallMenu] = useState(false);
    let displaySmallMenuRef = useRef(false);//🧙‍♂️having to use this because of stale closure
    let viewportSuitableForSmallMenuRef = useRef(700); //🧙‍♂️is there a better way than using arbitrary point-break?

    function makeVHCSSVariable() {
        document.documentElement.style.setProperty(`--vh100`, `${window.innerHeight}px`);
    }
    function isViewportSuitableForSmallMenu() {
        setIsViewportSuitableForSmallMenuState(window.innerWidth <= viewportSuitableForSmallMenuRef.current ? true : false);//🧙‍♂️why wouldn't this be stale closure?
        if (displaySmallMenuRef.current && window.innerWidth >= viewportSuitableForSmallMenuRef.current) {
            setDisplaySmallMenu(false); displaySmallMenuRef.current = false;
        }
    }
    function turnOnSmallMenu() {
        setDisplaySmallMenu(true);
        displaySmallMenuRef.current = true;
    }

    useEffect(() => {
        isViewportSuitableForSmallMenu(); window.addEventListener('resize', isViewportSuitableForSmallMenu);
        makeVHCSSVariable(); window.addEventListener('resize', makeVHCSSVariable);
    }, []);

    return (
        <>
            {displaySmallMenu && <SmallMenu setDisplaySmallMenu={setDisplaySmallMenu} />}

            {!displaySmallMenu &&
                <section>
                    <header>
                        <img src={logo} alt="volkswagen-logo" />
                        <nav>
                            {isViewportSuitableForSmallMenuState &&
                                <img id="menu-button" src={hamburger} onClick={turnOnSmallMenu} alt="menu-button" />
                            }
                            {!isViewportSuitableForSmallMenuState && <div>Golf</div>}
                            {!isViewportSuitableForSmallMenuState && <div>About</div>}
                            {!isViewportSuitableForSmallMenuState && <div>Contact</div>}
                        </nav >
                    </header >
                    <main>
                        <section id='picture-text-container'>
                            <img src={golf} alt="car-golf" />
                            <div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor vitae purus faucibus ornare suspendisse sed.</p>
                                <p>Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Velit scelerisque in dictum non consectetur.</p>
                                <button>Take the tour</button>
                            </div>
                        </section>
                    </main>
                    <footer>
                        <section>
                            <h4>Our Stores</h4>
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>Twitter</p>
                        </section>
                        <section>
                            <h4>Company</h4>
                            <p>Careers</p>
                            <p>App</p>
                            <p>Investor Relations</p>
                            <p>Statements</p>
                        </section>
                        <section>
                            <h4>Legal</h4>
                            <p>Terms &amp; Conditions</p>
                            <p>Privacy</p>
                            <p>Cookies</p>
                        </section>
                    </footer>
                </section>
            }
        </>
    )
}
