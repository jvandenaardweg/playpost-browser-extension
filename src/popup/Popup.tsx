import * as React from 'react';
import './Popup.scss';

interface AppProps {}

interface AppState {
  currentUrl: string
  htmlBase64String: string;
}

export default class Popup extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props, state);

        this.state = {
          currentUrl: '',
          htmlBase64String: ''
        }
    }

    getDataFromDocument() {
      return {
        html: document.body.outerHTML,
        url: window.location.href
      }
  }

    componentDidMount() {

      chrome.tabs.executeScript({
        code: '(' + this.getDataFromDocument + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        if (!results[0]) return alert('Somethinf went wrong. Please try again.');
        if (!results[0].html) return alert('We could not analyse the page.')
        if (!results[0].url) return alert('We could not get a URL.')

        const { html, url } = results[0];

        const htmlBase64String = btoa(html)

        this.setState({ currentUrl: url, htmlBase64String });
    });

      // chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      //   const currentUrl = tabs[0].url;
      //   this.setState({ currentUrl })
      //   chrome.tabs.sendMessage(tabs[0].id, {action: "GET_DOCUMENT_HTML"}, function(response) {
      //     console.log(response);
      //   });
      // });

      // chrome.storage.sync.get('color', function(data) {
      //   console.log('storage data', data);
      // });

    }

    render() {
      const { currentUrl, htmlBase64String } = this.state;

        return (
            <div className="popupContainer">
                <p>Hello, Playpost!</p>
                <p>{currentUrl}</p>
                {/* <p>{htmlBase64String}</p> */}
            </div>
        )
    }
}
