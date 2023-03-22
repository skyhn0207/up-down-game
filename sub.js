//랜덤번호 지정
//유저가 번호를 입려한다 그리고  go 라는 버튼을 누름
//만약에 우저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up!!
//Reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼 disable)
//유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 일려준다, 기회를 깍지 않는다

let computerNum = 0
let playButton = document.getElementById('play-button');
let userInput = document.getElementById('user-input');
let resultArea = document.getElementById('result-area');
let resetButton = document.getElementById('reset-button');
let chanceArea = document.getElementById('chance-area');
let chances = 5;
let gameOver = false;
let history = []

playButton.addEventListener('click', play)
resetButton.addEventListener('click', reset)
userInput.addEventListener('focus', function(){
  userInput.value = ''
})

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log('정답',computerNum);
}

function play() {
  let userValue = userInput.value

  if(userValue < 1 || userValue > 100) {
    return resultArea.textContent = '1~100사의 숫자를 입력하세요'
  }
  if(history.includes(userValue)) {
    return resultArea.textContent = '이미 입력한 값 입니다.'
  }

  chances--;
  chanceArea.textContent = `남은기회:${chances}번`
  if(userValue < computerNum) {
    resultArea.textContent = "Up!!"
  } else if(userValue > computerNum){
    resultArea.textContent = "Down!!"
  } else {
    resultArea.textContent = "맞췄습니다!"
    gameOver = true
  }

  history.push(userValue);

  if(chances < 1) {
    gameOver = true
  }
  if(gameOver) {
    playButton.disabled = true
  }
}

function reset() {
  userInput.value = '';
  resultArea.textContent = '';
  gameOver = false;
  playButton.disabled = false;
  chanceArea.textContent = '남은기회:5번'
  chances = 5;
  history = []
  pickRandomNum()
}

pickRandomNum()