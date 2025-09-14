import { useState,useCallback ,useEffect,useRef} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
function App() {
  const [length,setlength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setcharAllowed]=useState(false)
  const [password,setPassword]=useState()
  const passwordRef=useRef(null)

  const passwordgenrator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQSTUVWXYZabcdefghijklmnopqrstuvwxy"
    if (numberAllowed)str+="0123456789"
    if (charAllowed)str+="!@#$%^&*"
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      console.log(char);
      pass+=str.charAt(char)  
    }
    setPassword(pass)

  } ,[length,charAllowed,numberAllowed,setPassword])

   const print=document.getElementById("cop")
  const copypassword=useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,2)
  window.navigator.clipboard.writeText(password)
 
print.innerHTML="password copied"

  },[password])
  useEffect(()=>{
    passwordgenrator()
  },
  [length,numberAllowed,charAllowed,passwordgenrator])
  return (

<> 
<div className='   flex justify-center w-full max-w-md mx-auto shadow-md rounded-lg  my-8 py-20 text-orange-500 bg-gray-800 items-center flex-col'>
  <h1 className='  text-white text-center mx-28 p-10 '>password genrator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-10 '>
    <input type="text" 
    value={password}
    className='bg-amber-100 w-full py-1 px-3'
    placeholder='password'
    readOnly
    ref={passwordRef}
    />
    <button onClick={copypassword}  className='outline-none bg-blue-700 text-white'>copy</button>
    <p><h1 id='cop'></h1></p>
  </div>
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input type="range"
      min={4}
      max={100}
      value={length}
      className='cursor-pointer'  
      onChange={(e)=>{setlength(e.target.value)}}
      />
      <label>length:{length}</label>

    </div>
    
     <div className='flex items-center gap-x-2 p-8'>
      <input type="checkbox"
      defaultChecked={charAllowed} 
      id='charinput' 
  onChange={ ()=> {setcharAllowed((prev) => !prev)}}
      />
      <label htmlFor="charaterInput">charinput</label>
    </div> 
    

    <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      Checked={numberAllowed} 
      id='numberInput'
      onChange={()=>{setNumberAllowed((prev)=>!prev);}}
      
      />
      <label htmlFor="numberInput">number</label>
    </div>

  </div>
</div>
</>

  )

}

export default App
