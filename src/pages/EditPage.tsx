
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import type { Song } from "../data/playlist";
import AddSongFormV2 from "../components/AddSongFormV2";
import Button from "../components/Button";
import { env } from "../utils/env";

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [song, setSong] = useState<Song>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getSong() {
            try {
                const res = await fetch(`${env.backendUrl}/playlist/${id}`);

                if (!res.ok) {
                    throw new Error("Impossibile recuperare il brano");
                }

                const data: Song = await res.json();
                setSong(data);
            } catch {
                setError("Errore durante il caricamento del brano");
            } finally {
                setIsLoading(false);
            }
        }

        getSong();
    }, [id]);

    async function onUpdateSong(data: Omit<Song, "id">) {
        const res = await fetch(`${env.backendUrl}/playlist/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            throw new Error("Errore durante il salvataggio");
        }

        navigate("/");
    }

    if (isLoading) {
        return <div>Caricamento...</div>;
    }

    if (error || !song) {
        return (
            <div className="flex flex-col items-center gap-4">
                <p>{error || "Brano non trovato"}</p>
                <Button onClick={() => navigate("/")} variant="secondary">
                    Torna alla Home
                </Button>
            </div>
        );
    }

    return (
        <section className="flex min-h-screen justify-center items-center p-6">
            <div className="w-full max-w-md">
                <div className="flex items-center gap-3 mb-4">
                    <Button
                        onlyIcon
                        variant="secondary"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft />
                    </Button>

                    <h1 className="font-bold text-4xl">
                        Modifica brano
                    </h1>
                </div>

                <AddSongFormV2
                    defaultValues={song}
                    onSubmit={onUpdateSong}
                    onCancel={() => navigate("/")}
                />
            </div>
        </section>
    );
};

export default EditPage;
