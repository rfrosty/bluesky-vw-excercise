import exit from '../asset/images/exit.svg';

export default function SmallMenu({ setDisplaySmallMenuOptions }) {

    function makeFalseDisplaySmallMenuOptions() {
        setDisplaySmallMenuOptions(false);
    }

    return (
        <nav id="small-menu-options">
            <div id="pseudo-header" onClick={makeFalseDisplaySmallMenuOptions}>
                <img id="exit-image" src={exit} />
            </div>
            <h4>More Cars</h4>
            <h4>About</h4>
            <h4>Contact</h4>
        </nav>
    )
}