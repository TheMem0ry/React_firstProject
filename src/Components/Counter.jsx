import React, {useState} from "react";

const Counter = () => {
    const [count, setCount] = useState(0)


    function increase(){
        setCount(count+1)
    }

    function decrease(){
        setCount(count-1)
    }


    return (
        <div>
            <h1>Counter:{count}</h1>
            <button onClick={increase}>Increase</button>
            <button onClick={decrease}>Decrease</button>
        </div>
    );    
}

export default Counter;