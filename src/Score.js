import React from 'react';
import './App.css';

const Score = (props) => {
  return (
        <section className="score-panel">
          <ul className="stars">
            {props.stars.map((item, idx) => (
              <li key={idx}><i className="fa fa-star"></i></li>
            ))}
          </ul>

          <span className="moves">{props.moves}</span> Moves
            <div className="restart" onClick={props.reset}>
            <i className="fa fa-repeat"></i>
          </div>
        </section>
    )
}

export default Score

// <li><i className="fa fa-star"></i></li>
// <li><i className="fa fa-star"></i></li>
// <li><i className="fa fa-star"></i></li>
