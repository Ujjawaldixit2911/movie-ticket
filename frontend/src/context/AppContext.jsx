import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import API from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (search = '') => {
    const { data } = await API.get(`/movies${search ? `?search=${search}` : ''}`);
    setMovies(data);
  };

  const fetchHomeData = async () => {
    const [moviesRes, featuredRes, trendingRes] = await Promise.all([
      API.get('/movies'),
      API.get('/movies/featured'),
      API.get('/movies/trending')
    ]);
    setMovies(moviesRes.data);
    setFeatured(featuredRes.data);
    setTrending(trendingRes.data);
  };

  const refreshWishlist = async () => {
    if (!localStorage.getItem('token')) return setWishlist([]);
    try {
      const { data } = await API.get('/movies/wishlist');
      setWishlist(data);
    } catch {
      setWishlist([]);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setWishlist([]);
  };

  useEffect(() => {
    fetchHomeData();
    refreshWishlist();
  }, []);

  useEffect(() => {
    refreshWishlist();
  }, [user]);

  const value = useMemo(() => ({
    user,
    setUser,
    movies,
    featured,
    trending,
    wishlist,
    setWishlist,
    loading,
    setLoading,
    fetchMovies,
    fetchHomeData,
    refreshWishlist,
    logout
  }), [user, movies, featured, trending, wishlist, loading]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
