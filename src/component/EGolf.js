import logo from '../asset/images/logo.svg';
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
                            {!isViewportSuitableForSmallMenuState && <div>More Cars</div>}
                            {!isViewportSuitableForSmallMenuState && <div>About</div>}
                            {!isViewportSuitableForSmallMenuState && <div>Contact</div>}
                        </nav >
                    </header >
                    <main>

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
