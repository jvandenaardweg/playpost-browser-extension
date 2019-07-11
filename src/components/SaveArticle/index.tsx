import * as React from 'react';
import { Button } from '../Button';
// import './style.scss';

interface AppProps {
  articleUrl: string;
  documentHtml: string;
  token: string;
}

interface AppState {
  isLoading: boolean;
  isLoadingRemovePlaylistItem: boolean;
  isSuccessRemovePlaylistItem: boolean;
  isSuccess: boolean;
  errorMessage: string;
  playlistItem: Api.PlaylistItem | null;
}

export class SaveArticle extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      isLoading: false,
      isLoadingRemovePlaylistItem: false,
      isSuccessRemovePlaylistItem: false,
      isSuccess: false,
      errorMessage: '',
      playlistItem: null as Api.PlaylistItem
    }
  }

  componentDidMount() {
    // Save the article on mount
    this.savePlaylistItem();
  }

  handleOnClick = async (event: any) => {
    event.preventDefault();
    this.savePlaylistItem();
  }

  handleOnClickRemove = (event: any) => {
    event.preventDefault();
    this.removePlaylistItem();
  }

  removePlaylistItem = () => {
    const { token } = this.props;
    const { playlistItem } = this.state;

    return this.setState({ isLoadingRemovePlaylistItem: true, isSuccessRemovePlaylistItem: false, errorMessage: '' }, async () => {
      try {
        const response = await fetch(`https://api.playpost.app/v1/playlist/articles/${playlistItem.article.id}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        const json = await response.json();

        if (!response.ok) {
          throw json;
        }

        return this.setState({ isSuccessRemovePlaylistItem: true })

      } catch (err) {
        const errorMessage = (err && err.message) ? err.message : 'Unknown error.';
        this.setState({ errorMessage });
      } finally {
        this.setState({ isLoadingRemovePlaylistItem: false });
      }
    })
  }

  savePlaylistItem = () => {
    const { articleUrl, documentHtml, token } = this.props;

    return this.setState({ isLoading: true, isSuccess: false, errorMessage: '' }, async () => {
      const postData = { articleUrl, documentHtml };

      try {
        const response = await fetch('https://api.playpost.app/v1/playlist/articles', {
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

  render() {
    const { isLoading, errorMessage, isSuccess } = this.state;

    return (
      <div>
        {errorMessage && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
        {isSuccess && (<p style={{ color: 'green' }}>Article saved to your playlist!</p>)}
        {!isSuccess && <Button title={(isLoading) ? 'Saving...' : 'Retry'} onClick={this.handleOnClick} />}
      </div>
    )
  }
}
