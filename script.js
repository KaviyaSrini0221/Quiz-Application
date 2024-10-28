const questions = [
    {
      question: "What is the capital of Czechoslovakia ?",
      options: ["Prague", "Budapest", "Vienna", "Madrid"],
      correctAnswer: "Prague"
    },
    {
      question: "Who built the ground-breaking invention Bombe?",
      options: ["Leonardo Da Vinci", "Charles Babbage", "Jensen Huang", "Alan Turing"],
      correctAnswer: "Alan Turing"
    },
    {
      question: "Which is the largest ocean?",
      options: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"],
      correctAnswer: "Pacific Ocean"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  
  function startQuiz() {
    const name = document.getElementById("name").value;
    const regNum = document.getElementById("regNum").value;
    if (name.trim() === '' || regNum.trim() === '') {
      alert('Please fill in all the details.');
      return;
    }
    document.getElementById("welcome-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
  }
  
  function showQuestion() {
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;
    optionsElement.innerHTML = '';
    current.options.forEach((option, index) => {
      const radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "option";
      radioBtn.value = option;
      radioBtn.id = "option" + index;
  
      const label = document.createElement("label");
      label.htmlFor = "option" + index;
      label.textContent = option;
  
      optionsElement.appendChild(radioBtn);
      optionsElement.appendChild(label);
      optionsElement.appendChild(document.createElement("br"));
    });
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
      resultElement.textContent = "Please select an option!";
      return;
    }
  
    const selectedAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      resultElement.textContent = "Correct!";
      score++;
      scoreElement.textContent = "Score: " + score;
    } else {
      resultElement.textContent = "Incorrect! The correct answer is: " + correctAnswer;
    }
  
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      resultElement.textContent = "Quiz completed!";
      document.querySelector("button").disabled = true;
    }
  }
  
  // Select the circle element
  const circleElement = document.querySelector('.circle');
  
  // Initialize mouse and circle coordinates
  const mouse = { x: 0, y: 0 },
      prev_mouse = { x: 0, y: 0 },
      circle = { x: 0, y: 0 };
  
  let currentScale = 0;
  let currentAngle = 0;
  
  // Update mouse coordinates on mousemove event
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX; // Use clientX and clientY for mouse coordinates
    mouse.y = e.clientY;
  });
  
  // Set the speed of the movement
  const speed = 0.15;
  
  // Define the animation function
  const tick = () => {
    // Calculate the distance to move for each frame
    const dx = mouse.x - circle.x;
    const dy = mouse.y - circle.y;
  
    // Move the circle towards the mouse cursor with smoothness
    circle.x += dx * speed;
    circle.y += dy * speed;
  
    // Update the position of the circle
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;
  
    // Elastic Squeeze Calculation
    const delMousex = mouse.x - prev_mouse.x;
    const delMousey = mouse.y - prev_mouse.y;
    prev_mouse.x = mouse.x;
    prev_mouse.y = mouse.y;
  
    const mouse_vel = Math.min(Math.sqrt(delMousex * 2 + delMousey * 2) * 4, 150);
  
    const scale_val = (mouse_vel / 150) * 0.5;
  
    currentScale += (scale_val - currentScale) * speed;
  
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
  
    // Rotation of cursor
    const angle = Math.atan2(delMousex, delMousey) * 180 / Math.PI;
  
    if (mouse_vel > 20) {
      currentAngle = angle;
    }
  
    const rotateTransform = `rotate(${currentAngle}deg)`;
  
    // Application of transformations
    circleElement.style.transform = `${translateTransform} ${scaleTransform} ${rotateTransform}`;
  
    // Request the next animation frame
    window.requestAnimationFrame(tick);
  }
  
  // Start the animation
  tick();
  