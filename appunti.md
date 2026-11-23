fasi installaziome server npm:

1. npm create vite@latest .
 / React-TypeScript



2. npm install (dipendenze package)
3. npm run dev (avvio server locale)



tag nulli = tag che non hanno una chiusura 


StriceMode = serve a React a dare consigli sugli errori
Espressione = componente che ritorna un valore


ESTENSIONI DA INSTALLARE:


1. oxlint
2. autorename tag
3. autoclose  tag
4. ES7 React/Redux/GraphQL/React-Native snippets
5. TailWind CSS IntelliSense
6. htmltagwrap
7. pretty typescrip
8. template string converter
9. 


commenti jsx {/* */}  

React è un framework SPA (single-page-application) (applicazione a singola pagina)

una libreria è un insieme di funzioni che uso nel progetto, un framework inroduce delle regole




esercizio:
al set, prima controllo uguale or undefind


LIBRERIE INSTALLATE

1. tailwind merge 
2. clsx 



# COMPONENTI E DIPENDENZE

\"": backrun

 cocnurrently npm :  per avviare un unico comando per entrambe le aree
json server: per avere un rest backend  attraverso un db.json
npm i -D vite-tsconfing-paths



1) modificare il vite confing con:

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/db.json']
    }
  }
})


2) modificare il package.json i seguenti elementi: 

"scripts": {
    "dev": "concurrently  -n \"REACT,DB\" -c \"\" \" npm run dev:front\" \"npm run dev:back\"",
    "dev:front": "vite",
    "dev:back": "json-server db.json",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },


  3) creare il db.json, .env e utils con .env.ts




  







