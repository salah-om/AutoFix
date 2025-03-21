import {useState, useEffect} from "react"

export function useFetch(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        let isMounted = true;
        setLoading(true);

        fetch(url)
        .then((response) => response.json()).then((result)=>{
            console.log(result);
            if(isMounted){
                setData(result);
                setLoading(false);
            }
        }).catch((err)=>{
            if(isMounted){
                setError(err.message);
                setLoading(false);
            }
        });

        return () =>{
            isMounted = false;
        }

    }, [url])

    return {data, loading, error}
}