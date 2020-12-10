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
      });
    });
  }, [setGlobalState]);
  const mockState = [
    {
      id: '0',
      snippet: {
        thumbnails: {
          default: {
            url: 'https://dammyimage1/default.jpg',
            width: 120,
            height: 90,
          },
          high: {
            url: 'https://dammyimage1/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          maxres: {
            url: 'https://dammyimage1/maxresdefault.jpg',
            width: 1280,
            height: 720,
          },
          medium: {
            url: 'https://dammyimage1/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          standard: {
            url: 'https://dammyimage1/sddefault.jpg',
            width: 640,
            height: 480,
          },
        },
        title: 'title1',
      },
    },
  ];
  return (
    <Layout>
      <VideoGrid>
        {globalState.popular.map((popular) => (
          <div data-testid="appleid" key={popular.id}>
            <VideoGridItem
              id={popular.id}
              key={popular.id}
              src={popular.snippet.thumbnails.default.url}
              title={popular.snippet.title}
            />
          </div>
        ))}
      </VideoGrid>
    </Layout>
  );
};

export default Top;
