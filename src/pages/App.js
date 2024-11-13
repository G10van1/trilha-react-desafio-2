
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {

    try {
      var { data } = await api.get(`repos/${currentRepo}`);
      console.log(data);
    } catch (error) {
      alert(error.response?.status === 404 ? 'Repositório não encontrado' :
                                             'Erro ' + error.response?.status + ' na busca do repositório'); 
    }

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;
      }

    }
    alert('Repositório já inserido')

  }

  const handleRemoveRepo = (id) => {
    console.log('Removendo registro', id);

    setRepos(repos.filter(repo => repo.id !== id));
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
