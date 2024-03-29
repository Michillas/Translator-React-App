async function translateText(selectedValueInput, selectedValueOutput) {

  const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;

  const inputText = document.getElementById('input-text')
  const outputText = document.getElementById('output-text')

  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
      source_language: selectedValueInput,
      target_language: selectedValueOutput,
      text: inputText.value,
    }),
  };
  const promise = fetch(url, options);
  promise
    .then((v1) => {
      return v1.json();
    })
    .then((v2) => {
      try {
        outputText.value = v2.data.translatedText;

        // Translation history logic
        const translation = inputText.value + " - " + outputText.value

        const historyList = document.getElementById("history-list");

        if (historyList.children.length >= 5) {
          historyList.firstElementChild.remove();
        }

        const li = document.createElement("li");
        li.className = "text-gray-700 dark:text-gray-300";
        li.textContent = translation;
        
        historyList.appendChild(li);
      } catch {
        outputText.placeholder = v2.message;
      }
    });
}

export default translateText