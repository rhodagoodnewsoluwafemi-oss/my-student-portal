const form = document.getElementById("result-form");
const nameInput = document.getElementById("student-name");
const scoreInput = document.getElementById("student-score");
const checkBtn = document.getElementById("check-btn");
const message = document.getElementById("message");
const errorMessage = document.getElementById("errorMessage");
const result = document.getElementById("result");

function calculateGrade(score) {
    if (score >= 70) {
        return "A";
    } else if (score >= 60) {
        return "B";
    } else if (score >= 50) {
        return "C";
    } else if (score >= 45) {
        return "D";
    } else {
        return "F";
    }
}

function waitTwoSeconds() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
}
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Clear previous messages and results
    message.textContent = "";
    result.replaceChildren();

    // Get the values entered by the user
    const studentName = nameInput.value.trim();
    const scoreText = scoreInput.value.trim();
    const score = Number(scoreText);

    try {
        // Check the student's name
        if (studentName === "") {
            throw new Error("Please enter the student's name.");
        }

        // Check whether the score was entered
        if (scoreText === "") {
            throw new Error("Please enter the student's score.");
        }

        // Check whether the score is valid
        if (!Number.isFinite(score) || score < 0 || score > 100) {
            throw new Error("Score must be a number from 0 to 100.");
        }

        // Disable the button during processing
        checkBtn.disabled = true;

        // Display the loading message
        message.textContent = "Checking result, please wait...";

        // Wait for two seconds
        await waitTwoSeconds();

        // Calculate the grade
        const grade = calculateGrade(score);

        // Create the result box
        const resultDetails = document.createElement("div");
        resultDetails.className = "result-details";

        // Display the name
        const nameLine = document.createElement("p");
        nameLine.textContent = "Student Name: " + studentName;

        // Display the score
        const scoreLine = document.createElement("p");
        scoreLine.textContent = "Score: " + score;

        // Display the grade
        const gradeLine = document.createElement("p");
        gradeLine.textContent = "Grade: ";

        const gradeText = document.createElement("span");
        gradeText.className = "grade";
        gradeText.textContent = grade;

        gradeLine.appendChild(gradeText);

        // Put the details inside the result box
        resultDetails.appendChild(nameLine);
        resultDetails.appendChild(scoreLine);
        resultDetails.appendChild(gradeLine);

        // Display the result on the page
        result.appendChild(resultDetails);

        message.textContent = "Result checked successfully!";

    } catch (error) {
        // Display an error if something goes wrong
        errorMessage.textContent = error.message;

    } finally {
        // Always enable the button again
        checkBtn.disabled = false;
    }
});