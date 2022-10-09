import React from 'react';
import { Pagination } from 'antd';

import './index.css';
import { ItemList } from '../ItemList';
import { getMovieData, getMovieGanresData } from '../../apis/MovieAPI';
import { AppHeader } from '../AppHeader';
// eslint-disable-next-line no-unused-vars
import { debounceUtils } from '../../utils/debounce-utils';
import { ErrorConnection } from '../ErrorPage';
import { movieRatedApi } from '../../apis/GuestTokenAPI';
import { GenreDataProvider } from '../ContextProvider';

export default class App extends React.Component {
  minId = 40;
  state = {
    data: [],
    dataRated: [],
    loading: false,
    error: false,
    minValue: 0,
    maxValue: 6,
    rated: false,
    genres: '',
  };

  constructor() {
    super();
    this.state.sessionId = localStorage.getItem('session_id') ? localStorage.getItem('session_id') : movieRatedApi();
  }
  onError = () => {
    this.setState(() => {
      return {
        error: true,
      };
    });
  };

  shortText = (text) => {
    if (text.length >= 210) {
      return text.slice(0, 210) + '...';
    } else {
      return text;
    }
  };

  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * 6,
      maxValue: value * 6,
    });
  };
  ratedFlag = () => {
    this.setState(() => {
      const newValue = false;
      return {
        rated: newValue,
      };
    });
  };
  componentDidMount() {
    getMovieGanresData().then((res) => this.setState((prevState) => ({ ...prevState, genres: res.genres })));
    this.getData('return');
  }

  getData = (text = ' ') => {
    this.setState({ loading: true });
    getMovieData(text)
      .catch(() => this.setState({ error: true }))
      .then((res) => {
        this.setState(() => {
          try {
            const newArray = [...res.results];
            return {
              data: newArray,
              loading: false,
            };
          } catch (e) {
            return this.onError();
          }
        });
      });
  };

  getMovieRated = () => {
    this.setState({ loading: true });
    getMovieData('', this.state.sessionId).then((res) =>
      this.setState(() => {
        const newRateData = res.results;
        return {
          dataRated: newRateData,
          rated: true,
          loading: false,
        };
      })
    );
  };
  render() {
    if (this.state.error) {
      return (
        <div className="main-container">
          <AppHeader value={this.state.value} getData={debounceUtils(this.getData, 2000)} />
          <ErrorConnection />
        </div>
      );
    }
    return (
      <div className="main-container">
        <GenreDataProvider value={this.state.genres}>
          <AppHeader
            getMovieRated={() => this.getMovieRated()}
            rated={this.state.rated}
            getData={debounceUtils(this.getData, 2000)}
            ratedFlag={this.ratedFlag}
          />
          <ItemList
            rated={this.state.rated}
            dataRated={this.state.dataRated}
            sessionId={this.state.sessionId}
            filmsArray={this.filmsArray}
            minValue={this.state.minValue}
            maxValue={this.state.maxValue}
            data={this.state.data}
            loading={this.state.loading}
            onError={this.onError}
            error={this.state.error}
            shortText={this.shortText}
          />
          {this.state.data.length > 6 && (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={6} //default size of page
              onChange={this.handleChange}
              total={this.state.data.length} //total number of card data available
              style={{ textAlign: 'center' }}
            />
          )}
        </GenreDataProvider>
      </div>
    );
  }
}
