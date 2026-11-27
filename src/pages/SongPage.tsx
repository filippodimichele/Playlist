import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import { env } from "../utils/env";
import AddSongFormV2 from "../components/AddSongFormV2";
import type { Song } from "../data/playlist";
import { ArrowLeft } from "lucide-react";
import Button from "../components/Button";
import { AutoSkeleton } from 'auto-skeleton-react'

const SongPage = () => {
    const { id } = useParams<{ id: string }>();
    const [currentSong, setCurrentSong] = useState<Song>()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${env.backendUrl}/playlist/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCurrentSong(data);
                document.title = `${data.title} | PlayBasic`
            })
    }, [id])

    async function onUpdateSong(data: Omit<Song, 'id'>) {
        await fetch(`${env.backendUrl}/playlist/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });
        navigate("/")
    }

    function resetForm() {
        setCurrentSong({ ...currentSong! });
    }

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="w-full max-w-md">
                <div className="flex items-center mb-4 gap-3">
                    <Link to={'/'}>
                        <Button onlyIcon variant="secondary">
                            <ArrowLeft />
                        </Button>
                    </Link>
                    <h1 className="font-bold text-4xl">Modifica Brano</h1>
                </div>
                <AutoSkeleton loading={!currentSong}>
                    <AddSongFormV2
                        defaultValues={currentSong}
                        onSubmit={onUpdateSong}
                        onCancel={resetForm}
                    />
                </AutoSkeleton>
            </div>
        </div>
    )
}

export default SongPage