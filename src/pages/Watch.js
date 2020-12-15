import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import VideoDetail from '../components/VidoDetail/VideoDetail';
import SideList from '../components/SideList/SideList';
import { Store } from '../store/index';
import { useLocation } from 'react-router-dom';
import { fetchSelectedData, fetchRelatedData } from '../apis/index';

const Watch = () => {
  const { setGlobalState } = useContext(Store);
  const location = useLocation();

  useEffect(() => {
    const setVideos = async () => {
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get('v');
      console.log(id);
      if (id) {
        const [selected, related] = await Promise.all([
          fetchSelectedData(id),
          fetchRelatedData(id),
        ]);

        setGlobalState({
          type: 'SET_SELECTED',
          payload: { selected: selected.data.items.shift() },
        });

        setGlobalState({
          type: 'SET_RELATED',
          payload: { related: related.data.items },
        });
      }
    };
    setVideos();
  }, [location.search, setGlobalState]);

  return (
    <Layout>
      <VideoDetail />
      <SideList />
    </Layout>
  );
};

export default Watch;
