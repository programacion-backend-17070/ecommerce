const NavComponent = () => {
  return(
    <nav  className="uk-navbar-container" id="navbar" uk-navbar="">
      <div  className="uk-navbar-left">
        <ul  className="uk-navbar-nav uk-margin-remove">
          <li  className="uk-active"><a href="/">Home</a></li>
          <li><a href="/">Carrito<span  className="uk-label" id="cart-badge">0</span></a></li>
          <li><a href="/">Cuenta</a>
            <div  className="uk-navbar-dropdown">
              <ul  className="uk-nav uk-navbar-dropdown-nav">
                <li><a href="/">Perfil</a></li>
                <li><a href="/admin">Admin</a></li>
                <li><a href="/logout">Logout</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavComponent
