import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    id_db:1,
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    id_db:2,
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false
  },
  {
    id_db:3,
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true
  },
  {
    id_db:4,
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false
  }
]
/*
El key es importante por que react necesita un identificador unico para cada elemento dentro de react para renderisarlo sin problemas
*/
export function App() {
  return (
  <section className='App'>
    {
      users.map(({ userName, name, isFollowing, id_db }) => (
        <TwitterFollowCard
          key={id_db}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))
    }
  </section>  
  )
}