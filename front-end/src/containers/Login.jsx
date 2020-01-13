import React from "react"
import { connect } from "react-redux"
import { userActions } from "../actions"

import { Button, TextField } from "@material-ui/core"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      passwored: "",
      check: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const {
      target: { name, value }
    } = event
    this.setState(() => ({ [name]: value }))
  }

  handleSubmit() {
    try {
      let err = {}

      if (
        !/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g.test(
          this.state.email
        )
      ) {
        err.message = "아이디나 비밀번호가 잘못되었습니다."
        throw err
      }

      if (this.state.email.length > 60) {
        err.message = "아이디나 비밀번호가 잘못되었습니다."
        throw err
      }

      if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(this.state.password)) {
        err.message = "아이디나 비밀번호가 잘못되었습니다."
        throw err
      }

      const { email, password } = this.state
      if (email && password) {
        this.props.login(email, password)
      }

      if (!this.props.loggedIn) {
        throw "Login failure"
      }

      this.state.email = ""
      this.state.password = ""
    } catch (err) {
      if (String(err) === "Error: Request failed with status code 401") {
        this.setState({
          check: "아이디나 비밀번호가 잘못되었습니다."
        })
      } else {
        this.setState({
          check: err.message
        })
      }
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Login</h2>
          <div>
            <TextField name="email" label="email" onChange={this.handleChange} variant="outlined" />
          </div>
          <br />
          <div>
            <TextField
              name="password"
              label="password"
              onChange={this.handleChange}
              variant="outlined"
              type="password"
            />
          </div>
          <br />
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleSubmit()
              }}
            >
              Login
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.history.push("/sign-up")
              }}
            >
              Sign up
            </Button>
          </div>

          {this.state.check}
        </div>
      </div>
    )
  }
}

function mapState(state) {
  const { loggedIn } = state.authentication
  return { loggedIn }
}

const actionCreators = {
  login: userActions.login
}

const connectedLoginPage = connect(mapState, actionCreators)(Login)
export { connectedLoginPage as Login }
