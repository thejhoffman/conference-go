const Nav = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href={props.navItems.rootHost}>Conference GO!</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href={props.navItems.rootHost}>Home</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link" + (props.navItems.locationPerm ? "" : " d-none")} aria-current="page" href={props.navItems.rootHost + "new-location.html"}>New location</a>
              </li>
              <li className="nav-item">
                <a className={"nav-link" + (props.navItems.conferencePerm ? "" : " d-none")} aria-current="page" href={props.navItems.rootHost + "new-conference.html"}>New conference</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href={props.navItems.rootHost + "new-presentation.html"}>New presentation</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
