import * as React from 'react';
import './style.scss';
import { LoginForm } from '../LoginForm';
import { SaveArticle } from '../SaveArticle';
import { Button } from '../Button';

interface AppProps {}

interface AppState {
  articleUrl: string
  documentHtml: string;
  token: string;
}

export class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      articleUrl: '',
      documentHtml: '',
      token: ''
    }
  }

  getDataFromDocument() {
    return {
      documentHtml: document.documentElement.outerHTML,
      articleUrl: window.location.href
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
      if (!results[0].documentHtml) return alert('We could not analyse the page.')
      if (!results[0].articleUrl) return alert('We could not get a URL.')

      const { documentHtml, articleUrl } = results[0];

      console.log(results[0])

      this.setState({ articleUrl, documentHtml });
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
    const { articleUrl, documentHtml, token } = this.state;

    return (
      <div className="Popup">
        {!token && <LoginForm onSuccess={this.handleOnLoginSuccess} />}
        {token && articleUrl && <SaveArticle articleUrl={articleUrl} documentHtml={documentHtml} token={token} />}
        {token && <h1>Logged in</h1>}
        {token && <Button title="Logout" onClick={this.handleOnClickLogout} />}
      </div>
    )
  }
}
