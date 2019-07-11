import * as React from 'react';
import './style.scss';
import { Button } from '../Button';

interface AppProps {
  onSuccess(token: string): void;
}

interface AppState {
  email: string;
  password: string;
  token: string;
  isLoading: boolean;
  errorMessage: string;
}

export class LoginForm extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      email: '',
      password: '',
      token: '',
      isLoading: false,
      errorMessage: ''
    }
  }

  handleOnChange = (field: string, value: string) => {
    if (field === 'email') return this.setState({ email: value });
    if (field === 'password') return this.setState({ password: value });
  }

  handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = this.state;

    return this.setState({ isLoading: true }, async () => {
      const postData = {
        email,
        password
      }
  
      try {
        const response = await fetch('https://api.playpost.app/v1/auth', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData)
        })

        const json = await response.json();

        if (!response.ok) {
          throw json;
        }

        const token = json && json.token;

        return this.setState({ token }, () => this.props.onSuccess(token));
      } catch (err) {
        const errorMessage = (err && err.message) ? err.message : 'An uknown error happened while logging in. Please try again.';
        this.setState({ errorMessage })
      } finally {
        this.setState({ isLoading: false });
      }
    })
  }

  render() {
    const { email, password, isLoading, token, errorMessage } = this.state;

    return (
      <form className="LoginForm" onSubmit={this.handleOnSubmit}>
        <h1>Login to Playpost</h1>
        <p>Login to your Playpost account to share articles from your browser to your playlist.</p>
        <fieldset disabled={isLoading} className="LoginForm-fieldset">
          <label className="LoginForm-label" htmlFor="email">E-mail address</label>
          <input className="LoginForm-input" type="text" id="email" placeholder="Your e-mail address" onChange={event => this.handleOnChange('email', event.target.value)} />

          <label className="LoginForm-label" htmlFor="password">Password</label>
          <input className="LoginForm-input" type="password" id="password" placeholder="Your password" onChange={event => this.handleOnChange('password', event.target.value)} />

          {errorMessage && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
          <Button title={(isLoading) ? 'Logging in...' : 'Login'} type="submit" className="LoginForm-button" onClick={this.handleOnSubmit} disabled={isLoading} />
        </fieldset>
        <p>{token}</p>
      </form>
    )
  }
}
