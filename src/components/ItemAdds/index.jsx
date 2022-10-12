import React from 'react';
import './index.scss';
import { Rate, Tag } from 'antd';

import { movieRate } from '../../apis/GuestTokenAPI';
import { GenreDataConsumer } from '../ContextProvider';

export class ItemAdds extends React.Component {
  state = {
    counter: 0,
    incomeRate: this.props.vote,
    value: this.props.vote,
    color: '',
  };
  onRateChange = (value, id) => {
    localStorage.setItem(id, value);
    this.setState((prevState) => {
      return {
        ...prevState,
        value,
      };
    });
  };

  colorChanger = (vote) => {
    if (vote < 3) {
      this.setState(() => {
        return {
          color: '#E90000',
        };
      });
    }
    if (vote < 5 && vote > 3) {
      this.setState(() => {
        return {
          color: '#E97E00',
        };
      });
    }
    if (vote < 7 && vote > 5) {
      this.setState(() => {
        return {
          color: '#E9D100',
        };
      });
    }
    if (vote >= 7) {
      this.setState(() => {
        return {
          color: '#66E900',
        };
      });
    }
  };

  componentDidMount() {
    this.colorChanger(this.props.circleRate);
  }
  render() {
    const { title, date, description, id, sessionId, genre_ids } = this.props;
    console.log(id);
    return (
      <GenreDataConsumer>
        {(genres) => {
          const films = genre_ids.map((elem) => {
            let fi;
            genres.forEach((ge) => {
              if (ge.id === elem) {
                return (fi = ge.name);
              }
            });
            return fi;
          });
          return (
            <div className="adds">
              <div className="round" style={{ borderColor: this.state.color }}>
                {this.props.circleRate.toPrecision(2)}
              </div>
              <span className="ad title">{title}</span>
              <span className="ad date">{date}</span>
              <div className="btn-container">
                {films.slice(0, 2).map((elem, index) => {
                  return (
                    <Tag className={'btn'} key={index}>
                      {elem}
                    </Tag>
                  );
                })}
              </div>
              <span className="ad text">{description}</span>
              <div className="stars">
                <Rate
                  allowHalf={true}
                  count={10}
                  onChange={(value) => {
                    this.onRateChange(value, id);

                    movieRate({ id, sessionId, value });
                  }}
                  style={{ paddingTop: '3px', fontSize: '15px' }}
                  value={this.state.value || +localStorage.getItem(id)}
                />
              </div>
            </div>
          );
        }}
      </GenreDataConsumer>
    );
  }
}
