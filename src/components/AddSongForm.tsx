// creato con il comando rafc

import { useState } from "react";
import Button from "./Button";
import type { Song } from "../data/playlist";

type AddSongFormProps = {
    OnSubmit?: (data: Omit<Song, "id">) => void; // omit crea un nuovo tipo senza id, prende il tipo e ne rimuove le chiavi
};

const AddSongForm = ({ OnSubmit }: AddSongFormProps) => {
    const [newSongTitle, setNewSongTitle] = useState("");
    const [newSongAuthor, setNewSongAuthor] = useState("");
    const [newSongDuration, setNewSongDuration] = useState(0);
    const [titleError, setTitleError] = useState<string[]>([]);
    const [autorError, setAutorError] = useState<string[]>([]);

    function addSong(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setTitleError([]);
        setAutorError([]);
        let errors = false;

        if (!newSongTitle) {
            setTitleError(['Titolo obbligatorio']);
            errors = true;
        } else {
            if (newSongTitle.length <= 2) {
                setTitleError(prev => Array.from(new Set([...prev, 'Inserisci almeno 3 caratteri'])))
                errors = true;
            }
            if (/[!@%$]/.test(newSongTitle)) {
                setTitleError(prev => Array.from(new Set([...prev, 'Non puoi inserire uno di questi caratteri (!@%$)'])))
                errors = true;
            }
        }

        if (!newSongAuthor) {
            setAutorError(['Autore obbligatorio']);
            errors = true;
        }

        if (errors) return;

        setNewSongTitle("");
        setNewSongAuthor("");
        setNewSongDuration(0);

        OnSubmit?.({
            title: newSongTitle,
            autor: newSongAuthor,
            duration: newSongDuration,
        })
    }

    return (
        <form onSubmit={addSong} className="mb-8 flex flex-col gap-4">
            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Titolo"
                value={newSongTitle}
                onChange={(e) => { setNewSongTitle(e.target.value) }}
            />
            {titleError.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}
            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Autore"
                value={newSongAuthor}
                onChange={(e) => { setNewSongAuthor(e.target.value) }}
            />
            {autorError && <p className="text-red-500 text-xs">{autorError}</p>}
            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Durata"
                type="number"
                value={newSongDuration}
                onChange={(e) => { setNewSongDuration(+e.target.value) }}
            />
            <Button className="w-fit">Aggiungi canzone</Button>
        </form>
    )
}

export default AddSongForm