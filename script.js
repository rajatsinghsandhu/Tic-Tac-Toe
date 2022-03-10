const x = document.querySelector(".x");
const o = document.querySelector(".o");
const newGameCpuButton = document.querySelector(".new-game-cpu");
const newGamePlayerButton = document.querySelector(".new-game-player");
const cells = document.querySelectorAll(".cell");
const nextRoundBtn = document.querySelector(".next-round-btn");
const quitBtn = document.querySelector(".quit-btn");
const reloadBtn = document.querySelector(".reload-btn");

const gameBoard = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function markPlayerPosition(n) {
  switch (n) {
    case 1:
      gameBoard[0][0] = 1;
      break;
    case 2:
      gameBoard[0][1] = 1;
      break;
    case 3:
      gameBoard[0][2] = 1;
      break;
    case 4:
      gameBoard[1][0] = 1;
      break;
    case 5:
      gameBoard[1][1] = 1;
      break;
    case 6:
      gameBoard[1][2] = 1;
      break;
    case 7:
      gameBoard[2][0] = 1;
      break;
    case 8:
      gameBoard[2][1] = 1;
      break;
    case 9:
      gameBoard[2][2] = 1;
      break;
  }
}

function markOpponentPosition(n) {
  switch (n) {
    case 1:
      gameBoard[0][0] = 2;
      break;
    case 2:
      gameBoard[0][1] = 2;
      break;
    case 3:
      gameBoard[0][2] = 2;
      break;
    case 4:
      gameBoard[1][0] = 2;
      break;
    case 5:
      gameBoard[1][1] = 2;
      break;
    case 6:
      gameBoard[1][2] = 2;
      break;
    case 7:
      gameBoard[2][0] = 2;
      break;
    case 8:
      gameBoard[2][1] = 2;
      break;
    case 9:
      gameBoard[2][2] = 2;
      break;
  }
}

function occupiedPosition(n) {
  switch (n) {
    case 1:
      return gameBoard[0][0] === 1 || gameBoard[0][0] === 2;
    case 2:
      return gameBoard[0][1] === 1 || gameBoard[0][1] === 2;
    case 3:
      return gameBoard[0][2] === 1 || gameBoard[0][2] === 2;
    case 4:
      return gameBoard[1][0] === 1 || gameBoard[1][0] === 2;
    case 5:
      return gameBoard[1][1] === 1 || gameBoard[1][1] === 2;
    case 6:
      return gameBoard[1][2] === 1 || gameBoard[1][2] === 2;
    case 7:
      return gameBoard[2][0] === 1 || gameBoard[2][0] === 2;
    case 8:
      return gameBoard[2][1] === 1 || gameBoard[2][1] === 2;
    case 9:
      return gameBoard[2][2] === 1 || gameBoard[2][2] === 2;
  }
}

function checkPlayerWin() {
  let flag = false;
  let rowIndex, colIndex, wayOfWinning;
  for (let i = 0; i < 3; i++) {
    //Each column
    if (
      gameBoard[0][i] === 1 &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[1][i] === gameBoard[2][i]
    ) {
      colIndex = i;
      wayOfWinning = 1;
      flag = true;
    }
    //Each row
    if (
      gameBoard[i][0] === 1 &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][1] === gameBoard[i][2]
    ) {
      rowIndex = i;
      wayOfWinning = 2;
      flag = true;
    }
  }
  //Principle Diagonal
  if (
    gameBoard[0][0] === 1 &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2]
  ) {
    flag = true;
    wayOfWinning = 3;
  }
  //Reverse Diagonal
  if (
    gameBoard[0][2] === 1 &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0]
  ) {
    flag = true;
    wayOfWinning = 4;
  }
  return [flag, rowIndex, colIndex, wayOfWinning];
}

function checkOpponentWin() {
  let flag = false;
  let rowIndex, colIndex, wayOfWinning;
  for (let i = 0; i < 3; i++) {
    //Each column
    if (
      gameBoard[0][i] === 2 &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[1][i] === gameBoard[2][i]
    ) {
      colIndex = i;
      wayOfWinning = 1;
      flag = true;
    }
    //Each row
    if (
      gameBoard[i][0] === 2 &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][1] === gameBoard[i][2]
    ) {
      rowIndex = i;
      wayOfWinning = 2;
      flag = true;
    }
  }
  //Principle Diagonal
  if (
    gameBoard[0][0] === 2 &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2]
  ) {
    flag = true;
    wayOfWinning = 3;
  }
  //Reverse Diagonal
  if (
    gameBoard[0][2] === 2 &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0]
  ) {
    flag = true;
    wayOfWinning = 4;
  }
  return [flag, rowIndex, colIndex, wayOfWinning];
}

function isBoardFull() {
  let flag = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] == 0) {
        flag = false;
        break;
      }
    }
  }
  return flag;
}

document.querySelector(".main-game-page").style.display = "none";

o.addEventListener("click", function () {
  document.querySelector(".active").style.transform = "translateX(100%)";
  document.querySelector(".active").style.backgroundImage =
    "url(images/icon-o-dark.svg)";
});

x.addEventListener("click", function () {
  document.querySelector(".active").style.transform = "translateX(0px)";
  document.querySelector(".active").style.backgroundImage =
    "url(images/icon-x-dark.svg)";
});

newGameCpuButton.addEventListener("click", function () {
  document.querySelector(".starter-page").style.display = "none";
  document.querySelector(".main-game-page").style.display = "block";
  if (
    document.querySelector(".active").style.transform === "translateX(100%)"
  ) {
    document.querySelector(".user-container").style.backgroundColor = "#F2B137";
    document.querySelector(".user-text").textContent = "O (YOU)";
    document.querySelector(".opponent-container").style.backgroundColor =
      "#31C3BD";
    document.querySelector(".opponent-text").textContent = "X (CPU)";
    if (
      checkPlayerWin().includes(false) &&
      checkOpponentWin().includes(false)
    ) {
      const randomNumber =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      markOpponentPosition(randomNumber);
      availableCells = availableCells.filter(function (e) {
        return e !== randomNumber;
      });
      cells[
        randomNumber - 1
      ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
<path
  class="x-path"
  d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
  fill="#31C3BD"
  fill-rule="evenodd"
/>
</svg>`;

      document.querySelector(".x-or-o-img").style.backgroundImage =
        "url(images/icon-o-gray.svg)";
    }
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", function () {
        if (!occupiedPosition(i + 1) && cells[i].innerHTML === "") {
          let rand;
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            markPlayerPosition(i + 1);
            availableCells = availableCells.filter(function (e) {
              return e !== i + 1;
            });
            if (availableCells.length >= 1) {
              cells[
                i
              ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                class="o-path"
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="#F2B137"
              />
            </svg>`;

              document.querySelector(".x-or-o-img").style.backgroundImage =
                "url(images/icon-x-gray.svg)";
            }
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            const randomNumber =
              availableCells[Math.floor(Math.random() * availableCells.length)];
            markOpponentPosition(randomNumber);
            availableCells = availableCells.filter(function (e) {
              return e !== randomNumber;
            });
            rand = randomNumber;
            setTimeout(function () {
              cells[
                randomNumber - 1
              ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
          <path
            class="x-path"
            d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
            fill="#31C3BD"
            fill-rule="evenodd"
          />
          </svg>`;
            }, 3000);
            setTimeout(function () {
              document.querySelector(".x-or-o-img").style.backgroundImage =
                "url(images/icon-o-gray.svg)";
            }, 3000);
          }
          if (checkPlayerWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".user-wins").textContent =
                parseInt(document.querySelector(".user-wins").textContent) + 1;
            }, 3000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "o-path"
                  ) {
                    function winningO() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#F2B137";
                      cells[i].style.transitionDelay = "3s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 3000);
                      cells[i].style.boxShadow =
                        " 0 8px 0 0 var(--yellowShadow)";
                    }
                    //First row
                    if (checkPlayerWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningO();
                      }
                    }
                    //Second row
                    if (checkPlayerWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningO();
                      }
                    }
                    //Third row
                    if (checkPlayerWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningO();
                      }
                    }
                    //First column
                    if (checkPlayerWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningO();
                      }
                    }
                    //Second column
                    if (checkPlayerWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningO();
                      }
                    }
                    //Third column
                    if (checkPlayerWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningO();
                      }
                    }
                    //Principle diagonal
                    if (checkPlayerWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningO();
                      }
                    }
                    //Reverse diagonal
                    if (checkPlayerWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningO();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "YOU WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-o.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#F2B137";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
          if (checkOpponentWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".opponent-wins").textContent =
                parseInt(document.querySelector(".opponent-wins").textContent) +
                1;
            }, 6000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "x-path"
                  ) {
                    function winningX() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#31C3BD";
                      cells[i].style.transitionDelay = "6s";
                      cells[rand - 1].style.transition = "all 2s ease";
                      cells[rand - 1].style.backgroundColor = "#31C3BD";
                      cells[rand - 1].style.transitionDelay = "6s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="none" fill="#1A2A33"/></svg>`;
                        cells[
                          rand - 1
                        ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 6000);
                      cells[i].style.boxShadow = " 0 8px 0 0 var(--blueShadow)";
                      cells[rand - 1].style.boxShadow =
                        " 0 8px 0 0 var(--blueShadow)";
                    }
                    //First row
                    if (checkOpponentWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningX();
                      }
                    }
                    //Second row
                    if (checkOpponentWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningX();
                      }
                    }
                    //Third row
                    if (checkOpponentWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningX();
                      }
                    }
                    //First column
                    if (checkOpponentWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningX();
                      }
                    }
                    //Second column
                    if (checkOpponentWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningX();
                      }
                    }
                    //Third column
                    if (checkOpponentWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningX();
                      }
                    }
                    //Principle diagonal
                    if (checkOpponentWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningX();
                      }
                    }
                    //Reverse diagonal
                    if (checkOpponentWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningX();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "THE CPU WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-x.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#31C3BD";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 8000);
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false) &&
            isBoardFull()
          ) {
            setTimeout(function () {
              document.querySelector(".ties").textContent =
                parseInt(document.querySelector(".ties").textContent) + 1;
            }, 6000);
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "IT'S A TIE!";
              document.querySelector(".win-text").style.fontSize = "2rem";
              document.querySelector(".takes-the-round-text").style.display =
                "none";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 8000);
          }
        }
      });
    }
  } else {
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", function () {
        if (!occupiedPosition(i + 1) && cells[i].innerHTML === "") {
          let rand;
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            markPlayerPosition(i + 1);
            availableCells = availableCells.filter(function (e) {
              return e !== i + 1;
            });
            cells[
              i
            ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                class="x-path"
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill="#31C3BD"
                fill-rule="evenodd"
              />
              </svg>`;
            document.querySelector(".x-or-o-img").style.backgroundImage =
              "url(images/icon-o-gray.svg)";
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            const randomNumber =
              availableCells[Math.floor(Math.random() * availableCells.length)];
            markOpponentPosition(randomNumber);
            availableCells = availableCells.filter(function (e) {
              return e !== randomNumber;
            });
            rand = randomNumber;
            setTimeout(function () {
              cells[
                randomNumber - 1
              ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                class="o-path"
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="#F2B137"
              />
            </svg>`;
            }, 3000);
            setTimeout(function () {
              document.querySelector(".x-or-o-img").style.backgroundImage =
                "url(images/icon-x-gray.svg)";
            }, 3000);
          }
          if (checkPlayerWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".user-wins").textContent =
                parseInt(document.querySelector(".user-wins").textContent) + 1;
            }, 3000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "x-path"
                  ) {
                    function winningX() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#31C3BD";
                      cells[i].style.transitionDelay = "3s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 3000);
                      cells[i].style.boxShadow = " 0 8px 0 0 var(--blueShadow)";
                    }
                    //First row
                    if (checkPlayerWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningX();
                      }
                    }
                    //Second row
                    if (checkPlayerWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningX();
                      }
                    }
                    //Third row
                    if (checkPlayerWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningX();
                      }
                    }
                    //First column
                    if (checkPlayerWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningX();
                      }
                    }
                    //Second column
                    if (checkPlayerWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningX();
                      }
                    }
                    //Third column
                    if (checkPlayerWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningX();
                      }
                    }
                    //Principle diagonal
                    if (checkPlayerWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningX();
                      }
                    }
                    //Reverse diagonal
                    if (checkPlayerWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningX();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "YOU WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-x.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#31C3BD";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
          if (checkOpponentWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".opponent-wins").textContent =
                parseInt(document.querySelector(".opponent-wins").textContent) +
                1;
            }, 6000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "o-path"
                  ) {
                    function winningO() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#F2B137";
                      cells[i].style.transitionDelay = "6s";
                      cells[rand - 1].style.transition = "all 2s ease";
                      cells[rand - 1].style.backgroundColor = "#F2B137";
                      cells[rand - 1].style.transitionDelay = "6s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="none" fill="#1A2A33"/></svg>`;
                        cells[
                          rand - 1
                        ].innerHTML = `<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 6000);
                      cells[i].style.boxShadow =
                        " 0 8px 0 0 var(--yellowShadow)";
                      cells[rand - 1].style.boxShadow =
                        " 0 8px 0 0 var(--yellowShadow)";
                    }
                    //First row
                    if (checkOpponentWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningO();
                      }
                    }
                    //Second row
                    if (checkOpponentWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningO();
                      }
                    }
                    //Third row
                    if (checkOpponentWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningO();
                      }
                    }
                    //First column
                    if (checkOpponentWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningO();
                      }
                    }
                    //Second column
                    if (checkOpponentWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningO();
                      }
                    }
                    //Third column
                    if (checkOpponentWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningO();
                      }
                    }
                    //Principle diagonal
                    if (checkOpponentWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningO();
                      }
                    }
                    //Reverse diagonal
                    if (checkOpponentWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningO();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "THE CPU WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-o.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#F2B137";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 8000);
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false) &&
            isBoardFull()
          ) {
            setTimeout(function () {
              document.querySelector(".ties").textContent =
                parseInt(document.querySelector(".ties").textContent) + 1;
            }, 3000);
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "IT'S A TIE!";
              document.querySelector(".win-text").style.fontSize = "2rem";
              document.querySelector(".takes-the-round-text").style.display =
                "none";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
        }
      });
    }
  }
  reloadBtn.addEventListener("click", function () {
    document.querySelector(".restart-game-container").style.display = "flex";
    if (document.querySelector(".reload-overlay")) {
      document.querySelector(".reload-overlay").classList.add("visible");
    }
    document.querySelector(".restart-game-container").classList.add("fade-in");
    document
      .querySelector(".cancel-btn")
      .addEventListener("click", function () {
        document.querySelector(".restart-game-container").style.display =
          "none";
        document.querySelector(".reload-overlay").classList.remove("visible");
      });
    document
      .querySelector(".restart-game-btn")
      .addEventListener("click", function () {
        document.querySelector(".restart-game-container").style.display =
          "none";
        document.querySelector(".reload-overlay").classList.remove("visible");
        document.querySelector(".win-container").classList.remove("fade-in");
        document.querySelector(".win-text").style.fontSize = "1rem";
        document.querySelector(".x-or-o-img").style.backgroundImage =
          "url(images/icon-x-gray.svg)";
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = 0;
          }
        }
        availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < cells.length; i++) {
          cells[i].innerHTML = "";
          cells[i].removeAttribute("style");
        }
        const highestId = window.setTimeout(() => {
          for (let i = highestId; i >= 0; i--) {
            window.clearInterval(i);
          }
        }, 0);
        document.querySelector(".win-container").style.display = "none";
        document.querySelector(".win-container").classList.remove("visible");
        document.querySelector(".overlay").classList.remove("visible");
        if (
          document.querySelector(".active").style.transform ===
          "translateX(100%)"
        ) {
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            const randomNumber =
              availableCells[Math.floor(Math.random() * availableCells.length)];
            markOpponentPosition(randomNumber);
            availableCells = availableCells.filter(function (e) {
              return e !== randomNumber;
            });
            cells[
              randomNumber - 1
            ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <path
    class="x-path"
    d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
    fill="#31C3BD"
    fill-rule="evenodd"
  />
  </svg>`;

            document.querySelector(".x-or-o-img").style.backgroundImage =
              "url(images/icon-o-gray.svg)";
          }
        }
      });
  });
  nextRoundBtn.addEventListener("click", function () {
    document.querySelector(".win-container").classList.remove("fade-in");
    document.querySelector(".win-text").style.fontSize = "1rem";
    document.querySelector(".x-or-o-img").style.backgroundImage =
      "url(images/icon-x-gray.svg)";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard[i][j] = 0;
      }
    }
    availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
      cells[i].removeAttribute("style");
    }
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);
    document.querySelector(".win-container").style.display = "none";
    document.querySelector(".win-container").classList.remove("visible");
    document.querySelector(".overlay").classList.remove("visible");
    if (
      document.querySelector(".active").style.transform === "translateX(100%)"
    ) {
      if (
        checkPlayerWin().includes(false) &&
        checkOpponentWin().includes(false)
      ) {
        const randomNumber =
          availableCells[Math.floor(Math.random() * availableCells.length)];
        markOpponentPosition(randomNumber);
        availableCells = availableCells.filter(function (e) {
          return e !== randomNumber;
        });
        cells[
          randomNumber - 1
        ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <path
    class="x-path"
    d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
    fill="#31C3BD"
    fill-rule="evenodd"
  />
  </svg>`;

        document.querySelector(".x-or-o-img").style.backgroundImage =
          "url(images/icon-o-gray.svg)";
      }
    }
  });
});

newGamePlayerButton.addEventListener("click", function () {
  document.body.style.margin = "2rem";
  document.querySelector(".starter-page").style.display = "none";
  document.querySelector(".main-game-page").style.display = "block";
  if (
    document.querySelector(".active").style.transform === "translateX(100%)"
  ) {
    document.querySelector(".opponent-text").textContent = "X (P2)";
    document.querySelector(".user-container").style.backgroundColor = "#F2B137";
    document.querySelector(".user-text").textContent = "O (YOU)";
    document.querySelector(".opponent-container").style.backgroundColor =
      "#31C3BD";
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", function () {
        if (!occupiedPosition(i + 1) && cells[i].innerHTML === "") {
          const style = window.getComputedStyle(
            document.querySelector(".x-or-o-img"),
            false
          );
          const url = style.backgroundImage.slice(4, -1).replace(/"/g, "");
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            if (url.includes("icon-x")) {
              markOpponentPosition(i + 1);
              availableCells = availableCells.filter(function (e) {
                return e !== i + 1;
              });
              if (availableCells.length >= 0) {
                cells[
                  i
                ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                class="x-path"
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill="#31C3BD"
                fill-rule="evenodd"
              />
              </svg>`;
                document.querySelector(".x-or-o-img").style.backgroundImage =
                  "url(images/icon-o-gray.svg)";
              }
            }
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            if (url.includes("icon-o")) {
              markPlayerPosition(i + 1);
              availableCells = availableCells.filter(function (e) {
                return e !== i + 1;
              });
              cells[
                i
              ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                class="o-path"
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="#F2B137"
              />
            </svg>`;

              document.querySelector(".x-or-o-img").style.backgroundImage =
                "url(images/icon-x-gray.svg)";
            }
          }
          if (checkPlayerWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".user-wins").textContent =
                parseInt(document.querySelector(".user-wins").textContent) + 1;
            }, 3000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "o-path"
                  ) {
                    function winningO() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#F2B137";
                      cells[i].style.transitionDelay = "3s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 3000);
                      cells[i].style.boxShadow =
                        " 0 8px 0 0 var(--yellowShadow)";
                    }
                    //First row
                    if (checkPlayerWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningO();
                      }
                    }
                    //Second row
                    if (checkPlayerWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningO();
                      }
                    }
                    //Third row
                    if (checkPlayerWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningO();
                      }
                    }
                    //First column
                    if (checkPlayerWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningO();
                      }
                    }
                    //Second column
                    if (checkPlayerWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningO();
                      }
                    }
                    //Third column
                    if (checkPlayerWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningO();
                      }
                    }
                    //Principle diagonal
                    if (checkPlayerWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningO();
                      }
                    }
                    //Reverse diagonal
                    if (checkPlayerWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningO();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "YOU WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-o.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#F2B137";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
          if (checkOpponentWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".opponent-wins").textContent =
                parseInt(document.querySelector(".opponent-wins").textContent) +
                1;
            }, 3000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "x-path"
                  ) {
                    function winningX() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#31C3BD";
                      cells[i].style.transitionDelay = "3s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 3000);
                      cells[i].style.boxShadow = " 0 8px 0 0 var(--blueShadow)";
                    }
                    //First row
                    if (checkOpponentWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningX();
                      }
                    }
                    //Second row
                    if (checkOpponentWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningX();
                      }
                    }
                    //Third row
                    if (checkOpponentWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningX();
                      }
                    }
                    //First column
                    if (checkOpponentWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningX();
                      }
                    }
                    //Second column
                    if (checkOpponentWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningX();
                      }
                    }
                    //Third column
                    if (checkOpponentWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningX();
                      }
                    }
                    //Principle diagonal
                    if (checkOpponentWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningX();
                      }
                    }
                    //Reverse diagonal
                    if (checkOpponentWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningX();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "PLAYER 2 WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-x.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#31C3BD";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false) &&
            isBoardFull()
          ) {
            setTimeout(function () {
              document.querySelector(".ties").textContent =
                parseInt(document.querySelector(".ties").textContent) + 1;
            }, 3000);
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "IT'S A TIE!";
              document.querySelector(".win-text").style.fontSize = "2rem";
              document.querySelector(".takes-the-round-text").style.display =
                "none";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
        }
      });
    }
  } else {
    document.querySelector(".opponent-text").textContent = "O (P2)";
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", function () {
        if (!occupiedPosition(i + 1) && cells[i].innerHTML === "") {
          console.log(gameBoard);
          const style = window.getComputedStyle(
            document.querySelector(".x-or-o-img"),
            false
          );
          const url = style.backgroundImage.slice(4, -1).replace(/"/g, "");
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            if (url.includes("icon-x")) {
              markPlayerPosition(i + 1);
              availableCells = availableCells.filter(function (e) {
                return e !== i + 1;
              });
              if (availableCells.length >= 0) {
                cells[
                  i
                ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                class="x-path"
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill="#31C3BD"
                fill-rule="evenodd"
              />
              </svg>`;
                document.querySelector(".x-or-o-img").style.backgroundImage =
                  "url(images/icon-o-gray.svg)";
              }
            }
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false)
          ) {
            if (url.includes("icon-o")) {
              markOpponentPosition(i + 1);
              availableCells = availableCells.filter(function (e) {
                return e !== i + 1;
              });
              cells[
                i
              ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <path
                class="o-path"
                d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                fill="#F2B137"
              />
            </svg>`;

              document.querySelector(".x-or-o-img").style.backgroundImage =
                "url(images/icon-x-gray.svg)";
            }
          }
          if (checkPlayerWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".user-wins").textContent =
                parseInt(document.querySelector(".user-wins").textContent) + 1;
            }, 3000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "x-path"
                  ) {
                    function winningX() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#31C3BD";
                      cells[i].style.transitionDelay = "3s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 3000);
                      cells[i].style.boxShadow = " 0 8px 0 0 var(--blueShadow)";
                    }
                    //First row
                    if (checkPlayerWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningX();
                      }
                    }
                    //Second row
                    if (checkPlayerWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningX();
                      }
                    }
                    //Third row
                    if (checkPlayerWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningX();
                      }
                    }
                    //First column
                    if (checkPlayerWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningX();
                      }
                    }
                    //Second column
                    if (checkPlayerWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningX();
                      }
                    }
                    //Third column
                    if (checkPlayerWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningX();
                      }
                    }
                    //Principle diagonal
                    if (checkPlayerWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningX();
                      }
                    }
                    //Reverse diagonal
                    if (checkPlayerWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningX();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "YOU WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-x.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#31C3BD";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
          if (checkOpponentWin().includes(true)) {
            setTimeout(function () {
              document.querySelector(".opponent-wins").textContent =
                parseInt(document.querySelector(".opponent-wins").textContent) +
                1;
            }, 3000);
            for (let i = 0; i < cells.length; i++) {
              if (cells[i].hasChildNodes()) {
                if (
                  cells[i].childNodes[0].childNodes[1].className != undefined
                ) {
                  if (
                    cells[i].childNodes[0].childNodes[1].className.baseVal ===
                    "o-path"
                  ) {
                    function winningO() {
                      cells[i].style.transition = "all 2s ease";
                      cells[i].style.backgroundColor = "#F2B137";
                      cells[i].style.transitionDelay = "3s";
                      setTimeout(function () {
                        cells[
                          i
                        ].innerHTML = `<svg width="66" height="66" xmlns="http://www.w3.org/2000/svg"><path d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" stroke="none" fill="#1A2A33"/></svg>`;
                      }, 3000);
                      cells[i].style.boxShadow =
                        " 0 8px 0 0 var(--yellowShadow)";
                    }
                    //First row
                    if (checkOpponentWin()[1] === 0) {
                      if (i == 0 || i == 1 || i == 2) {
                        winningO();
                      }
                    }
                    //Second row
                    if (checkOpponentWin()[1] === 1) {
                      if (i == 3 || i == 4 || i == 5) {
                        winningO();
                      }
                    }
                    //Third row
                    if (checkOpponentWin()[1] === 2) {
                      if (i == 6 || i == 7 || i == 8) {
                        winningO();
                      }
                    }
                    //First column
                    if (checkOpponentWin()[2] === 0) {
                      if (i == 0 || i == 3 || i == 6) {
                        winningO();
                      }
                    }
                    //Second column
                    if (checkOpponentWin()[2] === 1) {
                      if (i == 1 || i == 4 || i == 7) {
                        winningO();
                      }
                    }
                    //Third column
                    if (checkOpponentWin()[2] === 2) {
                      if (i == 2 || i == 5 || i == 8) {
                        winningO();
                      }
                    }
                    //Principle diagonal
                    if (checkOpponentWin()[3] === 3) {
                      if (i == 0 || i == 4 || i == 8) {
                        winningO();
                      }
                    }
                    //Reverse diagonal
                    if (checkOpponentWin()[3] === 4) {
                      if (i == 2 || i == 4 || i == 6) {
                        winningO();
                      }
                    }
                  }
                }
              }
            }
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "PLAYER 2 WON!";
              document.querySelector(".winner-logo").style.backgroundImage =
                "url(images/icon-o.svg)";
              document.querySelector(".takes-the-round-text").style.color =
                "#F2B137";
              document.querySelector(".takes-the-round-text").style.display =
                "flex";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
          if (
            checkPlayerWin().includes(false) &&
            checkOpponentWin().includes(false) &&
            isBoardFull()
          ) {
            setTimeout(function () {
              document.querySelector(".ties").textContent =
                parseInt(document.querySelector(".ties").textContent) + 1;
            }, 3000);
            setTimeout(function () {
              document.querySelector(".win-container").style.display = "flex";
              document.querySelector(".win-text").textContent = "IT'S A TIE!";
              document.querySelector(".win-text").style.fontSize = "2rem";
              document.querySelector(".takes-the-round-text").style.display =
                "none";
              if (document.querySelector(".overlay")) {
                document.querySelector(".overlay").classList.add("visible");
              }
              setTimeout(function () {
                document
                  .querySelector(".win-container")
                  .classList.add("fade-in");
              }, 50);
            }, 5000);
          }
        }
      });
    }
  }
  reloadBtn.addEventListener("click", function () {
    document.querySelector(".restart-game-container").style.display = "flex";
    if (document.querySelector(".reload-overlay")) {
      document.querySelector(".reload-overlay").classList.add("visible");
    }
    document.querySelector(".restart-game-container").classList.add("fade-in");
    document
      .querySelector(".cancel-btn")
      .addEventListener("click", function () {
        document.querySelector(".restart-game-container").style.display =
          "none";
        document.querySelector(".reload-overlay").classList.remove("visible");
      });
    document
      .querySelector(".restart-game-btn")
      .addEventListener("click", function () {
        document.querySelector(".restart-game-container").style.display =
          "none";
        document.querySelector(".reload-overlay").classList.remove("visible");
        document.querySelector(".win-container").classList.remove("fade-in");
        document.querySelector(".win-text").style.fontSize = "1rem";
        document.querySelector(".x-or-o-img").style.backgroundImage =
          "url(images/icon-x-gray.svg)";
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = 0;
          }
        }
        availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < cells.length; i++) {
          cells[i].innerHTML = "";
          cells[i].removeAttribute("style");
        }
        const highestId = window.setTimeout(() => {
          for (let i = highestId; i >= 0; i--) {
            window.clearInterval(i);
          }
        }, 0);
        document.querySelector(".win-container").style.display = "none";
        document.querySelector(".win-container").classList.remove("visible");
        document.querySelector(".overlay").classList.remove("visible");
      });
  });
  nextRoundBtn.addEventListener("click", function () {
    document.querySelector(".win-container").classList.remove("fade-in");
    document.querySelector(".win-text").style.fontSize = "1rem";
    document.querySelector(".x-or-o-img").style.backgroundImage =
      "url(images/icon-x-gray.svg)";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard[i][j] = 0;
      }
    }
    availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
      cells[i].removeAttribute("style");
    }
    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);
    document.querySelector(".win-container").style.display = "none";
    document.querySelector(".win-container").classList.remove("visible");
    document.querySelector(".overlay").classList.remove("visible");
  });
});

quitBtn.addEventListener("click", function () {
  document.querySelector(".win-container").classList.remove("fade-in");
  document.querySelector(".win-text").style.fontSize = "1rem";
  document.querySelector(".x-or-o-img").style.backgroundImage =
    "url(images/icon-x-gray.svg)";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = 0;
    }
  }
  availableCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
    cells[i].removeAttribute("style");
  }
  const highestId = window.setTimeout(() => {
    for (let i = highestId; i >= 0; i--) {
      window.clearInterval(i);
    }
  }, 0);
  document.querySelector(".win-container").style.display = "none";
  document.querySelector(".win-container").classList.remove("visible");
  document.querySelector(".overlay").classList.remove("visible");
  document.querySelector(".starter-page").style.display = "block";
  document.querySelector(".main-game-page").style.display = "none";
  document.querySelector(".user-wins").textContent = "0";
  document.querySelector(".ties").textContent = "0";
  document.querySelector(".opponent-wins").textContent = "0";
});
