import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [toDos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2></h2>
      </div>
      <div className="input">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="  🖊️ Add item..."
        />
        <i
          onClick={() => {
            if (todo.trim()) {
              setTodos([...toDos, { id: Date.now(), text: todo, status: false }]);
              setTodo('');
            }
          }}
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((value) => (
          <div
            className="todo"
            key={value.id}
            style={{
              backgroundColor: value.status ? '#06402B' : '#8B0000',
            }}
          >
            <div className="left">
              <input
                type="checkbox"
                checked={value.status}
                onChange={(e) => {
                  setTodos(
                    toDos.map((value2) => {
                      if (value2.id === value.id) {
                        value2.status = e.target.checked;
                      }
                      return value2;
                    })
                  );
                }}
              />
              {value.isEditing ? (
                <input
                  className="edittext"
                  value={value.tempText || value.text} // Use tempText during editing
                  onChange={(e) => {
                    setTodos(
                      toDos.map((value2) => {
                        if (value2.id === value.id) {
                          value2.tempText = e.target.value; // Update tempText
                        }
                        return value2;
                      })
                    );
                  }}
                />
              ) : (
                <p>{value.text}</p>
              )}
            </div>
            <div className="right">
              {value.isEditing ? (
                <>
                  <i
                    className="fas fa-save"
                    onClick={() => {
                      setTodos(
                        toDos.map((value2) => {
                          if (value2.id === value.id) {
                            value2.text = value2.tempText || value2.text; // Save tempText
                            value2.isEditing = false;
                            delete value2.tempText; // Remove tempText
                          }
                          return value2;
                        })
                      );
                    }}
                  ></i>
                  <i
                    className="fas fa-times"
                    onClick={() => {
                      setTodos(
                        toDos.map((value2) => {
                          if (value2.id === value.id) {
                            value2.isEditing = false; // Exit editing mode
                            delete value2.tempText; // Remove tempText to revert changes
                          }
                          return value2;
                        })
                      );
                    }}
                  ></i>
                </>
              ) : (
                <>
                  <i
                    className="fas fa-edit"
                    onClick={() => {
                      setTodos(
                        toDos.map((value2) => {
                          if (value2.id === value.id) {
                            value2.isEditing = true;
                            value2.tempText = value2.text; // Store original text
                          }
                          return value2;
                        })
                      );
                    }}
                  ></i>
                  {!value.isEditing && ( // Hide delete icon during editing
                    <i
                      className="fas fa-trash"
                      onClick={() => setTodos(toDos.filter((value2) => value2.id !== value.id))}
                    ></i>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



export default App
