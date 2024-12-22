import "./navbar.css";

// Navbar component
const Navbar = () => {
  return (
        <nav className="navbar">
          <img className="icon" src='/Images/logo192.png' alt="Logo" onClick={() => window.location.href = '/list'}/>
          <h1 onClick={() => window.location.href = '/list'}>Shopping Lists</h1>
          <h5>_________</h5>
        </nav>
  );
};

export default Navbar;
