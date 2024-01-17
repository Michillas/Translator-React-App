import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "./components/ui/select"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"

function App() {
  return (
    <main className="flex flex-col h-screen">
      <header className="flex items-center justify-between bg-gray-100 p-4 shadow-md dark:bg-gray-800">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" className="h-16" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mx-2 text-center	">Translator App</h1>
        <Select>
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
      </header>
      <div className="flex-1 grid gap-6 p-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="input-text" className="text-lg">Input Text</Label>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="input-text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="output-text" className="text-lg">Output Text</Label>
          <textarea className="h-64 p-2 border rounded-md dark:bg-gray-800 dark:text-gray-100" id="output-text" />
        </div>
        <Button className="md:col-span-2">Translate</Button>
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

export default App;
