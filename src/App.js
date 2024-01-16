import Parser from './Parser';
import Ratios from './Ratios';
import './App.css';
import { useState, useEffect } from 'react';
import Images from './Images';
function App() {

  const defaultHeader = {
    X: 0,
    Y: 0,
    Z: 0,
    spaceX: 0,
    spaceY: 0,
    spaceZ: 0,
    windowWidth1: 0,
    windowWidth2: 0,
    windowCenter1: 0,
    windowCenter2: 0,
    slope1: 0,
    slope2: 0,
    intercept1: 0,
    intercept2: 0
}
  const [pictures, setPictures] = useState({});
  const [headers, setHeaders] = useState({});
  const [pic1, setPic1] = useState([])
  const [pic2, setPic2] = useState([])
  const [ratioValue, setRatioValue] = useState('None')
  const [header1, setHeader1] = useState(defaultHeader)
  const [header2, setHeader2] = useState(defaultHeader)

  useEffect(() =>{
    if (headers.length !== undefined){
      console.log(headers.length)
      const keys = Object.keys(headers)
      setHeader1(headers[keys[0]])
      setPic1(pictures[keys[0]])
      setHeader2(headers[keys[1]])
      setPic2(pictures[keys[1]])
    }
},[pictures, headers])

  return (
    <div className="App">
      <header className="App-header">
        <Parser
          setPictures={setPictures}
          setHeaders={setHeaders}
        />
        <Ratios
          setRatioValue={setRatioValue}
        />
      </header>
      <Images
          pic1={pic1}
          pic2={pic2}
          header1={header1}
          header2={header2}
          ratioValue={ratioValue}
        />
    </div>
  );
}

export default App;
