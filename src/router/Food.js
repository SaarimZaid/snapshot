import { Fname } from "App.js"
import { useContext } from "react"

const Food = () => {
    const fname = useContext(Fname)
    return <>
        <h1>hello</h1>
        {fname}
        {/* <button>{fname} </button> */}
    </>
}

export default Food