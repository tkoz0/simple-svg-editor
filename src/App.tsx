import React, { useRef, useState } from 'react';
import './App.css';

/*
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}
*/

function App() {
    type coord = [number,number];
    const [list,setList] = useState<Array<[coord,coord]>>([]);
    const sizex = 854;
    const sizey = 480;
    const svgref = useRef<SVGSVGElement>(null);
    return (
        <div>
            <h1>SVG</h1>
            {/*<ul>
                {list.map(n => <li>{String(n)}</li>)}
            </ul>*/}
            <button onClick={e => {
                if (list.length > 0) {
                    setList([ ...list.slice(0,list.length-1)]);
                }
            }} style={{display:"block",margin:"0 auto"}}>undo</button><br />
            <svg ref={svgref} width={sizex} height={sizey} viewBox={'0 0 '+sizex+' '+sizey}
                xmlns="http://www.w3.org/2000/svg" style={{
                display: "block",
                margin: "0 auto",
                border: "1px solid black"
            }} onMouseDown={e => {
                let bound = svgref.current!.getBoundingClientRect();
                let c: coord = [Math.round(e.clientX-bound.x),Math.round(e.clientY-bound.y)];
                setList([
                    ...list,
                    [c,c]
                ]);
            }} onMouseUp={e => {
                let bound = svgref.current!.getBoundingClientRect();
                let c: coord = [Math.round(e.clientX-bound.x),Math.round(e.clientY-bound.y)];
                setList([
                    ...list.slice(0,list.length-1),
                    [list[list.length-1][0],c]
                ]);
            }} onMouseMove={e => {
                if (e.buttons === 1) {
                    let bound = svgref.current!.getBoundingClientRect();
                    let c: coord = [Math.round(e.clientX-bound.x),Math.round(e.clientY-bound.y)];
                    setList([
                        ...list.slice(0,list.length-1),
                        [list[list.length-1][0],c]
                    ]);
                }
            }}>
                {list.map((p,i) => <line x1={p[0][0]} y1={p[0][1]} x2={p[1][0]} y2={p[1][1]} stroke="black" strokeWidth={2} />)}
            </svg>
        </div>
    );
}

export default App;
