
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "Bitumen has a melting point of around",
    answers: {
      a: "120 degrees Fahrenheit",
      b: "360 degrees Fahrenheit",
      c: "320 degrees Fahrenheit",
      d: "240 degrees Fahrenheit"
    },
    correctAnswer: "d"
  },

  {
    question: "The softening point of bitumen to be used in a place where the maximum temperature is 40&deg;C is",
    answers: {
      a: "Less than 40&deg;C",
      b: "Greater than 40&deg;C",
      c: "Equal to 40&deg;C",
      d: "None of the above"
    },
    correctAnswer: "b"
  },
  {
    question: "The test gives an idea of the temperature at which the bituminous materials attain a certain",
    answers: {
      a: "Viscosity",
      b: "Temperature",
      c: "Melting point",
      d: "Boiling point"
    },
    correctAnswer: "a"
  },
  {
    question: "Bitumen with higher softening point may be preferred in",
    answers: {
      a: "Colder places",
      b: "Humid places",
      c: "Warmer places",
      d: "None of the above"
    },
    correctAnswer: "c"
  },
  {
    question: "The name of the test conducted to check the softening point of bitumen is",
    answers: {
      a: "Water-heater apparatus",
      b: "Ring and heater apparatus",
      c: "Ring and ball apparatus",
      d: "None of the above"
    },
    correctAnswer: "c"
  }
];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
