import { NavLink } from "react-router-dom";

const Nav = (props) => {
  const { locationPerm, conferencePerm } = props.navPerms;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">Conference GO!</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/locations/new" className={"nav-link" + (locationPerm ? "" : " d-none")} aria-current="page">New location</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/conferences/new" className={"nav-link" + (conferencePerm ? "" : " d-none")} aria-current="page">New conference</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/presentations/new" className="nav-link" aria-current="page">New presentation</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
