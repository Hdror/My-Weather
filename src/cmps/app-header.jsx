import React from 'react'
import {withRouter, NavLink } from 'react-router-dom'

class _AppHeader extends React.Component {
  render() {
    return (
      <header className="app-header main-container">
        <div className="main-header flex">

          <div className="logo" onClick={() => this.props.history.push("/")}>
          Get Weather
          </div>
          <nav className="main-nav">
            <NavLink activeClassName="active" className="clean-link" exact to="/">Home</NavLink>
            <NavLink activeClassName="active" className="clean-link" to="/favorite">Favorites</NavLink>
          </nav>
        </div>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader);
