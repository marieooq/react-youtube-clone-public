import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import VideoGrid from '../components/VideoGrid/VideoGrid';
import VideoGridItem from '../components/VideoGridItem/VideoGridItem';
import { useLocation } from 'react-router-dom';
import { fetchSearchData } from '../apis';
import { Store } from '../store/index';

const Search = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const location = useLocation();

  useEffect(() => {
    const setSearchResult = async () => {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('query');
      if (query) {
        await fetchSearchData(query).then((res) => {
          setGlobalState({
            type: 'SET_SEARCHED',
            payload: { searched: res.data.items },
          });
        });
      }
    };
    setSearchResult();
  }, [setGlobalState, location.search]);

  return (
    <Layout>
      <VideoGrid>
        {globalState.searched ? (
          globalState.searched.map((search) => {
            return (
              <VideoGridItem
                id={search.id.videoId}
                key={search.id.videoId}
                src={search.snippet.thumbnails.medium.url}
                title={search.snippet.title}
              />
            );
          })
        ) : (
          <span>no data</span>
        )}
      </VideoGrid>
    </Layout>
  );
};

export default Search;
