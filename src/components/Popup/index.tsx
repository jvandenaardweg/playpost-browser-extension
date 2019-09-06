import * as React from 'react';
import './style.scss';
import { LoginForm } from '../LoginForm';
import { SaveArticle } from '../SaveArticle';
import { Button } from '../Button';

interface AppProps {}

interface AppState {
  articleUrl: string;
  articleTitle: string;
  articleDescription: string;
  documentHtml: string;
  token: string;
  autoSave: boolean;
  autoClose: boolean;
}

interface DocumentData {
  documentHtml: string;
  articleUrl: string;
  articleTitle: string;
  articleDescription: string;
}

export class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      articleUrl: '',
      articleTitle: '',
      articleDescription: '',
      documentHtml: '',
      token: '',
      autoSave: false,
      autoClose: false
    }
  }

  getDataFromDocument(): DocumentData {

    const twitterDescriptionElement = document.getElementsByTagName('meta')['twitter:description']
    const twitterDescription = (twitterDescriptionElement) ? twitterDescriptionElement.content : '';
    const ogDescriptionElement = document.getElementsByTagName('meta')['og:description']
    const ogDescription = (ogDescriptionElement) ? ogDescriptionElement.content : '';
    const metaDescriptionElement = document.getElementsByTagName('meta')['description']
    const metaDescription = (metaDescriptionElement) ? metaDescriptionElement.content : '';
    const description = metaDescription || ogDescription || twitterDescription || '';

    const canonicalUrlElement = document.querySelector('link[rel="canonical"]');
    const canonicalUrlElementHref = (canonicalUrlElement) ? canonicalUrlElement.getAttribute('href') : ''
    const canonicalUrl = (canonicalUrlElementHref && canonicalUrlElementHref !== '/') ? canonicalUrlElementHref : '';
    const windowLocationUrl = window.location.href;
    const url = canonicalUrl || windowLocationUrl || '';

    const twitterTitleElement = document.getElementsByTagName('meta')['twitter:title']
    const twitterTitle = (twitterTitleElement) ? twitterTitleElement.content : '';
    const ogTitleElement = document.getElementsByTagName('meta')['og:title'];
    const ogTitle = (ogTitleElement) ? ogTitleElement.content : '';
    const documentTitle = document.title;
    const title = twitterTitle || ogTitle || documentTitle || '';

    return {
      documentHtml: document.documentElement.outerHTML,
      articleUrl: url,
      articleTitle: title,
      articleDescription: description
    }
  }

  componentDidMount() {
    // Get token from storage
    chrome.storage.sync.get(['token', 'autoSave', 'autoClose'], (items) => {
      if (!items || !items.token) {
        return
      }

      const autoSave = (items.autoSave === 'true');
      const autoClose = (items.autoClose === 'true');

      // Set component state as logged in
      this.setState({ token: items.token, autoSave, autoClose })
    });

    chrome.tabs.executeScript({
      code: '(' + this.getDataFromDocument + ')();' //argument here is a string but function.toString() returns function's code
    }, (results: DocumentData[]) => {
      console.log(results)
      if (!results[0]) return alert('Something went wrong. Please try again.');
      if (!results[0].documentHtml) return alert('We could not analyse the page.')
      if (!results[0].articleUrl) return alert('We could not get a URL.')

      const { documentHtml, articleUrl, articleTitle, articleDescription } = results[0];

      console.log(results[0])

      this.setState({ articleUrl, documentHtml, articleTitle, articleDescription });
    });
  }

  handleOnLoginSuccess = (token: string) => {
    // Save token in local storage
    // Use storage.sync so it's saved on all the user's Chrome browsers on every device
    chrome.storage.sync.set({ token }, () => {
      this.setState({ token });
    });
  }

  handleOnClickOptions = () => {
    chrome.tabs.create({ 'url': `chrome-extension://${chrome.runtime.id}/options.html` });
  }

  handleOnClickClose = () => {
    window.close();
  }

  render() {
    const { articleUrl, documentHtml, token, articleTitle, articleDescription, autoSave, autoClose } = this.state;

    return (
      <div className="Popup">
        <div className="Popup__header">
          <div className="Popup__header-right">
            <svg className="Popup__header-logo" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
              <g fill="none" fillRule="evenodd">
                <rect width="512" height="512" fill="#037DE2" rx="90"/>
                <path fill="#FFF" fillRule="nonzero" d="M117.045 248.037h-14.759a7.377 7.377 0 0 0-7.379 7.378 7.377 7.377 0 0 0 7.38 7.378h14.758a7.377 7.377 0 0 0 7.379-7.378 7.377 7.377 0 0 0-7.38-7.378zm295.166 0h-14.758a7.377 7.377 0 0 0-7.38 7.378 7.377 7.377 0 0 0 7.38 7.378h14.758a7.377 7.377 0 0 0 7.38-7.378 7.377 7.377 0 0 0-7.38-7.378zm-51.654-51.647a7.377 7.377 0 0 0-7.38 7.378v103.293a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.38-7.378V203.768a7.377 7.377 0 0 0-7.38-7.378zm-147.583 0a7.377 7.377 0 0 0-7.38 7.378v103.293a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.379-7.378V203.768a7.377 7.377 0 0 0-7.38-7.378zm-59.033 29.513a7.377 7.377 0 0 0-7.38 7.378v44.268a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.379-7.378v-44.268a7.377 7.377 0 0 0-7.38-7.378zm177.1-59.025a7.377 7.377 0 0 0-7.38 7.378v162.318a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.379-7.378V174.256a7.377 7.377 0 0 0-7.38-7.378zm-59.034 0a7.377 7.377 0 0 0-7.38 7.378v162.318a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.38-7.378V174.256a7.377 7.377 0 0 0-7.38-7.378zm-88.55 0a7.377 7.377 0 0 0-7.379 7.378v162.318a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.378-7.378V174.256a7.377 7.377 0 0 0-7.379-7.378zm118.067-29.512a7.377 7.377 0 0 0-7.38 7.378v221.342a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.379-7.378V144.744a7.377 7.377 0 0 0-7.38-7.378zm-59.034 0a7.377 7.377 0 0 0-7.379 7.378v221.342a7.377 7.377 0 0 0 7.38 7.378 7.377 7.377 0 0 0 7.379-7.378V144.744a7.377 7.377 0 0 0-7.38-7.378z"/>
              </g>
            </svg>
            <h1 className="Popup__header-title"><a href="https://playpost.app/">Playpost</a></h1>
          </div>
          <div className="Popup__header-right">
          {token && (
            <Button onClick={this.handleOnClickOptions} className="Button--is-rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </Button>
          )}
          <Button onClick={this.handleOnClickClose} className="Button--is-rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </Button>
          </div>


        </div>

        {!token && <LoginForm onSuccess={this.handleOnLoginSuccess} />}

        {token && !articleUrl && <div>To use this extension, please open a website.</div>}

        {token && articleUrl && <SaveArticle url={articleUrl} title={articleTitle} description={articleDescription} documentHtml={documentHtml} token={token} autoSave={autoSave} autoClose={autoClose} />}


      </div>
    )
  }
}
