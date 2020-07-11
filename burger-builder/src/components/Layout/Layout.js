import React from 'react'
import Aux from '../hoc/Aux'
import styles from './Layout.module.css'

const Layout = (props) => {
  return(
    //higher order component as a wrapper. Is a fragment just as good??
    <Aux>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={styles.Content} >
        {props.children}
      </main>
    </Aux>
  )
}
export default Layout