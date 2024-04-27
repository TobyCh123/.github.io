
const convertButton = document.getElementById("convert-btn")
const userInput = document.getElementById("number")
const resultBox = document.getElementById("output")

convertButton.addEventListener("click", () => updateUI());


const isValid = (input) => {
  let outputText
  if (input === "")
    outputText = "Please enter a valid number";
  else if (input < 0)
    outputText = "Please enter a number greater than or equal to 1";
  else if (input > 3999)
    outputText = "Please enter a number less than or equal to 3999";
  else
    outputText = "";
  return outputText
};


const clearOutput = () => {
  userInput.value = "";
};


const convertToRoman = (input) => {
  const ref = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  let outputText = ""
  ref.forEach((num) => {
    if (input >= num[1]) {
      while (input >= num[1]) {
        input -= num[1]
        outputText += num[0]
      }
    }
  })
  return outputText
};


const updateUI = () => {
  const input = userInput.value
  let text = isValid(input)

  if (!text) {
    text = convertToRoman(input)
  }
  resultBox.innerText = text
  clearOutput();
};
