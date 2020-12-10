import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import VideoGridItem from '../components/VideoGridItem/VideoGridItem';
import { fetchPopularData } from '../apis/index';
import { Store } from '../store/index';

const Top = () => {
  const { globalState, setGlobalState } = useContext(Store);
  useEffect(() => {
    fetchPopularData().then((res) => {
      console.log('res.data.data.items', res.data.data.items);
      setGlobalState({
        type: 'SET_POPULAR',
        payload: { popular: res.data.data.items },
        // payload: { popular: res.data.items },
      });
    });
  }, []);

  return (
    <Layout>
      <VideoGrid>
        {globalState.popular.map((popular) => (
          <VideoGridItem
            id={popular.id}
            key={popular.id}
            src={popular.snippet.thumbnails.default.url}
            title={popular.snippet.title}
          />
        ))}
      </VideoGrid>
    </Layout>
  );
};

export default Top;
