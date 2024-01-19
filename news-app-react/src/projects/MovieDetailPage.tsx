import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { ImageUrlOriginal, TokenValidation } from "../common/BaseUrl";
import { useEffect, useState } from "react";
import { MovieDetail } from "../models/MovieDetail";
import { useParams } from "react-router-dom";

export default function MovieDetailPage(this: any) {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState<MovieDetail>();

    var fetchPost = async () => {
        try {
            const response = (await axios.get<MovieDetail>('https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US', {
                headers: {
                    'Authorization': 'Bearer ' + TokenValidation,
                }
            }));
            if (response.status == 200) {
                setMovieDetail(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [])


    return (
        <Container maxWidth="xl">
            {
                (() => {
                    if (movieDetail != null) {
                        return (
                            <>
                                <Typography gutterBottom variant="h3" component="div" align="justify">
                                    {movieDetail.title + '( ' + movieDetail.original_title + ' )'}
                                </Typography>
                                <Box
                                    component="img"
                                    alt={movieDetail.title}
                                    src={(movieDetail.backdrop_path) ? ImageUrlOriginal + movieDetail.backdrop_path : '/assets/no-image-icon-23.jpg'}
                                    width='70%'
                                />
                                <Typography gutterBottom variant="subtitle1" component="div" align="justify">
                                    {movieDetail.overview}
                                </Typography>
                            </>
                        )
                    }
                    return <h1>Data Kosong</h1>
                }).call(this)
            }
        </Container>
    );
}