
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
      question: "Softening point should be __ the hottest day temperature",
      answers: {
        a: "Higher than",
        b: "Lower than",
        c: "To know",
        d: "None of the above"
      },
      correctAnswer: "b"
    },

    {
      question: "A steel ball is ____mm in diameter",
      answers: {
        a: "6.53",
        b: "7.53",
        c: "8.53",
        d: "9.53"
      },
      correctAnswer: "d"
    },

    {
      question: "The softening point is the temperatures at which the bitumen disks soften and",
      answers: {
        a: "Sag downwards to a distance of 30mm under the weight of a steel ball",
        b: "Sag downwards to a distance of 25mm under the weight of a steel ball",
        c: "Bulk upwards to a distance of 25mm under the weight of a steel ball",
        d: "Bulk upwards to a distance of 30mm under the weight of a steel ball"
      },
      correctAnswer: "b"
    },
    {
      question: "The maximum temperature recorded in Rajasthan in 2018 is 50.3&deg;C, then the bitumen suitable for road construction in this region is",
      answers: {
        a: "Bitumen having softening point of 61&deg;C",
        b: "Bitumen having softening point of 51&deg;C",
        c: "Bitumen having softening point of 41&deg;C",
        d: "All the above"
      },
      correctAnswer: "a"
    },
    {
      question: "The following general statement may be made about the penetration value and softening point of bitumen",
      answers: {
        a: "For very high and very low penetration value the softening point is very low",
        b: "Absolutely no correlation can be drawn between penetration value and softening point of bitumen",
        c: "Higher the penetration value, higher is the softening point",
        d: "Higher the penetration value, lower is the softening point"
      },
      correctAnswer: "d"
    }
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
