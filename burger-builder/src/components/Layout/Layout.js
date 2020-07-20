import React from 'react'
import Aux from '../hoc/Aux'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {
  return(
    //higher order component as a wrapper. Is a fragment just as good??
    <Aux>
      <Toolbar />
      <SideDrawer />
      <main className={styles.Content} >
        {props.children}
      </main>
    </Aux>
  )
}
export default Layout