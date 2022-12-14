import React from "react";
import classes from './Delete.module.css';

function DeleteMovies(props){
    const titleRef = useRef('');
    const openingTextRef = useRef('');
    const releaseDateRef = useRef('');
  
    function submitHandler(event) {
      event.preventDefault();
  
      // could add validation here...
  
      const movie = {
        title: titleRef.current.value,
        openingText: openingTextRef.current.value,
        releaseDate: releaseDateRef.current.value,
      };
  
      props.onDeleteMovie(movie);
    }

}