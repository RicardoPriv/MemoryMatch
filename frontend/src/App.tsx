import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header'
import Analytics from './components/analytics'
import MatchBoard from './components/matchboard/matchboard'
import GameWon from './components/status/gameWon'
import GameOver from './components/status/gameOver'
import type { GameState } from './types/gameState'
import { GAME_STATUS } from './config/status'
import { getCardCountForLevel, loadXCards, shuffleCards } from './config/gameLogic'

const maxFailAttempts: number = 10;
const newGameLevel: number = 1;
const gs = {
  cardsData: [],
  currentScore: 0,
  bestScore: 0,
  status: GAME_STATUS.IDLE,
  level: newGameLevel
}
const scoreGain = 1;


function App() {
  const [gameState, setGameState] = useState<GameState>(gs)

  function startNewGame() {
    loadLevel(newGameLevel);
  }

  async function loadLevel(level: number) {
    setGameState((previous) => {
      return {
        ...previous,
        status: GAME_STATUS.LOADING
      }
    })

    const cardsData = await loadXCards(maxFailAttempts, level);

    if (cardsData.length === getCardCountForLevel(level)) {
      setGameState((previous) => {
        const bScore = previous.bestScore < previous.currentScore ? previous.currentScore : previous.bestScore;

        return {
          ...previous,
          cardsData: cardsData,
          currentScore: 0,
          bestScore: bScore,
          status: GAME_STATUS.PLAYING,
          level: level
        }
      })
    } else {
      setGameState((previous) => {
        return {
          ...previous,
          status: GAME_STATUS.ERROR,
        };
      })
    }
  }

  function handleCardClick(cardIndex: number) {
    const shuffle = gameState.cardsData.map((card) => {
      return { ...card };
    })

    if (shuffle[cardIndex].clicked) {
      setGameState((previous) => {
        return {
          ...previous,
          status: GAME_STATUS.LOST
        }
      })
      return;
    } else {
      shuffle[cardIndex].clicked = true;
    }

    shuffleCards(shuffle);

    setGameState((previous) => {
      let st = previous.status;
      if (previous.currentScore + scoreGain === previous.cardsData.length) {
        st = GAME_STATUS.WON;
      }

      return {
        ...previous,
        cardsData: shuffle,
        currentScore: previous.currentScore + scoreGain,
        status: st
      }
    });
  }

  useEffect(() => {
    startNewGame();
  }, [])

  function loading() { return (gameState.status === GAME_STATUS.LOADING) }
  function playing() { return (gameState.status === GAME_STATUS.PLAYING) }
  function error() { return (gameState.status === GAME_STATUS.ERROR) }
  function gameWon() { return (gameState.status === GAME_STATUS.WON) }
  function gameOver() { return (gameState.status === GAME_STATUS.LOST) }

  return (
    <main>
      <Header />
      <Analytics totalScore={gameState.cardsData.length * scoreGain} currentScore={gameState.currentScore} bestScore={gameState.bestScore} handleNewGameClick={startNewGame} />
      {loading() && <h2 className="board-surface loading-text">Loading...</h2>}
      {error() && <h2 className="board-surface loading-text">Unable to load Pokemon data.</h2>}
      {playing() && <MatchBoard cardsData={gameState.cardsData} handleCardClick={handleCardClick} />}
      {gameWon() && <GameWon />}
      {gameOver() && <GameOver startOverClick={startNewGame} />}
    </main>
  )
}

export default App
