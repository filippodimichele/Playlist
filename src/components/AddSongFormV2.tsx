
import { useEffect, useState, useRef } from "react";
import type { FormEvent } from "react";
import Button from "./Button"
import type { Song } from "../data/playlist";
import { Loader2, Plus, Save } from "lucide";
import { MorphIcon } from "morphicons/react";
import { cn } from "../utils/cn";

type AddSongFormProps = {
    defaultValues?: typeof defaultState.values;
    onSubmit?: (data: Omit<Song, 'id'>) => Promise<void>;
    onCancel?: () => void;
}

const defaultState = {
    isSubmitting: false,
    submitError: "",
    values: {
        title: "",
        autor: "",
        duration: 0,
    },
    errors: {
        title: [] as string[],
        autor: [] as string[],
        duration: [] as string[],
    }
}

const AddSongFormV2 = ({ defaultValues, onSubmit, onCancel }: AddSongFormProps) => {
    const [formState, setFormState] = useState(defaultState);
    const isSubmittingRef = useRef(false);
    useEffect(() => {
        setFormState({ ...defaultState, values: defaultValues || defaultState.values })
    }, [defaultValues])

    async function addSong(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isSubmittingRef.current) return;

        let errors = { ...defaultState.errors };


        setFormState(prev => ({
            ...prev,
            errors: defaultState.errors
        }))

        if (!formState.values.title) {
            errors = { ...errors, title: ['Titolo obbligatorio'] }
        } else {
            if (formState.values.title.length <= 2) {
                errors = {
                    ...errors,
                    title: Array.from(new Set([...errors.title, 'Inserisci almeno 3 caratteri']))
                }
            }
            if (/[!@%$]/.test(formState.values.title)) {
                errors = {
                    ...errors,
                    title: Array.from(new Set([...errors.title, 'Non poi inserire questi caratteri (!@%$)']))
                }
            }
        }

        if (!formState.values.autor) {
            errors = { ...errors, autor: ['Autore obbligatorio'] }
        }

        if (!formState.values.duration) {
            errors = { ...errors, duration: ['La durata deve essere maggiore di 0'] }
        }

        if (Object.values(errors).some(arr => arr.length)) {
            setFormState(prev => ({ ...prev, errors }));
            return;
        };

        setFormState(prev => ({ ...prev, isSubmitting: true }));

        try {
            await onSubmit?.(formState.values);
            setFormState(defaultState);
        } catch {
            setFormState(prev => ({
                ...prev,
                isSubmitting: false,
                submitError: "Errore durante il salvataggio del brano",
            }));
        } finally {
            isSubmittingRef.current = false;
        }


    }

    return (
        <form onSubmit={addSong} className="mb-8 flex flex-col gap-4">
            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Titolo"
                value={formState.values.title}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, title: e.target.value },
                    }))
                }}
            />
            {formState.errors.title.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}
            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Autore"
                value={formState.values.autor}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, autor: e.target.value },
                    }))
                }}
            />
            {formState.errors.autor.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}
            <input
                className="bg-gray-200 rounded-full w-full py-2 px-4"
                placeholder="Durata"
                type="number"
                value={formState.values.duration}
                onChange={(e) => {
                    setFormState(prev => ({
                        ...prev,
                        values: { ...prev.values, duration: +e.target.value },
                    }))
                }}
            />
            {formState.errors.duration.map((error, i) => <p key={i} className="text-red-500 text-xs">{error}</p>)}

            <div className="flex gap-4">
                <Button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="w-fit"
                >
                    <MorphIcon
                        className={cn(formState.isSubmitting && 'animate-spin')}
                        icon={formState.isSubmitting ? Loader2 : defaultValues ? Save : Plus}
                    />
                    {defaultValues ? 'Modifica' : 'Aggiungi'} canzone
                </Button>
                {defaultValues && (
                    <Button
                        type="button"
                        disabled={formState.isSubmitting}
                        onClick={onCancel}
                        variant="tertiary"
                    >Annulla modifica</Button>
                )}
            </div>
        </form>
    )
}

export default AddSongFormV2
