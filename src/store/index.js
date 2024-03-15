import {
    configureStore,
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import { API_KEY, TMBD_BASE_URL } from "../utils/constant";
import axios from "axios";

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const {
        data: { genres }, }
        = await axios.get(
            `${TMBD_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
        );
    return genres;
});

export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
      const {
        netflix: { genres },
      } = thunkAPI.getState();
      return getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
        genres,
        true
      );
    }
  );
const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
    },
});


export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});