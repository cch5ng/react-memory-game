import React, { Component } from 'react';
import './App.css';
import Score from './Score'
import CardGrid from './CardGrid'

const Modal = (props) => {
  return (
    <div className="modal">
      <span className="bold">Congratulations!</span> <br />
      Time: {props.time} <br />
      Stars: <ul className="stars">
            {props.stars.map((item, idx) => (
              <li key={idx}><i className="fa fa-star"></i></li>
            ))}
          </ul> 
      <br />

      <button className="playBtn" onClick={props.reset} >Play Again</button>

    </div>
  )
}

class App extends Component {
  state = {
    allCards: [
      { class: "fa fa-diamond",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-paper-plane-o",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-anchor",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bolt",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-cube",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-anchor",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-leaf",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bicycle",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-diamond",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bomb",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-leaf",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bomb",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bolt",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bicycle",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-paper-plane-o",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-cube",
        show: false,
        open: false,
        match: false
      },
    ], // {class: "", show: bool, open: bool, match: bool}
    activeCardIds: [],
    clickCount: 0,
    showWinModal: false,
    stars: [0, 0, 0],
    moves: 0,
    time: 0,
    defaultCards: [
      { class: "fa fa-diamond",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-paper-plane-o",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-anchor",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bolt",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-cube",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-anchor",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-leaf",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bicycle",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-diamond",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bomb",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-leaf",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bomb",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bolt",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bicycle",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-paper-plane-o",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-cube",
        show: false,
        open: false,
        match: false
      },
    ]
  }

  // bind this
  cardClick = this.cardClick.bind(this)
  reset = this.reset.bind(this)
  updateTime = this.updateTime.bind(this)
  startTimer = this.startTimer.bind(this)

  //? shuffle cards on componentDidMount(), assume when refresh browser should reset game

  componentDidMount() {
    let shuffledCards = this.shuffle(this.state.allCards)
    this.setState({ allCards: shuffledCards })
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
  cardClick(mid) {
    const id = parseInt(mid, 10)

    // used for game testing
    // this.state.allCards.forEach((card, idx) => {
    //   console.log('idx: ' + idx + '; class: ' + card.class)
    // })

    // 1 first card click
    // check 2nd card clicked is not first flipped card
    //
    if (this.state.clickCount <= 1 && id !== this.state.activeCardIds[0]) {
      let updateCard = { ...this.state.allCards[id], show: true, open: true }

      this.setState(prevState => {
        let allCards = prevState.allCards.map((card, idx) => {
          return (idx === id ? updateCard : card)
        })
        let activeCardIds = [...prevState.activeCardIds, id]

        return { allCards, clickCount: prevState.clickCount + 1, activeCardIds }
      })
    }

    let showingCards = this.state.allCards.filter((card, idx) => {
      return card.show === true || idx === id
    })

    if (showingCards.length === 2 && showingCards[0].class === showingCards[1].class) {
      // TODO refactor
      this.setState(prevState => {
        let allCards = prevState.allCards.map(card => {
          if (card.class === showingCards[0].class) {
            return { ...card, show: false, open: false, match: true }
          } else {
            return card
          }
        })
        let showWinModal = this.checkGameWon();
        if (showWinModal) {
          clearInterval(this.timerId)
        }
        let moves = prevState.moves + 1
        let stars = prevState.stars
        if (moves === 4) {
          stars = [0, 0]
        } else if (moves === 8) {
          stars = [0]
        }
        return { allCards, clickCount: 0, showWinModal, moves, stars }
      })
    } else if (showingCards.length === 2 && showingCards[0].class !== showingCards[1].class) {
      window.setTimeout(() => {
        this.setState(prevState => {
          let allCards = prevState.allCards.map(card => {
            if (card.class === showingCards[0].class || card.class === showingCards[1].class) {
              return { ...card, show: false, open: false }
            } else {
              return card
            }
          })

          let moves = prevState.moves + 1
          let stars = prevState.stars
          if (moves === 4) {
            stars = [0, 0]
          } else if (moves === 8) {
            stars = [0]
          }
          return { allCards, clickCount: 0, moves, stars }
        })
      }, 1250)
    }
  }

  // reset the game from the modal
  reset() {
    this.setState(prevState => {
      let showWinModal = prevState.showWinModal
      if (showWinModal) {
        showWinModal = false
      }
      let stars = [0, 0, 0]
      let moves = 0
      let allCards = this.shuffle(prevState.defaultCards)
      let clickCount = 0
      let activeCardIds = []
      let time = 0
      return { showWinModal, stars, moves, allCards, clickCount, activeCardIds, time }
    })

    clearInterval(this.timerId)
    this.startTimer()
  }

/*
 * Create a list that holds all of your cards
 */


  // function to update the score

  // HELPERS
  // className attribute parser (need to get the shape)

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }

  checkGameWon() {
    let won = false;
    let counter = 0;

    for (var i = 0; i < this.state.allCards.length; i++) {
      if (this.state.allCards[i].match) {
        counter += 1
        // TODO refactor, this is working to display modal but not really great
        if (counter >= 13) {
          return true
          //break
        }
      }
    }
    return won;
  }

  startTimer() {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        return { time: prevState.time + 1 }
      })
    }, 1000)
  }

  updateTime() {
    this.setState(prevState => {
      return { time: prevState.time + 1 }
    })
  }

  // given time (ms) returns a nice string (min:sec)
  prettyTime(timeSec) {
    let prettyStr;
    let minInt;
    let secInt;

// TODO check this; min off when timeSec % 60 === 0
    minInt = timeSec % 60 === 0 ? Math.ceil(timeSec / 60) : Math.ceil(timeSec / 60 - 1)
    secInt = timeSec % 60

    prettyStr = this.prefixZero(minInt.toString()) + ':' + this.prefixZero(secInt.toString())
    return prettyStr
  }

  prefixZero(timeStr) {
    let timeStrNew;

    timeStr.length === 1 ? timeStrNew = '0' + timeStr : timeStrNew = timeStr

    return timeStrNew;
  }

  render() {
    return (
      <div className="App container">
        <header>
            <h1>Matching Game</h1>
        </header>

        <Score stars={this.state.stars} moves={this.state.moves} reset={this.reset} time={this.prettyTime(this.state.time)} />

        <CardGrid allCards={this.state.allCards} activeCards={this.state.activeCards} cardClick={this.cardClick} />

        { this.state.showWinModal && (
            <Modal stars={this.state.stars} reset={this.reset} time={this.prettyTime(this.state.time)}  />
        )}

      </div>
    );
  }
}

export default App;
