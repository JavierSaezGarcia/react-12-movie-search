import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export const MovieSearch = () => {

    const URL_BASE = 'https://api.themoviedb.org/3/search/movie';
    const API_KEY = '4ff1e26b71e41737b1ecabd04e605818';
    const placeholderImage = 'https://images.unsplash.com/photo-1584448097764-374f81551427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    
    const [search, setSearch] = useState(''); // estado de la busqueda
    const [movies, setMovies] = useState([])  // estado de las peliculas
   
    const handleInputChange = (e) => {   
        
        setSearch(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
        setSearch('');   
    }
    const fetchMovies = async () => {
        try {
            // con fetch
            // const response = await fetch(`${URL_BASE}?query=${search}&api_key=${API_KEY}`);
            // const data = await response.json();
            // setMovies(data.results);
            // con axios
            const response = await axios.get(`${URL_BASE}?query=${search}&api_key=${API_KEY}`);
            setMovies(response.data.results);
            console.log(response.data.results);           
        } catch (error) {
            console.error('Error busqueda de películas:', error);            
        }
        
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5  align-items-center">
                    <h1 className="text-center">Movie Search App</h1>
                    <hr />
                    <form onSubmit={handleSubmit}>
                    <div className="input-group  d-flex justify-content-center">
                        <input
                            className="form-control justify-"
                            placeholder="Search Movie"
                            aria-label="Search Movie"
                            aria-describedby="basic-addon2"
                            value={search}
                            onChange={handleInputChange}
                            type="text" />
                        <button className="btn btn-primary" type="submit" id="button-addon2">Movie Search</button>
                    </div>
                    </form>
                </div>
            </div>
            <div className="movie-list">
                {
                movies.map((movie) => (
                    <div className="movie-card" key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholderImage} alt={movie.title} onError={() => {console.log("errored")}} /> 
                         <h4>Puntuación: {Math.round(movie.vote_average)}/10</h4>
                         
                        <p>{movie.overview}</p>
                    </div>
                ))
                }
            </div>
        </div>
    )
}
