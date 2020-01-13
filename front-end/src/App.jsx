import React from "react"
import { Router, Route } from "react-router-dom"
import { connect } from "react-redux"
import { history } from "./helpers"
import { hot } from "react-hot-loader"
import { Login, SignUp, Context } from "./containers"
import { alertActions } from "./actions"
import "./App.css"

class App extends React.Component {
  constructor(props) {
    super(props)
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts()
    })
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Route exact path="/" component={Context} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
        </Router>
      </div>
    )
  }
}

function mapState(state) {
  const { alert } = state
  return { alert }
}

const actionCreators = {
  clearAlerts: alertActions.clear
}

const connectedApp = connect(mapState, actionCreators)(hot(module)(App))
export { connectedApp as App }
