import { Rectangle, Column, RowLayout, Window } from 'react-qml';
import { connect } from 'react-redux';
import * as React from 'react';

import AddAccountButton from '../components/AddAccountButton.qml';
import ErrorBoundary from '../components/ErrorBoundary';
import AppMenu from './AppMenu';

const connectToRedux = connect(
  state => ({
    value: state.counter,
  }),
  {
    onIncrement: () => ({ type: 'INCREMENT' }),
    onDecrement: () => ({ type: 'DECREMENT' }),
  }
);

class MainWindow extends React.Component {
  state = {
    signinWindowVisible: false,
  };

  showSigninWindow = () => {
    this.setState({ signinWindowVisible: true });
  };

  hideSigninWindow = () => {
    this.setState({ signinWindowVisible: false });
  };

  onSiginWindowClosing = ev => {
    // ev.accepted = false;
    this.hideSigninWindow();
  };

  render() {
    const { signinWindowVisible } = this.state;
    return (
      <Window
        visible
        width={800}
        height={600}
        title="Tey"
        flags={Qt.Window | Qt.WindowFullscreenButtonHint}
      >
        <ErrorBoundary>
          <AppMenu />
          <RowLayout anchors={{ fill: 'parent' }} spacing={0}>
            <Rectangle
              width={68}
              Layout={{
                fillHeight: true,
              }}
              color="#191F26"
            >
              <Column>
                <AddAccountButton
                  width={36}
                  height={36}
                  x={16}
                  y={16}
                  onClicked={this.showSigninWindow}
                />
                <AddAccountButton
                  width={36}
                  height={36}
                  x={16}
                  y={16}
                  onClicked={this.hideSigninWindow}
                />
              </Column>
            </Rectangle>
            <Rectangle
              width={220}
              Layout={{
                fillHeight: true,
              }}
              color="#323E4C"
            />
            <Rectangle
              Layout={{
                fillWidth: true,
                fillHeight: true,
              }}
              color="#FFFFFF"
            />
          </RowLayout>
          {/* <SignInWindow
            visible={signinWindowVisible}
            onClosing={this.onSiginWindowClosing}
          /> */}
        </ErrorBoundary>
      </Window>
    );
  }
}

export default connectToRedux(MainWindow);