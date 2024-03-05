import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed]= useState(false); 
  const [charAllowed, setCharAllowed]= useState(false); 
  const [password, setPassword]=useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "01234567890"
    if(charAllowed) str += "!@#$%^&*()[]{}~`"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
1     
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword ])

 const copyPasswordToClipboard=useCallback( () =>{
     passwordRef.current?.select();
     passwordRef.current?.setSelectionRange(2,24); //use for we need only 9 digit pass 
     window.navigator.clipboard.writeText(password)
 },[password])


useEffect(() => {
  passwordGenerator()
},[length, numberAllowed, charAllowed, passwordGenerator])

  return (
    
    <div className='w-full max-w-lg mx-auto shadow-sm px-4 py-3 my-14 rounded-lg bg-cyan-400 text-black'>
      <h1 className='text-center text-4xl my-3'>Password Generator</h1>

      <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full  py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
      </div>
      <button
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-lg flex  '>copy</button>
      
      


       <div className='flex text-sm gap-x-2  mt-2'>
        <div className='flex items-center
        gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
          
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onClick={() => {setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>


          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onClick={() => {setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
          </div>



         </div>
       </div>
    </div>
    
    
  )
}

export default App
