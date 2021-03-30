import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
//import SelectAndDrag from "./common/Drag&Drop/SelectOptionsScroller";
import SelectAndDrag from "./common/Drag&Drop/SelectOptions";

const App = () => {

 const [options, setOptions] = useState([]);
 const [pageNumber,setPageNumber] = useState(1);


 const nextData = () =>{
  setPageNumber(prevPageNumber => prevPageNumber + 1); 

 }
//  const setSearchQuery = (searchQuery) =>{
//   setQuery(searchQuery);
//  }

  useEffect(() => {
    console.log('calling useeffect of app.js');
    async function fetchData() {
      try {
        //Just pass options to the drag and drop.

        console.log(pageNumber)
        const data = await axios.get(
          `https://randomuser.me/api?page=${pageNumber}&results=10`
        );
        let names = data.data.results.map((obj) => obj.name);

        console.log(names);
        if(options)
        setOptions([...options,...names]);
        else
        setOptions(names);

        console.log(options);

      } catch (err) {
         alert(err.message)
      }
    }

    fetchData();
  }, [pageNumber,setOptions]);

  // useEffect(() => {
  //   console.log('calling useeffect of app.js');
  //   async function fetchData() {
  //     try {
  //       //Just pass options to the drag and drop.
  //       if(query)
  //       {
  //      const data = await axios.get(
  //         `http://openlibrary.org/search.json?q=${query}&page=${pageNumber}`
  //       );
  //       console.log(data);
  //       let names = data.data.results.map((obj) => obj.name);


  //       if(options)
  //       setOptions([...options,...names]);
  //       else
  //       setOptions(names);
  //       }
  //     } catch (err) {
  //       //  alert(err)
  //     }
  //   }

  //   fetchData();
  // }, [pageNumber,query]);


  return (
    <div>
      <SelectAndDrag data={options} getNextOptions = {nextData}/>
    </div>
  );
};

export default App;


