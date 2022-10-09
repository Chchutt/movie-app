import React from 'react';
import { Spin } from 'antd';

import { Item } from '../Item';
import './index.css';
import { ErrorAlert } from '../ErrorPage';

export class ItemList extends React.Component {
  maxId = 100;
  element = '';

  dataSwitch = (data) => {
    this.element =
      data &&
      data.length > 0 &&
      data.slice(this.props.minValue, this.props.maxValue).map((item) => {
        const { poster_path, release_date, original_title, overview, id, vote_average, rating, genre_ids } = item;
        return (
          <Item
            genre_ids={genre_ids}
            rated={this.props.rated}
            rating={rating}
            vote={vote_average}
            sessionId={this.props.sessionId}
            filmsArray={this.props.filmsArray}
            loading={this.props.loading}
            id={id}
            key={this.maxId++}
            avatar={poster_path}
            date={release_date}
            title={original_title}
            description={this.props.shortText(overview)}
          />
        );
      });
  };
  render() {
    if (this.props.loading) {
      return (
        <div className={'spinner'}>
          <Spin size={'large'} />
        </div>
      );
    }
    if (this.props.data.length === 0) {
      return <ErrorAlert />;
    }

    if (this.props.rated) {
      this.dataSwitch(this.props.dataRated);
      return <div className="itemList">{this.element}</div>;
    }

    if (!this.props.rated) {
      this.dataSwitch(this.props.data);
      return <div className="itemList">{this.element}</div>;
    }
  }
}
