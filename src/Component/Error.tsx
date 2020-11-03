import React from "react";

function Error({msg} : {msg: string}){
    return <p>에러 : {msg}</p>
}

export default Error;