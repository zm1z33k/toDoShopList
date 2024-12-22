import "./navbar.css";

const Navbar = () => {
  return (
        <nav className="navbar">
          <img className="icon" src='/Images/logo192.png' alt="Logo" onClick={() => window.location.href = '/'}/>
          <h1 onClick={() => window.location.href = '/'}>Shopping Lists</h1>
          <h2>_____</h2>
        </nav>
  );
};

export default Navbar;
