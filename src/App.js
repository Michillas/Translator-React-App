import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "./components/ui/select"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"

import {useEffect, useState} from 'react'

import translateText from './api/translator'

import ThemeIcon from './assets/themeicon'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

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

  function handleCopyText() {
    let text
    text = document.getElementById('output-text').value
    try {
      navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
      alert('Copied!')
    } catch (err) {
      console.error('Failed to copy: ', err);
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
          <div className="flex space-x-1">
            <Select onValueChange={(value) => handleChangeLang(value, "input")} defaultValue={"en"}>
              <SelectTrigger className="text-gray-500 dark:text-gray-400">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="ca">Catalan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="input-text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="output-text" className="text-lg dark:text-gray-100">Output Text</Label>
          <div className="flex space-x-1">
          <Select onValueChange={(value) => handleChangeLang(value, "output")} defaultValue={"es"}>
            <SelectTrigger className="text-gray-500 dark:text-gray-400">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ru">Russian</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
              <SelectItem value="ca">Catalan</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => handleCopyText()}><FontAwesomeIcon icon={icon({name: 'copy'})} /></Button>
          </div>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="output-text"/>
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
      <div className="bg-black">
        <p className="text-center text-gray-100 text">Made with ❤️ by Michillas</p>
      </div>
    </main>
  );
}

export default App;