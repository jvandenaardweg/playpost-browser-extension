import * as React from 'react';
// import './style.scss';

interface AppProps {
  url: string;
  token: string;
}

interface AppState {
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
}

export class SaveArticle extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      isLoading: false,
      isSuccess: false,
      errorMessage: ''
    }
  }

  handleOnClick = async (event: any) => {
    event.preventDefault();
    const { url, token } = this.props;

    return this.setState({ isLoading: true, isSuccess: false, errorMessage: '' }, async () => {
      const postData = { articleUrl: url };

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
    const { isLoading, errorMessage } = this.state;

    return (
      <div>
        {errorMessage && (<p style={{ color: 'red' }}>{errorMessage}</p>)}
        <button type="button" onClick={this.handleOnClick}>{(isLoading) ? 'Saving...' : 'Save article'}</button>
      </div>
    )
  }
}
