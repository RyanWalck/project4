import axios from 'axios';
import { useState } from 'react';

export const useBestRacers = () => {
  const baseUrl = 'https://roadwayracing.onrender.com/api/v1';
  const [success, setSuccess] = useState('');
  const [error, setError] = useState({ error: false, errMessage: '' });
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [bestRacers, setBestRacers] = useState([]);
  const [editRacer, setEditRacer] = useState([]);

  const getAllBestRacers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/racers`);
      if (response) {
        setBestRacers(response.data.allRacers);
      }
    } catch (error) {
      console.log('Error:', error); 
      console.log('Error Message:', error.message); 

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
  const getBestRacers = async (racerId) => {
    try {
      const response = await axios.get(`${baseUrl}/racers/${racerId}`);
      if (response) {
        setEditRacer(response.data.racer);
      }
    } catch (error) {
      console.log('Error:', error); 
      console.log('Error Message:', error.message); 

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

  const addBestRacer = async (formdata) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/racers`, formdata);
      if (response) {
        setSuccess('Best racer added succesfully');
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        setLoading(false);
        getAllBestRacers();
      }
    } catch (error) {
      console.log('Error:', error); 
      console.log('Error Message:', error.message); 
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

  const editBestRacer = async (racerId, formdata) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${baseUrl}/racers/${racerId}`,
        formdata,
      );
      if (response) {
        setSuccess('Best racer updated succesfully');
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        setLoading(false);
        getAllBestRacers();
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

  const deleteBestRacer = async (trackID) => {
    try {
      setRemove(true);
      const response = await axios.delete(`${baseUrl}/racers/${trackID}`);

      if (response) {
        setSuccess('Racer deleted succesfully');
        setRemove(false);
        setTimeout(() => {
          setSuccess('');
        }, 3000);
        getAllBestRacers();
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
    addBestRacer,
    getAllBestRacers,
    getBestRacers,
    success,
    error,
    loading,
    bestRacers,
    editRacer,
    deleteBestRacer,
    editBestRacer,
    remove,
  };
};
