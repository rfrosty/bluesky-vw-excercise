import hamburgerExit from '../asset/images/hamburger-exit.svg';

export default function SmallMenu({ setDisplaySmallMenu, displaySmallMenuRef }) {

    function removeSmallMenu() {
        setDisplaySmallMenu(false); displaySmallMenuRef.current = false;
    }

    return (
        <nav id="small-menu">
            <div id="pseudo-header" onClick={removeSmallMenu}>
                <img id="exit-image" src={hamburgerExit} alt="exit-sign" />
            </div>
            <h3>More Cars</h3>
            <h3>About</h3>
            <h3>Contact</h3>
        </nav>
    )
}