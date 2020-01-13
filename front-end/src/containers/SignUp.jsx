import React from "react"
import { connect } from "react-redux"
import { userActions } from "../actions"
import { Button, TextField } from "@material-ui/core"

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        email: "",
        password: ""
      },
      check: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    const { user } = this.state
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleSubmit() {
    try {
      const { user } = this.state

      let err = {}

      if (
        !/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/g.test(
          user.email
        )
      ) {
        err.message = "아이디나 비밀번호가 잘못되었습니다."
        throw err
      }

      if (user.email.length > 60) {
        err.message = "아이디나 비밀번호가 잘못되었습니다."
        throw err
      }

      if (!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(user.password)) {
        err.message = "아이디나 비밀번호가 잘못되었습니다."
        throw err
      }

      // var data = JSON.stringify({
      //   email: this.state.email,
      //   password: this.state.password
      // })

      if (user.email && user.password) {
        this.props.register(user)
      }

      if (!this.props.registeration) {
        throw "Sign up failure"
      }

      this.state.user.email = ""
      this.state.user.password = ""
      this.state.check = ""

      // axios.post(API_URL + "/user/sign-up", data, {
      //   headers: { "Content-Type": "application/json" }
      // })
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
          <h2>Sign up</h2>
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
              Sign up
            </Button>
            &nbsp;
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.history.goBack()
              }}
            >
              Back
            </Button>
          </div>
          {this.state.check}
        </div>
      </div>
    )
  }
}

function mapState(state) {
  const { registering } = state.registration
  return { registering }
}

const actionCreators = {
  register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(SignUp)
export { connectedRegisterPage as SignUp }
