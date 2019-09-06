import * as React from 'react';
import './style.scss';
import { Button } from '../Button';
// import { Button } from '../Button';

interface AppProps { }

interface AppState {
  autoSave: boolean;
  autoClose: boolean;
  token: string;
 }

export class Options extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);

    this.state = {
      autoSave: false,
      autoClose: false,
      token: ''
    }
  }

  componentDidMount() {
    chrome.storage.sync.get(['token', 'autoSave', 'autoClose'], (items) => {
      if (!items || !items.token) {
        return
      }

      const autoSave = (items.autoSave === 'true');
      const autoClose = (items.autoClose === 'true');

      // Set component state as logged in
      this.setState({ token: items.token, autoSave, autoClose })
    });
  }

  handleOnChangeSettingAutoSave = () => {
    const autoSave = !this.state.autoSave; // toggle
    const autoSaveString = autoSave.toString();

    chrome.storage.sync.set({ autoSave: autoSaveString }, () => {
      this.setState({ autoSave });
    });
  }

  handleOnChangeSettingAutoClose = () => {
    const autoClose = !this.state.autoClose; // toggle
    const autoCloseString = autoClose.toString();

    chrome.storage.sync.set({ autoClose: autoCloseString }, () => {
      this.setState({ autoClose });
    });
  }

  handleOnClickLogout = () => {
    chrome.storage.sync.remove('token', () => {
      this.setState({ token: '' });
    });
  }

  render() {
    const { autoSave, autoClose, token } = this.state;

    return (
      <div className="Options">
        <h1>options!</h1>
        <h2>Account:</h2>
        {!token && <p>You are not logged in. Open the extension to login.</p>}
        {token && <Button title="Logout" onClick={this.handleOnClickLogout} />}

        <h2>Options:</h2>
        <div className="Popup__footer-option">
          <div><label><input type="checkbox" name="auto-save" onChange={this.handleOnChangeSettingAutoSave} checked={autoSave} />Auto save when opening</label></div>
          <div><label><input type="checkbox" name="auto-close" onChange={this.handleOnChangeSettingAutoClose} checked={autoClose} />Auto close when saved</label></div>
        </div>

        <h1>Apps</h1>
        <button type="button">Download iPhone App</button>
        <button type="button">Download Android App</button>
      </div>
    )
  }
}
