import React from "react";
import classes from './Add.module.css';

function AddMovies(props){
    function formSubmitHandler(e){
        e.preventDefault();

        const movie = {
            title: document.getElementById('title').value,
            desc:document.getElementById('des').value,
            Genre: document.getElementById('genre').value,
            release :document.getElementById('date').value
        }
        props.onADDMovies(movie);

    }
    return(

        <form onSubmit={formSubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title"></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="description">Description</label>
                <textarea type="text" id="des" />
            </div>
            <div className={classes.control}>
                <label htmlFor="Genre">Genre</label>
                <input type="text" id="genre" />
            </div>
            <div className={classes.control}>
                <label htmlFor="date" >Release Date</label>
                <input type="date" id="date" />
            </div>
            <button>ADD MOVIE</button><br></br><br></br>
        </form>
    )

}
export default AddMovies;