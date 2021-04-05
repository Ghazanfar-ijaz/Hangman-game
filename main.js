const fs = require('fs')
const readlineSync = require('readline-sync')
const { hangmanpics } = require('./hangman')
//const chalk = require('chalk')

console.log('Welcome in the HANGMAN-GAME !!!')

const words = ['alyra', 'blockchain', 'developpeur', 'bitcoin']

const getRandomWord = (words) => {
  let randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

const CreateHiddenWord = (word) => {
  let hiddenWord = []
  for (let i = 0; i < word.length; i++) {
    hiddenWord.push('_')
  }
  return hiddenWord
}

const isLetterInWord = (letter, word) => {
  return word.includes(letter)
}

const replaceletter = (letter, randomWord, hiddenWord) => {
  for (let i = 0; i < randomWord.length; i++) {
    let character = randomWord[i]
    if (character === letter) {
      hiddenWord[i] = letter;
    }
  }
  return hiddenWord;
}


const startGame = () => {
  let randomWord = getRandomWord(words);
  let hiddenWord = CreateHiddenWord(randomWord)

  let tries = 7;
  let p = 0
  while (tries > 1 && !(hiddenWord.join('') == randomWord)) {
    console.log(hangmanpics[p])
    console.log('==============')
    console.log(`=> Tries: ${tries}`)
    console.log(randomWord)
    console.log('=>', hiddenWord.join(''))
    const answer = readlineSync.question('Type a letter: ')

    if (isLetterInWord(answer, randomWord)) {
      console.log('Good! that letter is in the word!')
      hiddenWord = replaceletter(answer, randomWord, hiddenWord);
    } else {
      tries--
      p++
      console.log('Nope! that letter is not in the word!')
    }
  }

}
startGame()