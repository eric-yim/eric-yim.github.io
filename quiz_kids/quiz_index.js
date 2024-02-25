function goToQuiz() {
    
    // Get the selected number of questions and content from the form
    var quizId = document.getElementById("selectNumber").value;
    var content = document.getElementById("inputContent").value;

    var targetLocation = "https://eric-yim.github.io/quiz_kids?quizId=" + quizId + "&imageUrl=" + content;
    console.log(targetLocation);
    // Perform any additional logic or actions here (e.g., generate quiz based on the input)
    window.open(targetLocation, "_blank");
    // window.location.href = targetLocation;
}
