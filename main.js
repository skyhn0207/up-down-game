// 변수
const ruleBtn = document.querySelector('.rules-btn'),
  playBtn = document.querySelector('.play-btn'),
  hiddenMenu = document.querySelector('.hidden-content'),
  userInput = document.querySelector('#user-input'),
  submit = document.querySelector('.submit'),
  result = document.querySelector('.result'),
  chanceNum = document.querySelector('.chance-num'),
  chanceText = document.querySelector('.chance')
  reset = document.querySelector('.reset'),
  goBackBtn = document.querySelector('.go-back'),
  answer = document.querySelector('.answer');

let gameAnswer = 0;
let chance = 5;
let numList = []
let gameOver = false

// 메인메뉴 마우스 호버 event
ruleBtn.addEventListener('mouseover',function() {
  ruleBtn.textContent = '클릭!'
})
ruleBtn.addEventListener('mouseleave',function() {
  ruleBtn.textContent = '게임설명'
})
playBtn.addEventListener('mouseover',function() {
  playBtn.textContent = '클릭!'
})
playBtn.addEventListener('mouseleave',function() {
  playBtn.textContent = '게임시작'
})

// 게임설명 보기
ruleBtn.addEventListener('click', slideRulse)
function slideRulse() {
  hiddenMenu.style.display = 'block'
}

// 화면이동
playBtn.addEventListener('click', function() {
  let main = document.querySelector('.main-game');
  let inGame = document.querySelector('.in-game');

  hiddenMenu.style.display = 'none'
  main.style.display = 'none'
  inGame.style.display = 'block'
})

//정답 생성
function randomAnswer() {
  gameAnswer = Math.floor(Math.random()*100)+1
  console.log(gameAnswer)
}
randomAnswer()

//게임실행
submit.addEventListener('click', playGame)
function playGame() {
  let inputValue = userInput.value

  if(inputValue=='') {
    return result.textContent = '숫자를 입력해주세요!!'
  }
  if(inputValue > 100 || inputValue < 0) {
    return result.textContent = '1부터100까지의 숫자만 입력해주세요!!'
  }
  if(numList.includes(inputValue)) {
    userInput.value = ''
    return result.textContent = '이미 입력한 숫자예요'
  }

  chance--
  chanceNum.textContent = chance
  
  if(inputValue > gameAnswer) {
    result.textContent = 'Down!!!'
  } else if(inputValue < gameAnswer) {
    result.textContent = 'Up!!!'
  } else {
    gameOver = true
    submit.disabled = true
    submit.style.background = '#aaa'
    answer.textContent = `정답:${gameAnswer}`
    chanceText.style.display = 'none'
    return result.textContent = '정답입니다!!'
  }
  userInput.value = ''
  numList.push(inputValue)

  if(chance == 0) {
    gameOver = true
    result.textContent = '게임오버.."Reset"을 클릭해주세요'
  }
  if(gameOver) {
    submit.disabled = true
    submit.style.background = '#aaa'
    answer.style.display = 'block'
    answer.textContent = `정답:${gameAnswer}`
  }
}

function enterKey() {
  if(window.event.keyCode == 13) {
    playGame()
  }
}

function resetGame() {
  gameOver = false
  result.textContent = '숫자를 입력하고 Go! 버튼 클릭!'
  userInput.value = ''
  chance = 5
  chanceNum.textContent = 5
  submit.style.background = '#075b'
  submit.disabled = false
  numList = []
  answer.style.textContent = ''
  answer.style.display = 'none'
  chanceText.style.display = 'block'
  randomAnswer()
}
reset.addEventListener('click', resetGame)

function goBack() {
  let main = document.querySelector('.main-game');
  let inGame = document.querySelector('.in-game');
  resetGame()
  main.style.display = 'block'
  inGame.style.display = 'none'
}
goBackBtn.addEventListener('click', goBack)

