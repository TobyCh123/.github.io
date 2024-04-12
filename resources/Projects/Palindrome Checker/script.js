const checkButton = document.getElementById("check-btn");
const textInputBox = document.getElementById("text-input");
const resultBox = document.getElementById("result");

checkButton.addEventListener("click", () => {
  const inputText = textInputBox.value;
  main(inputText)
  });


/* Function to check if blank */
const textChecker = (text) => {
  if (text === "") {
    alert("Please input a value")
    return false
  }
  else return true
}


/* Format text */
const textFormatter = (text) => {
  text = text.toLowerCase();
  return text.replace(/[^\w]|_/g, '')
}


/* Process text */
const textProcessor = (text) => {
  let stringArray = []
  
  for (let index in text) {
    stringArray.push(text[index]);
  }

  let reverseString = stringArray.reverse().join('');
  return reverseString
}


/* Check if palindrome */
const isPalindrome = (text, reverseString) => {
  return (reverseString === text)
}


const main = (text) => {
  console.log(text)
  console.log(textProcessor(textFormatter(text)))

  if (textChecker(text)) {
    const formattedText = textFormatter(text)
    const reverseText = textProcessor(formattedText);
    
    let resultString = text
    
    if (isPalindrome(formattedText, reverseText)) {
       resultString += ' is a palindrome'
    }
    else {
        resultString += ' is not a palindrome'
    }
    resultBox.textContent = resultString;
    resultBox.hidden = false;
    }
  }
