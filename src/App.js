import { useState } from 'react';
import './App.css';
import contacts from './contacts.json';

const remainingContacts = contacts.slice(5)

function App() {

  const [contactsArr, setContacts] = useState(contacts.slice(0,5))

  function addRandomContact () {
    let randomContactIndex = Math.floor(Math.random()*remainingContacts.length)
    let randomContact = remainingContacts.splice(randomContactIndex, 1)[0]
    
    const copyContactsArr = [...contactsArr, randomContact]

    setContacts(copyContactsArr)

    console.log(remainingContacts)
  }

  function sortPopularity() {
    let sortedArr = contactsArr.sort(function(a,b){
      return b.popularity-a.popularity
    })

    const copySortedArr = [...sortedArr]
    setContacts(copySortedArr)
  }

  function sortName () {
    let sortedArr = contactsArr.sort(function(a, b) {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    })

    const copySortedArr = [...sortedArr]
    setContacts(copySortedArr)
  }

  const deleteContact = contactId => {
      const filteredArray = contactsArr.filter(element => {
        return element.id !== contactId
      });
      
      setContacts(filteredArray);
    }


  return (
    <div className="App">
    <h1> Iron Contacts</h1>
    <div className='btn-row'>
    <button onClick={addRandomContact}>Add Random Contact</button>
    <button onClick={sortPopularity}>Sort by popularity</button>
    <button onClick={sortName}>Sort by name</button>
    </div>
  
      <table>
        <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
        </thead>

        <tbody>
       {contactsArr.map(element => {
        return (
          <tr>
            <td><img src={element.pictureUrl} height="100px" alt="celebrity"/></td>
            <td>{element.name}</td>
            <td>{element.popularity.toFixed(2)}</td>
            <td>
            {element.wonOscar ? <img src="/images/oscar.png" height="30px" alt="award"/>: ""}
            </td>
            <td>
            {element.wonEmmy && <img src="/images/oscar.png" height="30px" alt="award"/>}
            {!element.wonEmmy && ""}
            </td>
            <td>
            <button onClick={()=>deleteContact(element.id)}>Delete</button>
            </td>
          </tr>
        )
       })}
        </tbody>
</table>

       
    </div>
  );
}

export default App;
