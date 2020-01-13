import React from "react"
import { connect } from "react-redux"
import { Middle } from "../containers"
import { Top, Bottom } from "../components"

class Context extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var user = localStorage.getItem("user")
    if (!user) {
      this.props.history.push("/login")
    }
    return (
      <div>
        <Top />
        <Middle />
        <Bottom />
      </div>
    )
  }
}

function mapState(state) {
  return state
}

const actionCreators = {}

const connectedContext = connect(mapState, actionCreators)(Context)
export { connectedContext as Context }
