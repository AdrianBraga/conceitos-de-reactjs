import React, { useState,useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Microsoft',
      url: 'https://www.github.com/microsoft',
      techs: ['Node.js', 'ReactJS']
    })

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));
  }

  async function handleLikeRepository(id) {
    // await api.post(`repositories/${id}/like`);

    // setRepositories(repositories.filter(
    //   repository => repository.id === likes
    // ))

    const response = await api.post(`repositories/${id}/like`)

    setRepositories([
      ...repositories.map(repository => {
        if (repository.id === id) {
          return response.data
        };

        return repository;
      })
    ])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <ul>
              <li>{repository.title}</li>
              <li  key={repository.id}>Likes: {repository.likes} </li>
            </ul>

            <button className="remove" onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

            <button className="likes" onClick={() => handleLikeRepository(repository.id)}>
              Like
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
