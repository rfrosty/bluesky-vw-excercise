import hamburgerExit from '../asset/images/hamburger-exit.png';

export default function SmallMenu({ setDisplaySmallMenu, displaySmallMenuRef }) {

    function removeSmallMenu() {
        setDisplaySmallMenu(false); displaySmallMenuRef.current = false;
    }

    return (
        <nav id="small-menu">
            <section className="dummy-header" onClick={removeSmallMenu}>
                <div className="img-container">
                    <img id="exit-image" src={hamburgerExit} alt="exit-sign" />
                </div>
            </section>
            <section className="h3-container">
                <h3>More Cars</h3>
                <h3>About</h3>
                <h3>Contact</h3>
            </section>
            <section className="dummy-header-footer"></section>
        </nav>
    )
}