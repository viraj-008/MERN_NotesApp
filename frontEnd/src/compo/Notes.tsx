import React, { useEffect, useState } from "react";
import axios from "axios";
import  {ChromePicker}  from 'react-color';
import CreateNote from "./CreateNote";


interface NoteAPI {
  _id: string;
  title: string;
  content: string;
}


const Notes: React.FC = () => {

 const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
 const [backgroundColor, setBackgroundColor] = useState<string>(' ');
const [noteState,setNoteState]=useState<NoteAPI[]>([])


const [token, setToken] = useState<string | null>("")

useEffect(() => {
  const Bertoken = localStorage.getItem("token")
  if (!Bertoken) {
    alert("You must be logged in to perform this action.");
    return;
  }
  setToken(Bertoken)
},[])


  useEffect(()=>{
    axios.get("http://localhost:5000/api/notes/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then((response) => {
      const sortedNotes = response.data.sort((a: NoteAPI, b: NoteAPI) => {
        if (a._id > b._id) return -1; 
        if (a._id < b._id) return 1;  
        return 0;
      });
      setNoteState(sortedNotes);
    })
    .catch(error => {
      console.error("Error fetching data from backend:", error);
    });
  
  },[token])

  const handleColorChange = (color: any) => {
    setBackgroundColor(color.hex);
    setShowColorPicker(false);
  };


  const handleDelete = (id: string) => {
    axios
    .delete(`http://localhost:5000/api/notes/${id}`)
    .then(() => {
        setNoteState((prevState) => prevState.filter((note) => note._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting the note:", error);
      });
    };
    return (
      <>
      <CreateNote/>
      <div className="  mt-6 py-4  ">
      <div className="flex justify-end w-[90%]  mx-auto">
        <button className=" my-3 text-red-600 bg-white  py-2 rounded-md font-bold  px-2"
         onClick={() => setShowColorPicker(!showColorPicker)}>
         Change color 
        </button>
        {showColorPicker && (
          <ChromePicker color={backgroundColor} onChange={handleColorChange} />
        )}
      </div>
      {noteState.length > 0 ? (
        noteState.map((note) => (
          <div   style={{ backgroundColor }}
            key={note._id} 
            className={` mx-auto border border-slate-700 w-[93%] shadow-lg py-4 p-2 rounded-md my-4  ${ backgroundColor }`}
          >
            <h3 className="text-white font-semibold"><span className="font-extrabold text-black px-4">Title: </span>{note.title}</h3>
            <p className="text-white font-serif my-2"><span className="font-extrabold text-black px-4">Containt: </span> {note.content}</p>

            <div className="flex justify-end ">
            <button
              className=" my-3 bg-white text-red-600 py-1 rounded-md font-bold shadow-md px-2 "
              onClick={() => handleDelete(note._id)}
            >
              Delete
            </button>

              </div>

          </div>
        ))
      ) : (
        <p className="text-center mx-auto font-serif font-bold my-8">
          No notes yet!
        </p>
      )}

    </div>
      </>
  );
};

export default Notes;

