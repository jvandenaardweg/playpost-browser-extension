import * as React from 'react';
import { Button } from '../Button';
import './style.scss';
import { API_BASE_URL } from '../../constants/urls';

interface AppProps {
  url: string;
  title: string;
  description: string;
  documentHtml: string;
  autoSave: boolean;
  autoClose: boolean;
  token: string;
}

interface AppState {
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  playlistItem: Api.PlaylistItem | null;
}

export class SaveArticle extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      isLoading: false,
      isSuccess: false,
      errorMessage: '',
      playlistItem: null as Api.PlaylistItem
    }
  }

  componentDidMount() {
    const { url, autoSave } = this.props;

    // Save the article on mount when the user wants so
    const hasWarningMessage = !!this.getWarningMessage(url);

    // Only auto-save when there is no warning message
    if (!hasWarningMessage && autoSave){
      this.savePlaylistItem();
    }
  }

  componentDidUpdate(prevProps: AppProps, nextState: AppState) {
    const { isSuccess } = this.state;
    const { autoClose } = this.props;

    // If the saving of the article is a success, close the extension if the user wants it
    if (isSuccess && autoClose) {
      setTimeout(() => window.close(), 2000); // Close after 2 seconds, so the user can see the success message
    }
  }

  handleOnClick = async (event: any) => {
    event.preventDefault();
    this.savePlaylistItem();
  }

  savePlaylistItem = () => {
    const { url, documentHtml, token } = this.props;

    return this.setState({ isLoading: true, isSuccess: false, errorMessage: '' }, async () => {
      const postData = { articleUrl: url, documentHtml };

      try {
        const response = await fetch(API_BASE_URL + '/v1/playlist/articles', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(postData)
        })

        const json = await response.json();

        if (!response.ok) {
          throw json;
        }

        return this.setState({ isSuccess: true })

      } catch (err) {
        const errorMessage = (err && err.message) ? err.message : 'Unknown error.';
        this.setState({ errorMessage });
      } finally {
        this.setState({ isLoading: false });
      }
    })
  }

  getWarningMessage(url: string): string {
    if (!url) {
      return 'We could not get the URL from this page.'
    }

    const isHomepage = url.split('/').filter((part: string) => part).length < 3

    if (isHomepage) {
      return 'This page seems to be the homepage of a website. Playpost works the best if you save a specific article page. If you are sure this is an article page, you can safely ignore this message.'
    }
  }

  render() {
    const { isLoading, errorMessage, isSuccess } = this.state;
    const { title, url, description } = this.props;

    const warningMessage = this.getWarningMessage(url);
    const successClass = (isSuccess) ? 'is-success' : '';

    return (
      <div className="SaveArticle">

        {isSuccess && (
          <div className="SaveArticle__success">
            <strong>Successfully saved to your playlist!</strong>
          </div>
        )}

        <div className={`SaveArticle__preview ${successClass}`}>
          <h2 className="SaveArticle__preview-title">{title}</h2>
          {url && <span className="SaveArticle__preview-url">{url}</span>}
          {description && <p className="SaveArticle__preview-description">{description}</p>}
          <div className="SaveArticle__preview-footer">
            {warningMessage && <p className="SaveArticle__warning">{warningMessage}</p>}
            {errorMessage && <p className="SaveArticle__error">{errorMessage}</p>}
            <Button title={(isLoading) ? 'Saving...' : 'Save article'} isPrimary isDisabled={isLoading} onClick={this.handleOnClick} />
          </div>
        </div>
      </div>
    )
  }
}
