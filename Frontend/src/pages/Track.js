import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTrackHooks } from '../Hooks/trackHooks';
import { ImRoad } from 'react-icons/im';
import { FaLocationArrow } from 'react-icons/fa';
import { GiPathDistance } from 'react-icons/gi';
import './track.css';
import { useBestRacers } from '../Hooks/bestRacersHook';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';

function Track() {
  const [show, setShow] = useState(false);
  const { getSingleTrack, singleTrack } = useTrackHooks();

  const {
    getAllBestRacers,
    getBestRacers,
    editBestRacer,
    deleteBestRacer,
    addBestRacer,
    bestRacers,
    remove,
    loading,
    error,
    success,
    editRacer,
  } = useBestRacers();

  const [formData, setformData] = useState({
    racerName: '',
    position: '',
    duration: '',
    carName: '',
  });

  const { imageUrl, location, miles, trackName } = singleTrack;
  const { trackId } = useParams();

  
  useEffect(() => {
    if (trackId) {
      getSingleTrack(trackId);
    }
    getAllBestRacers();
  }, []);
  console.log(bestRacers);


  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };


  const clearInput = () => {
    setformData({});
  };

  
  const createBestRacer = (e) => {
    e.preventDefault();
    addBestRacer(formData);
    clearInput();
  };



  const handleEdit = async (id) => {
    const racerId = id;


    if (!editRacer || editRacer._id !== racerId) {
      await getBestRacers(racerId);
    }
    setShow(true);

    console.log(editRacer._id);
    setformData({
      racerName: editRacer.racerName,
      position: editRacer.position,
      duration: editRacer.duration,
      carName: editRacer.carName,
    });
  };

  
  const updateBestRacer = (e) => {
    e.preventDefault();
    editBestRacer(editRacer._id, formData);
    setShow(false);
    clearInput();
  };
  const handleDelete = (id) => {
    const trackID = id;
    deleteBestRacer(trackID);
  };

  return (
    <main className='seeTrack'>
      <h1> Street Speed way </h1>
      <section className='seeTrackWrapper'>
        <article className='race'>
          <div className='racePic'>
            <img src={imageUrl} alt='' />
          </div>
          <div className='raceDeets'>
            <h4>
              {' '}
              <ImRoad color='grey' /> {trackName}
            </h4>
            <p>
              {' '}
              <FaLocationArrow color='grey' /> {location}{' '}
            </p>
            <p>
              {' '}
              <GiPathDistance color='grey' /> {miles}{' '}
            </p>
          </div>
        </article>
      </section>

      <section className='bestRacers'>
        <h1> Street Speedway Racer's Leader Board </h1>
        <section className='racersLeaderboard'>
          <div className='bH'>
            <div className='boardHeader'>
              <small className='rank'> Rank </small>
              <small className='name'> Racer</small>
              <small className='time'> Time </small>
              <small className='car'> Cars </small>
            </div>
          </div>
          <div>
            {bestRacers.length === 0 ? (
              <p> Loading....</p>
            ) : (
              bestRacers.map(
                ({ _id, carName, duration, position, racerName }) => (
                  <section key={_id} className='board'>
                    <section className='leader' key={_id}>
                      <p className='rank'> {position} </p>
                      <h4 className='name'> {racerName} </h4>
                      <p className='time'> {duration} </p>
                      <p className='car'> {carName} </p>
                    </section>
                    <div className='Btns'>
                      <div id='BtnF'>
                        <button onClick={() => handleEdit(_id)} className='Btn'>
                          {' '}
                          <FiEdit />
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() => handleDelete(_id)}
                          className='Btn'
                        >
                          {remove ? 'Deleting... ' : <MdDelete />}
                        </button>
                      </div>
                    </div>
                  </section>
                ),
              )
            )}
            {error ? <span> {error.errMessage} </span> : ''}
            {success ? <span> {success} </span> : ''}
          </div>
        </section>
      </section>

      {/* Add Best Racers form  */}
      {show && (
        <form>
          <div className='trackInput'>
            <label htmlFor='name'>Racer Name </label>
            <input
              type='text'
              id='racerName'
              name='racerName'
              value={formData.racerName || ''}
              placeholder='enter racer name'
              onChange={handleChange}
            />
          </div>
          <div className='trackInput'>
            <label htmlFor='Position'>Racer Position </label>
            <input
              type='text'
              id='position'
              name='position'
              value={formData.position || ''}
              placeholder='Racer positon, 1st or 2nd etc'
              onChange={handleChange}
            />
          </div>
          <div className='trackInput'>
            <label htmlFor='duration'>Racer duration </label>
            <input
              type='text'
              id='duration'
              name='duration'
              value={formData.duration || ''}
              placeholder='Racer winning time, 12s, 5m, 1h etc'
              onChange={handleChange}
            />
          </div>
          <div className='trackInput'>
            <label htmlFor='carName'>Racer Car </label>
            <input
              type='text'
              id='carName'
              name='carName'
              value={formData.carName || ''}
              placeholder='Racer car name'
              onChange={handleChange}
            />
          </div>
          <div className='btnWrapper'>
            {editRacer ? (
              <button
                disabled={loading}
                type='submit'
                onClick={updateBestRacer}
                className='Btn'
              >
                {loading ? 'Updating Racer...' : 'Edit Racer'}
              </button>
            ) : (
              <button
                disabled={loading}
                type='submit'
                onClick={createBestRacer}
                className='Btn'
              >
                {loading ? 'Adding Racer...' : 'Add Racer'}
              </button>
            )}
          </div>

          {error ? <span> {error.errMessage} </span> : ''}
          {success ? <span> {success} </span> : ''}
        </form>
      )}
      <button onClick={() => setShow(!show)} className='addBest'>
        {show ? 'Close' : 'Add Best Racers'}
      </button>
    </main>
  );
}

export default Track;
