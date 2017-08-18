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
        <ul className="deck" onClick={cardClick}>

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

/* 

            <li className="card" >
                <i className="fa fa-diamond"></i>
            </li>
            <li className="card">
                <i className="fa fa-paper-plane-o"></i>
            </li>
            <li className="card match">
                <i className="fa fa-anchor"></i>
            </li>
            <li className="card">
                <i className="fa fa-bolt"></i>
            </li>
            <li className="card">
                <i className="fa fa-cube"></i>
            </li>
            <li className="card match">
                <i className="fa fa-anchor"></i>
            </li>
            <li className="card">
                <i className="fa fa-leaf"></i>
            </li>
            <li className="card">
                <i className="fa fa-bicycle"></i>
            </li>
            <li className="card">
                <i className="fa fa-diamond"></i>
            </li>
            <li className="card">
                <i className="fa fa-bomb"></i>
            </li>
            <li className="card">
                <i className="fa fa-leaf"></i>
            </li>
            <li className="card">
                <i className="fa fa-bomb"></i>
            </li>
            <li className="card open show">
                <i className="fa fa-bolt"></i>
            </li>
            <li className="card">
                <i className="fa fa-bicycle"></i>
            </li>
            <li className="card">
                <i className="fa fa-paper-plane-o"></i>
            </li>
            <li className="card">
                <i className="fa fa-cube"></i>
            </li>

*/