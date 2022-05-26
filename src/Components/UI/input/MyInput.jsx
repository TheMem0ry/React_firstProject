import React from "react";
import classes from "./MyInput.module.css";


const MyInput =React.forwardRef( (props, ref) => {

    // console.log(props)

    return (
        <input ref={ref} {...props} className={classes.myInput}/>
    );
});

export default MyInput;