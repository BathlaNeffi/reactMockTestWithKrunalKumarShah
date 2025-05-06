import React, { useEffect, useState } from 'react'

export default function Calculator() {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [result, setResult] = useState(0);
    const [history, setHistory] = useState([]);
    const [operation, setOperation] = useState("+");



    useEffect(() => {
        const fetchfromLocla = async () => {
            try {
                let localSt = await localStorage.getItem("history");
                let parseData = JSON.parse(localSt) || [];
                // console.log("ITS running", localSt, "parsed", parseData);
                setHistory([...parseData]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchfromLocla();
    }, []);

    const handleOperation=(e)=>{
        setOperation(e.target.value);
    }



    const calculate = () => {

        let val = eval(`${parseInt(x)} ${operation} ${parseInt(y)}`);
        let localVal = `${parseInt(x)} ${operation} ${parseInt(y)}=${val}`;
        history.push(localVal);
        setHistory([...history]);
        localStorage.setItem("history", JSON.stringify(history));
        setResult(val);
        setX(0);
        setY(0);
    }
    return (
        <>
            <input type='number' value={x} onChange={(e) => setX(e.target.value)} />
            <select name="operations" id="op" value={operation} onChange={handleOperation}>
                <option value="+">addition</option>
                <option value="-">substraction</option>
                <option value="*">multiplication</option>
                <option value="/">division</option>
            </select>
            <input type='number' value={y} onChange={(e) => setY(e.target.value)} />
            <button onClick={calculate} >Calculate</button>
            {`   RESULT:==>    ${result}`}
            <h1>History</h1>
            <ol>
                {history.map((item, index) => <li key={index}>{item}</li>)}
            </ol>
        </>
    )
}
