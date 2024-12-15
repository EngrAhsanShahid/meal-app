import { useEffect, useState } from "react"


function useGetData() {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://dummyjson.com/recipes`)
            .then((res) => res.json())
            .then((res) => setData(res))
    }, [])
    return data
}

export default useGetData;