import React, { Component } from 'react';
import classNames from 'classnames'
import './App.css';

class CardGrid extends Component {

  // HELPERS
  getClass(cardId) {
    let liClass = classNames({
      card: true,
      'show': this.props.allCards[cardId].show,
      'open': this.props.allCards[cardId].open,
      'match': this.props.allCards[cardId].match
    })

    return liClass
  }

  render() {
    const { cardClick, allCards } = this.props

    return (
      <ul className="deck" onClick={(ev) => cardClick(ev.target.id)}>

        {allCards.map((card, idx) => (
          <li className={this.getClass(idx)} key={idx} id={idx} >
            <i className={card.class}></i>
          </li>
        ))}

      </ul>
    )
  }
}

export default CardGrid
