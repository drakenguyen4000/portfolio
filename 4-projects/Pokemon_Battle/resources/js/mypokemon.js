let p0Health, p1Health, chargeEnergy, activePlayer, gamePlaying;

//element selector variables
const startGame = document.querySelector(".btn-start");
const instructionsBtn = document.querySelector(".btn-info");
const gameRules = document.querySelector(".gameRules");
const exitInstBtn = document.querySelector(".btn-exit-inst");
const exitCredBtn = document.querySelector(".btn-exit-cred");
const chargeBtn = document.querySelector(".btn-charge");
const charge = document.getElementById("charge-1");
const pokeball = document.getElementById("pokeball");
const attackBtn = document.querySelector(".btn-attack");
const p0Energy = document.getElementById("energy-0");
const p1Energy = document.getElementById("energy-1");
const p0Panel = document.querySelector(".player-0-panel");
const p1Panel = document.querySelector(".player-1-panel");
const p0Name = document.getElementById("name-0");
const p1Name = document.getElementById("name-1");
const winnerimg0 = document.getElementById("winner-img-0");
const winnerimg1 = document.getElementById("winner-img-1");
const creditsBtn = document.querySelector(".btn-credits");
const credits = document.querySelector(".credits");
const stopGame = document.querySelector(".btn-stop");
const p0HealthValue = document.querySelector(".health-bar-0-value");
const p0HealthFill = document.querySelector(".health-bar-0-fill");
const p1HealthValue = document.querySelector(".health-bar-1-value");
const p1HealthFill = document.querySelector(".health-bar-1-fill");

soundBox = {
  charging: new Audio("vendors/sounds/coins-1.wav"),
  takeDamage: new Audio("vendors/sounds/grunt-hit-01.wav"),
  energyBlast: new Audio("vendors/sounds/8-bit-game-over.wav"),
  loseTurn: new Audio("vendors/sounds/game-over-arcade.wav"),
  winGame: new Audio("vendors/sounds/win-video-game-sound.wav"),
  newBattle: new Audio("vendors/sounds/c2.wav"),
  gameMusic: new Audio("vendors/sounds/loop-run-for-your-life-04.wav")
};

//new game
startGame.addEventListener("click", () => {
  init();
});

//stop game
stopGame.addEventListener("click", () => {
  endBattle();
});

//Game Guide on and off
instructionsBtn.addEventListener("click", () => {
  gameRules.style.visibility = "visible";
});

exitInstBtn.addEventListener("click", () => {
  gameRules.style.visibility = "hidden";
});

//credits on and off
creditsBtn.addEventListener("click", () => {
  credits.style.visibility = "visible";
});

exitCredBtn.addEventListener("click", () => {
  credits.style.visibility = "hidden";
});

//Charge
chargeBtn.addEventListener("click", () => {
  if (gamePlaying === true) {
    let chargeNum = Math.floor(Math.random() * 12 + 1);
    if (chargeNum !== 12 && chargeNum !== 7 && chargeNum !== 1) {
      pokeball.classList.add("damage");
      charge.classList.add("rotate");
      const chargeImg = () => {
        setTimeout(() => {
          //switches charge numbers
          charge.src = "resources/img/charge-" + chargeNum + ".png";
          chargeEnergy = chargeEnergy + chargeNum;
          pokeball.style.display = "none";
          charge.style.display = "block";
          //chargeEnergy switching between player turns
          document.getElementById(
            "energy-" + activePlayer
          ).textContent = chargeEnergy;
          document.getElementById("standard-img-0").classList.remove("damage");
          document.getElementById("standard-img-1").classList.remove("damage");
          soundBox.charging.play();
          soundBox.charging.volume = 0.4;
          charge.classList.remove("rotate");
          pokeball.classList.remove("damage");
        }, 100);
      };
      chargeImg();
    } else {
      soundBox.loseTurn.play();
      nextPlayer();
    }
  }
});

//Attack
attackBtn.addEventListener("click", () => {
  if (gamePlaying === true && chargeEnergy > 0) {
    //Player 1?
    if (activePlayer === 0) {
      p1Health = p1Health - chargeEnergy;
      p0Energy.textContent = "0";
      soundBox.energyBlast.play();
      soundBox.energyBlast.volume = 0.2;
      const damage1 = () => {
        setTimeout(() => {
          soundBox.takeDamage.play();
          document.getElementById("standard-img-1").classList.add("damage");
          p1HealthBar.setValue(p1Health);
          const winner0 = () => {
            setTimeout(() => {
              //Checks if there is a winner?
              if (p1Health > 0) {
                p1Health;
                nextPlayer();
              } else {
                p0Name.textContent = "Winner!";
                p0Panel.classList.add("winner");
                winnerimg0.classList.remove("hide-img-0");
                gamePlaying = false;
                soundBox.winGame.play();
                soundBox.gameMusic.pause();
              }
            }, 800);
          };
          winner0();
        }, 400);
      };
      damage1();
    } else {
      //Player 2
      p0Health = p0Health - chargeEnergy;
      p0HealthBar.setValue(p0Health);
      p1Energy.textContent = "0";
      soundBox.energyBlast.play();
      soundBox.energyBlast.volume = 0.2;
      const damage0 = () => {
        setTimeout(() => {
          soundBox.takeDamage.play();
          document.getElementById("standard-img-0").classList.add("damage");
          p0HealthBar.setValue(p0Health);
          const winner1 = () => {
            setTimeout(() => {
              if (p0Health > 0) {
                p0Health;
                nextPlayer();
              } else {
                p1Name.textContent = "Winner!";
                p1Panel.classList.add("winner");
                winnerimg1.classList.remove("hide-img-1");
                gamePlaying = false;
                soundBox.winGame.play();
                soundBox.gameMusic.pause();
              }
            }, 800);
          };
          winner1();
        }, 400);
      };
      damage0();
    }
  }
});

nextPlayer = () => {
  if (gamePlaying === true) {
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    chargeEnergy = 0;
    p0Energy.textContent = "0";
    p1Energy.textContent = "0";
    p0Panel.classList.toggle("active");
    p1Panel.classList.toggle("active");
    pokeball.style.display = "block";
    charge.style.display = "none";
  }
}

//Health Bar
class HealthBar {
  constructor(healthbar1, userInput = 0, healthValue, healthFill) {
    this.valueElem = healthValue;
    this.fillElem = healthFill; 
    this.setValue(userInput);
  }

  setValue(newValue) {
    if (newValue < 0) {
      newValue = 0;
    }
    if (newValue > 100) {
      newValue = 100;
    }
    this.value = newValue;
    this.update();
  }

  update() {
    const percentage = this.value + "%";
    this.valueElem.textContent = percentage;
    this.fillElem.style.width = percentage;
  }
}

let p0HealthBar = new HealthBar(document.querySelector("health-bar-0"), 100, p0HealthValue, p0HealthFill);
let p1HealthBar = new HealthBar(document.querySelector("health-bar-1"), 100, p1HealthValue, p1HealthFill);

init = () => {
  soundBox.newBattle.play();
  soundBox.gameMusic.play();
  soundBox.gameMusic.volume = 0.1;
  soundBox.gameMusic.loop = true;
  p0Health = 100;
  p1Health = 100;
  chargeEnergy = 0;
  activePlayer = 0;
  gamePlaying = true;
  winnerimg0.classList.add("hide-img-0");
  winnerimg1.classList.add("hide-img-1");
  pokeball.style.display = "block";
  charge.style.display = "none";
  p0Energy.textContent = "0";
  p1Energy.textContent = "0";
  p0Name.textContent = "Blastoise";
  p1Name.textContent = "Charizard";
  p0Panel.classList.remove("winner");
  p1Panel.classList.remove("winner");
  p0Panel.classList.remove("active");
  p1Panel.classList.remove("active");
  p0Panel.classList.add("active");
  p0HealthBar.setValue(p0Health);
  p1HealthBar.setValue(p1Health);
}

endBattle = () => {
  soundBox.gameMusic.pause();
  p0Health = 100;
  p1Health = 100;
  chargeEnergy = 0;
  activePlayer = 0;
  gamePlaying = false;
  winnerimg0.classList.remove("hide-img-0");
  winnerimg1.classList.remove("hide-img-1");
  pokeball.style.display = "block";
  charge.style.display = "none";
  p0Energy.textContent = "0";
  p1Energy.textContent = "0";
  p0Name.textContent = "Blastoise";
  p1Name.textContent = "Charizard";
  p0Panel.classList.remove("winner");
  p1Panel.classList.remove("winner");
  p0Panel.classList.remove("active");
  p1Panel.classList.remove("active");
  p0HealthBar.setValue(p0Health);
  p1HealthBar.setValue(p1Health);
}
