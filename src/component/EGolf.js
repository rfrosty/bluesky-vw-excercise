import logo from '../asset/images/logo.svg';
import golf from '../asset/images/golf-car.png';
import hamburger from '../asset/images/hamburger.svg';
import { useState, useEffect, useRef } from 'react';
import SmallMenu from './SmallMenu';

export default function EGolf() {
    let [isViewportSuitableForSmallMenuState, setIsViewportSuitableForSmallMenuState] = useState(false);
    let [displaySmallMenuOptions, setDisplaySmallMenuOptions] = useState(false);
    let displaySmallMenuOptionsRef = useRef(false);//🧙‍♂️having to use this because of stale closure
    let viewportSuitableForSmallMenuRef = useRef(700); //🧙‍♂️is there a better way than using arbitrary point-break?

    function makeVHCSSVariable() { //🧙‍♂️not sure why stale closure didn't form here. Is it because it's not referencing state? 
        document.documentElement.style.setProperty(`--vh100`, `${window.innerHeight}px`);
    }

    function isViewportSuitableForSmallMenu() {
        setIsViewportSuitableForSmallMenuState(window.innerWidth <= viewportSuitableForSmallMenuRef.current ? true : false);
        if (displaySmallMenuOptionsRef.current && window.innerWidth >= viewportSuitableForSmallMenuRef.current) {
            setDisplaySmallMenuOptions(false); displaySmallMenuOptionsRef.current = false;
        }
    }
    function turnOnSmallMenuOptions() {
        setDisplaySmallMenuOptions(true);
        displaySmallMenuOptionsRef.current = true;
    }

    useEffect(() => {
        isViewportSuitableForSmallMenu();
        makeVHCSSVariable();
        window.addEventListener('resize', isViewportSuitableForSmallMenu);
        window.addEventListener('resize', makeVHCSSVariable);
    }, []);

    return (
        <>
            {displaySmallMenuOptions && <SmallMenu setDisplaySmallMenuOptions={setDisplaySmallMenuOptions} />}

            {!displaySmallMenuOptions &&
                <section>
                    <header>
                        <img src={logo} />
                        <nav>
                            {isViewportSuitableForSmallMenuState &&
                                <img id="menu-button" src={hamburger} onClick={turnOnSmallMenuOptions} />
                            }
                            {!isViewportSuitableForSmallMenuState && <div>Golf</div>}
                            {!isViewportSuitableForSmallMenuState && <div>About</div>}
                            {!isViewportSuitableForSmallMenuState && <div>Contact</div>}
                        </nav >
                    </header >
                    <main>
                        <section id='picture-text-container'>
                            <img src={golf} />
                            {/* <p>p</p> */}
                            <div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor vitae purus faucibus ornare suspendisse sed.</p>
                                <p>Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Velit scelerisque in dictum non consectetur.</p>
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
