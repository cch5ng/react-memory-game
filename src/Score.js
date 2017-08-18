import React from 'react';
import './App.css';

const Score = () => {
  return (
        <section className="score-panel">
          <ul className="stars">
            <li><i className="fa fa-star"></i></li>
            <li><i className="fa fa-star"></i></li>
            <li><i className="fa fa-star"></i></li>
          </ul>

          <span className="moves">3</span> Moves

            <div className="restart">
            <i className="fa fa-repeat"></i>
          </div>
        </section>
    )
}

export default Score
