
import { useEffect, useState } from "react";
import SongRow from "../components/SongRow";
import { type Song } from "../data/playlist";
import { env } from "../utils/env";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";
import { Plus } from "lucide-react";



// App è un componente React
// i componenti sono funzioni il cui nome inizia sempre per Maiuscola
// la loro funzione è poter tornare JSX/TSX che è l'html dentro il JS (o TS)
// i componenti posso essere usati in altri componenti come se fossero tag HTML nella sintassi <App></App>
function HomePage() {
  // State -> funzione di react
  // Serve a gestire lo stato di un componente (la sua memoria)
  // useState fa parte di un gruppo di funzioni che react chiama Hooks
  // Gli hooks hanno la capacità di interagire automaticamente con il componente sotto diversi aspetti
  // Lo state nello specifico serve a salvare un qualsiasi valore (come una variabile normale) e al cambiare del suo valore fa "re-rendering" del componente
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [playingSong, setPlayingSong] = useState<Song['id']>();
  // const [editingSong, setEditingSong] = useState<Song>();
  const navigate = useNavigate();

  const playingSongObj = playlist.find((song) => song.id === playingSong);

  useEffect(() => {
    fetch(env.backendUrl + '/playlist')
      .then(res => res.json())
      .then(data => {
        setPlaylist(data);
      })
  }, [])

  /*  async function onAddSong(data: Omit<Song, 'id'>) {
     const res = await fetch(env.backendUrl + '/playlist', {
       method: 'POST',
       body: JSON.stringify(data),
       headers: { 'Content-Type': 'application/json' },
     })
     const newSong = await res.json();
     setPlaylist(prev => [newSong, ...prev])
   } */

  /*  async function onUpdateSong(data: Omit<Song, 'id'>) {
     const res = await fetch(`${env.backendUrl}/playlist/${editingSong?.id}`, {
       method: 'PUT',
       body: JSON.stringify(data),
       headers: { 'Content-Type': 'application/json' },
     });
     const updatedSong = await res.json();
     setPlaylist(prev => prev.map(song => song.id === updatedSong.id ? updatedSong : song));
     setEditingSong(undefined);
   } */

  async function onDeleteSong(id: Song["id"]) {
    await fetch(`${env.backendUrl}/playlist/${id}`, { method: 'DELETE' });
    setPlaylist(prev => prev.filter(song => song.id !== id))
  }

  // ogni componente può tornare un solo elemento JSX
  return (
    // il tag vuoto si chiama Fragment
    // ci aiuta a raggruppare più elementi in uno senza aggiungere tag superflui
    <>
      {/* section */}
      <section className="min-h-screen flex justify-center items-center p-6">
        {/* card playlist */}
        <div className="w-full max-w-lg">
          {/* titolo */}
          {/* titolo e pulsante */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-bold text-4xl">La mia playlist</h1>

            <Link to="/song/new">
              <Button>
                <Plus /> Aggiungi brano
              </Button>
            </Link>
          </div>

          {/* aggiungi */}
          {/*  <AddSongFormV2
            defaultValues={editingSong}
            onSubmit={editingSong ? onUpdateSong : onAddSong}
            onCancel={() => setEditingSong(undefined)}
          /> */}

          {/* lista */}
          <div className="flex flex-col gap-4">
            {/* qui va la lista dei brani */}
            {/* Dato che all'interno del JSX posso scrivere solo espressioni JS tra le graffe, l'unico modo per fare dei cicli, è usare il .map che mi permette di convertire un qualsiasi array in un array di JSX. */}
            {/* Il map, come qualsiasi cosa che torna del JSX, può toranre un solo elemento, quindi con più elementi uso il Fragment. Inoltre l'elemento che ritorno deve avere la prop "key" e deve essere univoca */}
            {playlist.map(song =>
              <SongRow
                key={song.id}
                onClick={() => setPlayingSong(song.id === playingSong ? undefined : song.id)}
                song={song}
                active={song.id === playingSong}
                onDelete={() => onDeleteSong(song.id)}
                onEdit={() => navigate(`/song/${song.id}`)}

              />
            )}
          </div>
          {/* in riproduzione */}
          {/* Per fare rendering condizionale il react, uso l'operatore logico AND (&&) */}
          {playingSongObj && <p className="text-center mt-6">Brano in riproduzione: {playingSongObj.title}</p>}
        </div>
      </section>
    </>
  )
}

export default HomePage
