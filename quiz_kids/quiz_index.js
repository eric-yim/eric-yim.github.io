function goToQuiz(event) {
    const ENDPOINT = 'https://v12tnnnyee.execute-api.us-west-1.amazonaws.com/prod/chatGptWrapper';
    // Prevent the default form submission
    event.preventDefault();

    // Get the selected number of questions and content from the form
    var quizId = document.getElementById("selectNumber").value;
    var content = document.getElementById("inputContent").value;

    var targetLocation = 'https://eric-yim.github.io/quiz_kids?quizId=' + quizId + '&imageUrl=' + content;
    // Perform any additional logic or actions here (e.g., generate quiz based on the input)

    window.location.href = targetLocation;
}
