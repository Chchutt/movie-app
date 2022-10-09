import React from 'react';
import { Tabs } from 'antd';

import './index.css';

export class AppHeader extends React.Component {
  state = {
    value: '',
    counter: 1,
    tab: '1',
  };
  onLabelChange = (event) => {
    this.setState(() => {
      return {
        value: event.target.value,
      };
    });
  };

  SwitchTab = () => (
    <Tabs
      defaultActiveKey="1"
      onTabClick={(e) => {
        this.setState((prevState) => ({ ...prevState, tab: e }));
        if (e === '1') {
          this.props.ratedFlag();
        }
        if (e === '2') {
          this.setState((prevState) => {
            let newValue = this.state.counter;
            newValue++;
            return {
              ...prevState,
              counter: newValue,
            };
          });
          this.props.getMovieRated();
        }
      }}
    >
      <Tabs.TabPane tab="Search" key="1" />
      <Tabs.TabPane tab="Rated" key="2" />
    </Tabs>
  );

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.value !== this.state.value &&
      this.state.value.length !== 0 &&
      this.state.value[0] !== ' ' &&
      !this.props.rated
    ) {
      if (this.state.value[0] === ' ' && this.state.value.length > 2) {
        return this.props.getData(this.state.value.slice(0));
      }
      return this.props.getData(this.state.value);
    }
  };

  render() {
    return (
      <header className="header__container">
        <div className={'header__btn_container'}>
          <this.SwitchTab />
        </div>
        {this.state.tab === '1' && (
          <input
            placeholder={'Type to search...'}
            className={'search-bar'}
            autoFocus
            onChange={this.onLabelChange}
            value={this.state.value}
          />
        )}
      </header>
    );
  }
}
