import React from 'react';
import PropType from 'prop-types';

import { ItemAdds } from '../ItemAdds';
import './index.scss';

export class Item extends React.Component {
  imageChecker = () => {
    if (!this.props.avatar) {
      return <img className="preview" src={'/img/no-image.svg'} alt={'pic'} />;
    } else {
      return <img className="preview" src={`https://image.tmdb.org/t/p/w500/${this.props.avatar}`} alt={'pic'} />;
    }
  };

  render() {
    let votes = this.props.rating;
    let circleRate = this.props.vote;
    return (
      <div className="item">
        {this.imageChecker()}
        <ItemAdds
          genre_ids={this.props.genre_ids}
          circleRate={circleRate}
          rated={this.props.rated}
          rating={this.props.rating}
          vote={votes}
          sessionId={this.props.sessionId}
          filmsArray={this.props.filmsArray}
          id={this.props.id}
          date={this.props.date}
          title={this.props.title}
          description={this.props.description}
        />
      </div>
    );
  }
}
Item.propTypes = {
  genre_ids: PropType.array,
  circleRate: PropType.number,
  rated: PropType.bool,
  rating: PropType.number,
  vote: PropType.number,
  sessionId: PropType.string,
  filmsArray: PropType.array,
  loading: PropType.bool,
  id: PropType.number,
  avatar: PropType.string,
  date: PropType.string,
  title: PropType.string,
  description: PropType.string,
};
