import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "./components/ui/select"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"

import {useEffect, useState} from 'react'
import { Value } from "@radix-ui/react-select"

function App() {

  const [theme, setTheme] = useState("light")

  const [inputLang, setInputLang] = useState("en")

  const [outputLang, setOutputLang] = useState("es")

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector('body').classList.remove('dark')
    } else {
      document.querySelector('body').classList.add('dark')
    }
  })

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  function handleChangeLang(value, type) {
    if (type === "input") {
      setInputLang(value)
    } else {
      setOutputLang(value)
    }
  }

  return (
    <main className="flex flex-col h-screen">
      <header className="flex items-center justify-between bg-gray-100 p-4 shadow-md dark:bg-gray-800">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" className="h-16" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mx-2 text-center">Translator App</h1>
        <Button variant="ghost" onClick={handleChangeTheme}>
            <ThemeIcon className="w-5 h-5" />
            <span className="sr-only">Toggle dark mode</span>
        </Button>
      </header>
      <div className="flex-1 grid gap-6 p-4 md:grid-cols-2 dark:bg-gray-700">
        <div className="grid gap-2">
          <Label htmlFor="input-text" className="text-lg dark:text-gray-100">Input Text</Label>
          <Select onValueChange={(value) => handleChangeLang(value, "input")} defaultValue={"en"}>
            <SelectTrigger className="text-gray-500 dark:text-gray-400">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="input-text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="output-text" className="text-lg dark:text-gray-100">Output Text</Label>
          <Select onValueChange={(value) => handleChangeLang(value, "output")} defaultValue={"es"}>
            <SelectTrigger className="text-gray-500 dark:text-gray-400">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="output-text" />
        </div>
        <Button className="md:col-span-2 dark:text-gray-100" onClick={() => translateText(inputLang, outputLang)}>Translate</Button>
      </div>
      <div className="bg-gray-100 p-4 shadow-md dark:bg-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Translations</h2>
        <ul className="space-y-2 mt-2">
          <li className="text-gray-700 dark:text-gray-300">Hello - Hola</li>
          <li className="text-gray-700 dark:text-gray-300">Goodbye - Adiós</li>
          <li className="text-gray-700 dark:text-gray-300">Please - Por favor</li>
          <li className="text-gray-700 dark:text-gray-300">Thank you - Gracias</li>
          <li className="text-gray-700 dark:text-gray-300">Yes - Sí</li>
        </ul>
      </div>
    </main>
  );
}

function ThemeIcon(props) {
  if (document.querySelector('body').classList.contains('dark')) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    )
  } else {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    )
  }
}

async function translateText(selectedValueInput, selectedValueOutput) {

  const inputText = document.getElementById('input-text')
  const outputText = document.getElementById('output-text')

  const url = "https://text-translator2.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "ec37769452mshdd95dd180c5fa6ep17a417jsnf073bf53cf53",
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
      } catch {
        outputText.placeholder = v2.message;
      }
    });
}

export default App;