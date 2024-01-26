import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "./components/ui/select"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"

import {useEffect, useState} from 'react'

import translateText from './api/translator'

import ThemeIcon from './assets/themeicon'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

function App() {

  const [theme, setTheme] = useState("dark")

  const [inputLang, setInputLang] = useState("en")
  const [outputLang, setOutputLang] = useState("es")
  const [locate, setLocate] = useState("english")

  useEffect(() => {
    document.querySelector('body').classList.toggle('dark', theme === 'dark');
  });

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  // Method to copy the text from output
  function handleCopyText() {
    const text = document.getElementById('output-text').value
    try {
      navigator.clipboard.writeText(text);
      console.log('Content copied to clipboard');
      alert('Copied!')
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  // Exchange the input and output text values
  function handleExchange() {
    const exchangeText = document.getElementById('input-text').value
    document.getElementById('input-text').value = document.getElementById('output-text').value
    document.getElementById('output-text').value = exchangeText
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
          <Label htmlFor="input-text" className="text-lg text-center dark:text-gray-100">{locate === 'english' ? 'Input text' : locate === 'spanish' ? 'Texto de entrada' : 'Text eingeben'}</Label>
          <div className="flex space-x-1">
            <Select onValueChange={(value) => setInputLang(value)} defaultValue={"en"}>
              <SelectTrigger className="text-gray-500 dark:text-gray-400">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{locate === 'english' ? 'English' : locate === 'spanish' ? 'Inglés' : 'Englisch'}</SelectItem>
                <SelectItem value="es">{locate === 'english' ? 'Spanish' : locate === 'spanish' ? 'Español' : 'Spanisch'}</SelectItem>
                <SelectItem value="fr">{locate === 'english' ? 'French' : locate === 'spanish' ? 'Francés' : 'Französisch'}</SelectItem>
                <SelectItem value="de">{locate === 'english' ? 'German' : locate === 'spanish' ? 'Alemán' : 'Deutsch'}</SelectItem>
                <SelectItem value="ru">{locate === 'english' ? 'Russian' : locate === 'spanish' ? 'Ruso' : 'Russisch'}</SelectItem>
                <SelectItem value="ja">{locate === 'english' ? 'Japanese' : locate === 'spanish' ? 'Japonés' : 'Japanisch'}</SelectItem>
                <SelectItem value="ko">{locate === 'english' ? 'Korean' : locate === 'spanish' ? 'Coreano' : 'Koreanisch'}</SelectItem>
                <SelectItem value="ca">{locate === 'english' ? 'Catalan' : locate === 'spanish' ? 'Catalán' : 'Katalanisch'}</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleExchange()}><FontAwesomeIcon icon={icon({name: 'exchange'})} /></Button>
          </div>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="input-text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="output-text" className="text-lg text-center dark:text-gray-100">{locate === 'english' ? 'Output text' : locate === 'spanish' ? 'Texto de salida' : 'Text ausgeben'}</Label>
          <div className="flex space-x-1">
          <Button onClick={() => handleCopyText()}><FontAwesomeIcon icon={icon({name: 'copy'})} /></Button>
          <Select onValueChange={(value) => setOutputLang(value)} defaultValue={"es"}>
            <SelectTrigger className="text-gray-500 dark:text-gray-400">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{locate === 'english' ? 'English' : locate === 'spanish' ? 'Inglés' : 'Englisch'}</SelectItem>
              <SelectItem value="es">{locate === 'english' ? 'Spanish' : locate === 'spanish' ? 'Español' : 'Spanisch'}</SelectItem>
              <SelectItem value="fr">{locate === 'english' ? 'French' : locate === 'spanish' ? 'Francés' : 'Französisch'}</SelectItem>
              <SelectItem value="de">{locate === 'english' ? 'German' : locate === 'spanish' ? 'Alemán' : 'Deutsch'}</SelectItem>
              <SelectItem value="ru">{locate === 'english' ? 'Russian' : locate === 'spanish' ? 'Ruso' : 'Russisch'}</SelectItem>
              <SelectItem value="ja">{locate === 'english' ? 'Japanese' : locate === 'spanish' ? 'Japonés' : 'Japanisch'}</SelectItem>
              <SelectItem value="ko">{locate === 'english' ? 'Korean' : locate === 'spanish' ? 'Coreano' : 'Koreanisch'}</SelectItem>
              <SelectItem value="ca">{locate === 'english' ? 'Catalan' : locate === 'spanish' ? 'Catalán' : 'Katalanisch'}</SelectItem>
            </SelectContent>
          </Select>
          </div>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="output-text"/>
        </div>
        <Button className="md:col-span-2 dark:text-gray-100" onClick={() => translateText(inputLang, outputLang)}>{locate === 'english' ? 'Translate' : locate === 'spanish' ? 'Traducir' : 'Übersetzen'}</Button>
      </div>
      <div className="bg-gray-100 p-4 shadow-md dark:bg-gray-800">
        <div className="flex">
          <div className="w-full min-h-56">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{locate === 'english' ? 'Recent Translations' : locate === 'spanish' ? 'Traducciones' : 'Übersetzungen'}</h2>
            <ul className="space-y-2 mt-2" id="history-list">
            </ul>
          </div>
          <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost"><FontAwesomeIcon icon={icon({name: 'gear'})} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{locate === 'english' ? 'Settings' : locate === 'spanish' ? 'Ajustes' : 'Einstellungen'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={locate} onValueChange={setLocate}>
                <DropdownMenuRadioItem value="english">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="spanish">Spanish</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="german">German</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <p className="text-center text-gray-100 text">Made with ❤️ by Michillas</p>
      </div>
    </main>
  );
}

export default App;