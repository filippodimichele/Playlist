import { ArrowLeft } from "lucide-react"
import AddSongFormV2 from "../components/AddSongFormV2"
import Button from "../components/Button"
import { Link, useNavigate } from "react-router"
import type { Song } from "../data/playlist"
import { env } from "../utils/env"

const NewSongPage = () => {
    const navigate = useNavigate();

    async function onAddSong(data: Omit<Song, 'id'>) {
        await fetch(env.backendUrl + '/playlist', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        navigate('/');
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-full max-w-md">
                <div className="flex items-center gap-3 mb-4">
                    <Link to={'/'}>
                        <Button onlyIcon variant="secondary">
                            <ArrowLeft />
                        </Button> 
                    </Link>
                    <h1 className="font-bold text-4xl">Aggiungi brano</h1>
                </div>
                <AddSongFormV2 onSubmit={onAddSong} />
            </div>
        </div>
    )
}

export default NewSongPage