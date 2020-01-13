import React from "react"
import { connect } from "react-redux"
import { userActions } from "../actions"
import { Button } from "@material-ui/core"

class Middle extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    if (localStorage.getItem("user")) {
      this.props.logout()
    }
  }

  render() {
    return (
      <div>
        --- Middle ---
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.handleSubmit()
          }}
        >
          Logout
        </Button>
      </div>
    )
  }
}

function mapState(state) {
  return state
}

const actionCreators = {
  logout: userActions.logout
}

const connectedContext = connect(mapState, actionCreators)(Middle)
export { connectedContext as Middle }
