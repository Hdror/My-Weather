import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { AppHeader } from './cmps/app-header.jsx'
import { HomePage } from './pages/home-page.jsx'
import { FavoritePage } from './pages/favorites-page.jsx'
// import { AppFooter } from './cmps/app-footer.jsx'

export class RootCmp extends React.Component {

  render() {
    return (
      <>
        <AppHeader />

        <Switch>
          <Route component={FavoritePage} path="/favorite" />
          <Route component={HomePage} exact path="/:cityId" />
          <Route component={HomePage} exact path="/" />
        </Switch>
        {/* <AppFooter /> */}
        {/* <div onClick={() => { this.props.toggleModal() }} className={this.props.isModalOpen ? "screen open" : "screen"}></div> */}
      </>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     isModalOpen: state.pageModule.isModalOpen
//   }
// }

// const mapDispatchToProps = {
//   toggleModal
// }

// export const RootCmp = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_RootCmp)