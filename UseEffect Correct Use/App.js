import React, { useState,useEffect,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error , setError] = useState(null);

  const fetchMovieshandler = useCallback(async () => {
    setIsLoading(true)
    setError(null);
    try{
      const response = await fetch("https://swapi.dev/api/films");
      if(!response.ok){
        throw new Error('Some went Wrong.....Retrying')
      }
      const data = await response.json();
     
      const transformed = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });
      setMovies(transformed);
     
    }catch (error) {
      setError(error.message)
  }
    setIsLoading(false); 
   
  },[]);
  useEffect(() => {
    fetchMovieshandler();
  },[fetchMovieshandler]);
  let content = <p>Found no movies.</p>
  if(movies.length > 0){
    content = <MoviesList movies={movies}/>
  }
//   if(error){
//   let myMessage = setTimeout(() => {
//     const response =  await fetch("https://swapi.dev/api/film")


//   },2000);
//   if(stopFunction){
//     clearTimeout(myMessage)
//   }
//  }
if(error){
  content = <p>{error}</p>
}



  // function stopFunction(){
  //   clearTimeout(myMessage)
  // }


  // }
  
  if(isLoading){
    content = <p>Loading...!!!</p>
  }



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button><br></br><br></br>
        <button>Cancel</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
