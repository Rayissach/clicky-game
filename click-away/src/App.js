import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import './App.css';
import Wrapper from './components/Wrapper';
import characters from "./characters.json";
import CharacterCard from './components/CharacterCard'




class App extends Component {
  // Setting this.state.friends to the friends json array

  constructor () {
  super()
  this.state = {
      score: 0,
      topScore: 0,
      characters: characters
  };
}

  handleClick (index) {
    let {characters, score, topScore} = this.state;

    if(!characters[index].clicked) {
      characters[index].clicked = true;
      score++;
    } else {
      characters = characters.map((character, index) => {
        character.clicked = false;
        return character;
      });
      topScore = score > topScore ? score : topScore;
      score = 0;
    }

    characters = this.Shuffle(characters)

    this.setState({
      characters, score, topScore
    });
  }

  Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  
  render() {
    return (
      <div>
      
        <Navbar className="navbar">
          <ul>
            <li className="brand">
          <a>Clicky Game</a>
            </li>
            <li className="guess">
              <h1>You Guessed Incorrectly</h1>
            </li>
            <li className="scores">
              <h1>Score:{this.state.score} | Top Score:{this.state.topScore}</h1>
            </li>  
          </ul>
        </Navbar>
        <Wrapper>
        {this.state.characters.map((character, index) => (
          <CharacterCard
            key={index}
            index={index}
            clicked={character.clicked}
            image={character.image}
            handleClick={(index) => {
            this.handleClick(index);
            }}
          />
        ))}
        </Wrapper>
      </div>
    );
  }


}

export default App;
