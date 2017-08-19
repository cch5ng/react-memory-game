import React, { Component } from 'react';
import './App.css';
import Score from './Score'
import CardGrid from './CardGrid'

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
        match: true
      },
      { class: "fa fa-leaf",
        show: false,
        open: false,
        match: false
      },
      { class: "fa fa-bomb",
        show: false,
        open: false,
        match: true
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
    score: 0, 
    clickCount: 0
  }

  // bind this
  cardClick = this.cardClick.bind(this)

  //? shuffle cards on componentDidMount(), assume when refresh browser should reset game

  componentDidMount() {
    let shuffledCards = this.shuffle(this.state.allCards)
    this.setState({ allCards: shuffledCards })
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

    this.state.allCards.forEach((card, idx) => {
      console.log('idx: ' + idx + '; class: ' + card.class)
    })

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
        return { allCards, clickCount: 0 }
      })
      console.log('cards are matching')
    } else if (showingCards.length === 2 && showingCards[0].class !== showingCards[1].class) {
      console.log('cards not matching')
      window.setTimeout(() => {
        this.setState(prevState => {
          let allCards = prevState.allCards.map(card => {
            if (card.class === showingCards[0].class || card.class === showingCards[1].class) {
              return { ...card, show: false, open: false }
            } else {
              return card
            }
          })
          return { allCards, clickCount: 0 }
        })
      }, 1250)
    }


    //}

    // 2nd card click (check for match)
    // second click: check if class matches the other card whose open is true
      // then update both cards match to true
      // change both cards show/open to false
      // reset clickCount to 0


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

  render() {
    return (
      <div className="App container">
        <header>
            <h1>Matching Game</h1>
        </header>

        <Score score={this.state.score} />

        <CardGrid allCards={this.state.allCards} activeCards={this.state.activeCards} cardClick={this.cardClick} />
      </div>
    );
  }
}

export default App;
