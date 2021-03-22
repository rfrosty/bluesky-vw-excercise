import hamburgerExit from '../asset/images/hamburger-exit.svg';

export default function SmallMenu({ setDisplaySmallMenu }) {

    function makeFalseDisplaySmallMenu() {
        setDisplaySmallMenu(false);
    }

    return (
        <nav id="small-menu">
            <div id="pseudo-header" onClick={makeFalseDisplaySmallMenu}>
                <img id="exit-image" src={hamburgerExit} alt="exit-sign" />
            </div>
            <h4>More Cars</h4>
            <h4>About</h4>
            <h4>Contact</h4>
        </nav>
    )
}