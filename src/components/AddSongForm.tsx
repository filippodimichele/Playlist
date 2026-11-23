// creato con il comando rafc

import { useState } from "react";
import Button from "./Button";
import type { Song } from "../data/playlist";

type AddSongFormProps = {
    OnSubmit?: (data: Omit<Song, "id">) => void; // omit crea un nuovo tipo senza id, prende il tipo e ne rimuove le chiavi
};

const AddSongForm = ({ OnSubmit }: AddSongFormProps) => {
    const [newSongTitle, setNewSongTitle] = useState("");
    const [newSongAuthor, setNewAuthor] = useState("");
    const [newSongDuartion, setNewSongDuration] = useState(0);

    const [titleError, setTitleError] = useState<string[]>([]);
    const [autorError, setAutorError] = useState<string[]>([]);
    

    function addSong(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setTitleError([]);
        setAutorError([""]);

        let errors = false;


        if (!newSongTitle.trim()) {
            setTitleError(["Titolo obbligatorio"]);
            errors = true;
        } else {
            if (newSongTitle.trim().length <= 2) {
                setTitleError(prev => [
                    ...prev,
                    "Inserisci almeno 3 caratteri"
                ]);
                errors = true;
            }

            if (/[!@%]/.test(newSongTitle)) {
                setTitleError(prev => [
                    ...prev,
                    "Non puoi inserire uno di questi caratteri (!@%)"
                ]);
                errors = true;
            }
        }

        if (!newSongAuthor.trim()) {
            setAutorError(['Autore obbligatorio']);
            errors = true;
        }

        if (errors) return;

        console.log(newSongTitle, newSongAuthor, newSongDuartion);

        OnSubmit?.({
            title: newSongTitle,
            autor: newSongAuthor,
            duration: newSongDuartion,
        });

        setNewSongTitle("");
        setNewAuthor("");
        setNewSongDuration(0);
        setTitleError([]);
        setAutorError([]);
    }

    return (
        <form onSubmit={addSong} className="mb-8 flex flex-col gap-4">
            <input
                className="bg-gray-200 rounded-md w-full py-2 px-4"
                placeholder="Titolo"
                value={newSongTitle}
                onChange={(e) => setNewSongTitle(e.target.value)}
            />

            {titleError.map((error, i) =>  <p key={i} className="text-red-500 text-xs">{error}</p>)}
            <input
                className="bg-gray-200 rounded-md w-full py-2 px-4"
                placeholder="Autore"
                value={newSongAuthor}
                onChange={(e) => setNewAuthor(e.target.value) }
                />

            {autorError.map((error, index) => (
                <p key={index} className="text-red-500 text-xs">
                    {error}
                </p>
            ))}

            <input
                className="bg-gray-200 rounded-md w-full py-2 px-4"
                placeholder="Durata"
                type="number"
                value={newSongDuartion}
                onChange={(e) => setNewSongDuration(+e.target.value)}
            />

            <Button className="w-fit">
                Aggiungi una canzone
            </Button>
        </form>
    );
};

export default AddSongForm;