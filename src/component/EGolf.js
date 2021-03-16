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
        window.addEventListener('resize', isViewportSuitableForSmallMenu);
        window.addEventListener('resize', makeVHCSSVariable);
    }, []);

    return (
        <>
            {displaySmallMenuOptions && <SmallMenu setDisplaySmallMenuOptions={setDisplaySmallMenuOptions} />}
            {!displaySmallMenuOptions &&
                <header>
                    <img src={logo} />
                    <nav>
                        {isViewportSuitableForSmallMenuState &&
                            <img id="menu-button" src={hamburger} onClick={turnOnSmallMenuOptions} />
                        }
                        {!isViewportSuitableForSmallMenuState && <h4>More Cars</h4>}
                        {!isViewportSuitableForSmallMenuState && <h4>About</h4>}
                        {!isViewportSuitableForSmallMenuState && <h4>Contact</h4>}
                    </nav >
                </header >
            }
            {!displaySmallMenuOptions &&
                <main>

                </main>
            }
            {/* <footer>
                <section>
                    <div>info</div>
                    <div>info</div>
                    <div>info</div>
                </section>
                <section>
                    <div>info</div>
                    <div>info</div>
                    <div>info</div>
                </section>
                <section>
                    <div>info</div>
                    <div>info</div>
                    <div>info</div>
                </section>
            </footer> */}
        </>
    )
}
