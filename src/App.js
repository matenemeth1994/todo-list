import styles from "./App.module.css";
import React, { useState, useEffect } from "react";

import { firestore } from "./firebase.js";

const App = () => {
  const [todoItems, setTodoItems] = useState([]);

  const [newItem, setNewItem] = useState([]);

  useEffect(() => {
    // first load up page...
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    firestore
      .collection("todo-challenge")
      .doc("challenge-list")
      .get()
      .then(doc => {
        const retrievedItems = doc.data().items;
        console.log(retrievedItems);
        setTodoItems(retrievedItems);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToDb = () => {
    const newItems = [...todoItems, newItem];

    const newDoc = {
      items: newItems
    };

    firestore
      .collection("todo-challenge")
      .doc("challenge-list")
      .set(newDoc)
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteFromDb = item => {
    const newArray = [...todoItems];
    const position = newArray.indexOf(item);
    newArray.splice(position, 1);

    const newDoc = {
      items: newArray
    };

    firestore
      .collection("todo-challenge")
      .doc("challenge-list")
      .set(newDoc)
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getItemJsx = () => {
    return todoItems.map(item => {
      return (
        <>
          <div className={styles.outputField}>
            <p>Create Date:{item.dateCreated}</p>
            <p>Date Done By:{item.dateCompleted}</p>
            <p>Name:{item.name}</p>
            ImageURL:
            <img src={item.image} />
            <button onClick={() => deleteFromDb(item)}>Delete</button>
          </div>
        </>
      );
    });
  };

  return (
    <>
      <div className={styles.inputField}>
        <h1>Todo-List</h1>
        <input
          type="text"
          placeholder="Create Date"
          onInput={event =>
            setNewItem({ ...newItem, dateCreated: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Date Done By"
          onInput={event =>
            setNewItem({ ...newItem, dateCompleted: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Name"
          onInput={event =>
            setNewItem({ ...newItem, name: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="ImageURL"
          onInput={event =>
            setNewItem({ ...newItem, image: event.target.value })
          }
        />
        <button onClick={addToDb}>Submit</button>
      </div>
      {/* <div className={styles.outputField}>{getItemJsx()}</div>  */}
      {getItemJsx()}
    </>
  );
};

export default App;
