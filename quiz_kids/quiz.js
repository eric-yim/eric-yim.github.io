const ENDPOINT = 'https://h6aprpp99i.execute-api.us-west-2.amazonaws.com/prod/quizApp/';
const NUM_PROB = 16;
async function getQuizSet() {
        return new Promise(async (resolve, reject) => {
                try {
                  const response = await fetch(url);
                  const data = await response.json();
                  resolve(data);
                } catch (error) {
                  console.error('Error in function1:', error);
                  reject(error); // You can handle errors as needed
                }
              });
        }
  // Make a GET request using fetch
//   fetch(ENDPOINT + "easy-single-digit-sums", {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json', // Adjust based on the API requirements
//     },
//   }).then(response => {
//     // Check if the response is successful (status code 200-299)
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
    
//     return response.json(); // or response.json() if the response is in JSON format
//   }).then(data => {
//         console.log(data);
//         var whole_set = {}

//         data.forEach(item => {
//           whole_set[item['question']] = whole_set[item['answer']]
//         });
//         return whole_set
//   }).catch(error => {
//         console.error('Error:', error);
//   });



// Fisher-Yates (Knuth) shuffle algorithm
function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
}
function chooseRandomProblems(whole_problem_set) {
        console.log("choose");
        console.log(whole_problem_set);
        
        MY_PROBLEM_SET = {};
        
        whole_problem_set = shuffleArray(whole_problem_set);
        for (var i = 0; i < NUM_PROB; i++) {
          // console.log(i + ' ' + keysArray[i]);
          MY_PROBLEM_SET[whole_problem_set[i]['question']] = whole_problem_set[i]['answer'];
                
        }
}
function populateAnswers() {
        var keysArray = Object.keys(MY_PROBLEM_SET);
        keysArray = shuffleArray(keysArray);
        var answerId = "";
        var answerString = "";
        var retrievedElement;
        for (var i = 1; i <= NUM_PROB; i++) {
                answerId = "answer" + i;
                answerString = MY_PROBLEM_SET[keysArray[i-1]];
                retrievedElement = document.getElementById(answerId);
                retrievedElement.innerText = answerString;

        }
}
function buttonClick(buttonId) {
        
        // Retrieve the text from the clicked button
        var buttonElement = document.getElementById(buttonId);
        var clickedAnswer = buttonElement.innerText;

        // Get correct answer
        var problemString =  document.getElementById("dynamicHeader").innerText;
        var correctAnswer = MY_PROBLEM_SET[problemString];

        if (clickedAnswer == correctAnswer) {
                // Add the 'hidden' class to the retrieved element
                buttonElement.classList.add("hidden");
                delete MY_PROBLEM_SET[problemString];
        }

        dislayRandomProblem();
}
function dislayRandomProblem() {
        // Get the dynamicHeader element by its ID
        var dynamicHeader = document.getElementById("dynamicHeader");
        var keysArray = Object.keys(MY_PROBLEM_SET);
        if (keysArray.length == 0) {
                dynamicHeader.innerText = "All Done!";
                return;
        }
        keysArray = shuffleArray(keysArray);
        dynamicHeader.innerText = keysArray[0];
}
function setBackgroundImage(imageUrl) {
        const elementId = 'content-background';
        var element = document.getElementById(elementId);
        if (element) {
            element.style.backgroundImage = 'url(' + imageUrl + ')';
        } else {
            console.error('Element with ID "' + elementId + '" not found.');
        }
}
