import React, { useEffect, useState, useMemo } from "react"

const PoliticianCard = React.memo(function PoliticianCard({ politician }) {
  console.log(`Rendering della card ${politician.name}`);
  return (
    <li><div>
      <h3>Name: {politician.name}</h3>
      <img src={politician.image || "/placeholder.jpg"} alt={politician.name}
        onError={(e) => {
          e.target.src = "/placeholder.jpg";
        }} />
      <p><strong>Position:</strong> {politician.position}</p>
      <p><strong>Biography:</strong> {politician.biography}</p>
    </div>
    </li>
  )
})


function App() {

  const [politiciansList, setPoliticiansList] = useState([]);
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');

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



  const positionArray = useMemo(() => {
    const positionArray = [];

    politiciansList.forEach((p) => {
      if (!positionArray.includes(p.position)) {
        positionArray.push(p.position);
      }
    })

    return positionArray;
  }, [politiciansList])


  const filteredPoliticians = useMemo(() => {
    return politiciansList.filter(p => (p.name.toLowerCase().includes(search.toLocaleLowerCase()) || p.biography.toLocaleLowerCase().includes(search.toLocaleLowerCase())) && (select === '' || p.position === select))

  }, [politiciansList, search, select]);

  return (
    <>
      <h1>Lista di politici:</h1>

      <input type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cerca politico..." />

      <select value={select} onChange={(e) => setSelect(e.target.value)}>
        <option value="">Posizione</option>
        {positionArray && positionArray.map(p => <option key={p} value={p}>{p}</option>)}
      </select>

      <ul>
        {filteredPoliticians && filteredPoliticians.map(politician => <PoliticianCard key={politician.id} politician={politician} />)}
      </ul>
    </>
  )
}

export default App
