import { useEffect, useState } from "react"


function App() {

  const [politiciansList, setPoliticiansList] = useState([]);

  useEffect(() => {
    async function politiciansFetch() {

      try {
        const politicianPromise = await fetch(`http://localhost:3333/politicians`);
        const politiciansData = await politicianPromise.json();
        setPoliticiansList(politiciansData);
      } catch (error) {
        throw new Error('Errore nel caricamento della lista dei politici')
      }
    }

    politiciansFetch();
  }, []);

  return (
    <>
      <h1>Lista di politici:</h1>
      <ul>
        {politiciansList && politiciansList.map(politician => <li key={politician.id}><div>
          <h3>Name: {politician.name}</h3>
          <img src={politician.image || "/placeholder.jpg"} alt={politician.name}
            onError={(e) => {
              e.target.src = "/placeholder.jpg";
            }} />
          <p><strong>Position:</strong> {politician.position}</p>
          <p><strong>Biography:</strong> {politician.biography}</p>
        </div>
        </li>)}
      </ul>
    </>
  )
}

export default App
