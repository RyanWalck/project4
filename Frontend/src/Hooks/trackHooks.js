import axios from 'axios';
import { useState } from 'react';

export const useTrackHooks = () => {
  const baseUrl = 'https://roadwayracing.onrender.com/api/v1';
  const [success, setSuccess] = useState('');
  const [error, setError] = useState({ error: false, errMessage: '' });
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [tracksData, setTracksData] = useState([]);
  const [singleTrack, setSingleTrack] = useState([]);

  const getAllTracks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/races`);
      if (response) {
        setTracksData(response.data.allRace);
      }
    } catch (error) {
      setLoading(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  const getSingleTrack = async (trackId) => {
    try {
      const response = await axios.get(`${baseUrl}/races/${trackId}`);
      if (response) {
        setSingleTrack(response.data.race);
      }
    } catch (error) {
      setLoading(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  const createNewTracks = async (formdata) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/races`, formdata);
      if (response) {
        setSuccess('Tracks created succesfully');
        setLoading(false);
        getAllTracks();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  const deleteTrack = async (trackID) => {
    try {
      setRemove(true);
      const response = await axios.delete(`${baseUrl}/races/${trackID}`);

      if (response) {
        setSuccess('Tracks created succesfully');
        setRemove(false);
        getAllTracks();
      }
    } catch (error) {
      console.log(error);
      setRemove(false);
      setError({
        error: true,
        errMessage:
          error.response && error.response.data
            ? error.response.data.msg.message
            : error.message,
      });
    }
  };

  return {
    createNewTracks,
    getAllTracks,
    success,
    error,
    loading,
    tracksData,
    getSingleTrack,
    deleteTrack,
    remove,
    singleTrack,
  };
};
