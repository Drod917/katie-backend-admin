import React from "react"
import { Link } from "gatsby"
import styles from "./header.module.css"
import AuthContext from '../../context/auth-context';

const Header = () => (
  <AuthContext.Consumer>
    {context => (
      <header className={styles.header}>
        <div className={styles[`header__wrap`]}>
          <h1 className={styles[`header__heading`]}>
            <Link
              to="/"
              className={`${styles[`header__link`]} ${
                styles[`header__link--home`]
              }`}
            >
<<<<<<< HEAD
              {`Queue`}
=======
              {`Booking App`}
>>>>>>> 36ccfb50b349fd49906ce0d749b6a00dc67a35c4
            </Link>
          </h1>
          <nav role="main" className={styles[`header__nav`]}>
            <Link to="/app/bookings" className={styles[`header__link`]}>
<<<<<<< HEAD
              {`Bookings`}
=======
              View Bookings
>>>>>>> 36ccfb50b349fd49906ce0d749b6a00dc67a35c4
            </Link>
            {/* {context.token && <Link to="/app/bookings" className={styles[`header__link`]}>
              Bookings
            </Link>} */}
          </nav>
        </div>
      </header>
    )}
  </AuthContext.Consumer>
)

export default Header;
