import "../css/Footer.css"

function Footer() {
    return (
        <footer className="footer-style">
            © {new Date().getFullYear()} Clark University IGDA
        </footer>
    );
}

export default Footer;
