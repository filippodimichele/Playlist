import { useEffect } from "react";
import { env } from "../utils/env";
import { useParams } from "react-router"

const SongPage = () => {
    const { id } = useParams();

    useEffect(() => {
        fetch(`${env.backendUrl}/playlist/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
        })
    }, [])
    return (
        <div>Canzone con id:{id}</div>
    )
}

export default SongPage
