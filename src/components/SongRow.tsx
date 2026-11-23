

//per definire un tipo custom in typescript si usa la sintassi qui sotto,  sove type è la keywork seguita dal nome.
//spesso per convenzione il tipo segue il formato CamelCase
//per indicare il tipo di una variabile mettiamo il tpo dopo i 2 punti e prima dell' inizializzazione
//i componenti accettano come regola di react un solo parametro, che deve essere un oggetto
//in questo caso l'oggetclassNameto passsato è di tipo SongProps


import { MorphIcon } from "morphicons/react";
import { cn } from "../utils/cn";
import { secondsToMinutes } from "../utils/time";
import Button from "./Button";
import { Loader2, Trash2 } from "lucide";
import type { Song } from "../data/playlist";
import { useState } from "react";
import { Edit } from "lucide-react";

// per definire un tipo custom in typescript si usa la sintassi qui sotto dove type è la keywork seguita dal nome.
// Spesso per convenzione il tipo segue il formato CamelCase
// per indicare il tipo di una variabile mettiamo il tipo dopo i 2 punti e prima dell'inizializzazione
type SongProps = {
    song: Song;
    onClick?: () => void;
    active?: boolean;
    onDelete?: () => Promise<void>;
    onEdit?: () => void;
}

// i componenti accettano come regola di react un solo parametro che deve essere un oggetto
// in questo caso l'oggetto passato è di tipo SongProps
const SongRow = ({ song, onClick, active, onDelete, onEdit }: SongProps) => {

    const [isDeleting, setIsDeleting] = useState(false);

    return (
        // riga
        <div
            onClick={onClick}
            className={cn(
                "flex items-center justify-between p-4 rounded-full border border-gray-300",
                active && "border-blue-600",
            )}
        >
            {/* parte sinistra (cerchio + i 2 testi) */}
            <div className="flex items-center gap-4">
                <div className={cn(
                    "size-16 rounded-full flex items-center justify-center relative bg-black",
                    active && "animate-spin bg-blue-600"
                )}>
                    <div className="size-4 rounded-full bg-white"></div>
                    <div className="w-[30%] h-1 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 rounded-full"></div>
                </div>
                <div>
                    <p className="font-semibold">{song.title}</p>
                    <p className="opacity-60">{song.autor}</p>
                </div>
            </div>

            {/* parte destra */}
            <div className="flex items-center gap-4">
                <p className="font-semibold opacity-60 pr-4">{secondsToMinutes(song.duration)}</p>

                <Button variant="secondary" onlyIcon onClick={e => {
                    e.stopPropagation();
                    onEdit?.();
                }}>
                    <Edit />
                </Button>

                <Button
                    variant="danger"
                    onlyIcon
                    disabled={isDeleting}
                    className={cn(isDeleting && 'animate-spin')}
                    onClick={async (e) => {
                        e.stopPropagation();
                        setIsDeleting(true)
                        await onDelete?.();
                        setIsDeleting(false)
                    }}>
                    <MorphIcon icon={isDeleting ? Loader2 : Trash2} />
                </Button>
            </div>
        </div>
    )
}

export default SongRow