import * as React from 'react';
import './style.scss';
import { LoginForm } from '../LoginForm';
import { SaveArticle } from '../SaveArticle';

interface AppProps {}

interface AppState {
  currentUrl: string
  htmlBase64String: string;
  token: string;
}

export class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      currentUrl: '',
      htmlBase64String: '',
      token: ''
    }
  }

  getDataFromDocument() {
    return {
      html: document.body.outerHTML,
      url: window.location.href
    }
  }

  componentDidMount() {
    // Get token from storage
    chrome.storage.sync.get(['token'], (items) => {
      if (!items || !items.token) {
        return
      }

      // Set component state as logged in
      this.setState({ token: items.token })
    });

    chrome.tabs.executeScript({
      code: '(' + this.getDataFromDocument + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
      if (!results[0]) return alert('Somethinf went wrong. Please try again.');
      if (!results[0].html) return alert('We could not analyse the page.')
      if (!results[0].url) return alert('We could not get a URL.')

      const { html, url } = results[0];

      this.setState({ currentUrl: url });
    });
  }

  handleOnLoginSuccess = (token: string) => {
    // Save token in local storage
    // Use storage.sync so it's saved on all the user's Chrome browsers on every device
    chrome.storage.sync.set({ token }, () => {
      this.setState({ token });
    });
  }

  handleOnClickLogout = () => {
    chrome.storage.sync.remove('token', () => {
      this.setState({ token: '' });
    });
  }

  render() {
    const { currentUrl, htmlBase64String, token } = this.state;

    return (
      <div className="Popup">
        {!token && <LoginForm onSuccess={this.handleOnLoginSuccess} />}
        {token && currentUrl && <SaveArticle url={currentUrl} token={token} />}
        {token && <button type="button" onClick={this.handleOnClickLogout}>Logout</button>}
      </div>
    )
  }
}
