import React, { useContext } from 'react';
import { Store } from '../../store/index';
import SideListItem from '../SideListItem/SideListItem';
import Style from './SideList.module.scss';

const SideList = () => {
  const { globalState } = useContext(Store);
  return (
    <div className={Style.sidenav}>
      {globalState.related ? (
        globalState.related.map((video) => {
          return (
            <SideListItem
              id={video.id.videoId}
              key={video.id.videoId}
              src={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
            />
          );
        })
      ) : (
        <span>no data</span>
      )}
    </div>
  );
};

export default SideList;
