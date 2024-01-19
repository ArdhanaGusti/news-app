import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { CardHeader, Container, Grid, IconButton, Pagination, Rating, TextField } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Movie } from "../models/Movie";
import { ImageUrl500, TokenValidation } from "../common/BaseUrl";

function MoviePage(this: any) {
    const [movies, setMovies] = useState<Movie>();
    const [status, setStatus] = useState<string>('empty');
    const [search, setSearch] = useState<string>('marvel');
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);


    var fetchPost = async () => {
        try {
            setStatus('loading');
            const response = (await axios.get<Movie>('https://api.themoviedb.org/3/search/movie?query=' + search + '&include_adult=false&page=' + page, {
                headers: {
                    'Authorization': 'Bearer ' + TokenValidation,
                }
            }));
            if (response.status == 200) {
                if (totalPage != response.data.total_pages) {
                    setTotalPage(response.data.total_pages);
                    setPage(1);
                }
                setMovies(response.data);
                setStatus('loaded');
            }
        } catch (err) {
            setStatus('error');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [search, page])

    return (
        <Container maxWidth="xl" style={{ textAlign: "left" }}>
            <Grid container spacing={1} mb={2}>
                <Grid item>
                    <TextField
                        autoComplete="given-name"
                        name="search"
                        label="Search"
                        autoFocus
                        variant="filled"
                        onChange={(e) => {
                            setTimeout(() => { setSearch(e.target.value) }, 1800)
                        }}
                    />
                </Grid>
            </Grid>
            {
                (() => {
                    switch (status) {
                        case 'empty':
                            return <p>Tidak ada data</p>;
                        case 'loading':
                            return <p>Loading</p>;
                        case 'error':
                            return <p>Gagal, coba kembali</p>;
                        case 'loaded':
                            return <Grid container direction="row" rowSpacing={2}>
                                {
                                    movies?.results.map((movie, index) => {
                                        return <Grid item lg={4} md={6} sm={12} key={index}>
                                            <Card sx={{ maxWidth: 345 }} style={{ width: "90%", margin: "0 auto" }}>
                                                <CardHeader
                                                    style={{ textAlign: "justify" }}
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                    }
                                                    title={movie.title}
                                                    subheader={new Date(movie.release_date).toLocaleDateString('en-EN', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    alt={movie.title}
                                                    height='auto'
                                                    image={(movie.backdrop_path) ? ImageUrl500 + movie.backdrop_path : '/assets/no-image-icon-23.jpg'}
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div" align="justify">
                                                        {movie.original_title}
                                                    </Typography>
                                                    <Rating name="read-only" value={movie.vote_average * 0.5} precision={0.5} readOnly />
                                                    <Typography variant="body2" color="text.secondary" align="justify">
                                                        {movie.overview}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" href={"/detail/" + movie.id}>Read More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    })
                                }
                            </Grid>
                        default:
                            return <p>Tidak ada data</p>;
                    }
                }).call(this)
            }
            <Pagination count={totalPage} page={page} variant="outlined" style={{ marginTop: 10 }} size="medium" onChange={(_, v) => {
                setPage(v);
            }} />
        </Container>
    );
}

export default MoviePage