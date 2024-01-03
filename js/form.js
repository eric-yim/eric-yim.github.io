function generateQuiz(event) {
    const ENDPOINT = 'https://v12tnnnyee.execute-api.us-west-1.amazonaws.com/prod';
    // Prevent the default form submission
    event.preventDefault();

    // Get the selected number of questions and content from the form
    var selectedNumber = document.getElementById("selectNumber").value;
    var content = document.getElementById("inputContent").value;
    // Perform any additional logic or actions here (e.g., generate quiz based on the input)
    console.log("Selected Number:", selectedNumber);
    console.log("Content:", content);

    var quizData = {
        number: selectedNumber,
        content: content
    };

    fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
      })
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

