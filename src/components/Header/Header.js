import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import Style from './Header.module.scss';
import { Store } from '../../store/index';

const Header = () => {
  const [term, setTerm] = useState('');
  const history = useHistory();
  const { globalState, setGlobalState } = useContext(Store);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGlobalState({ type: 'SET_TERM', payload: { term } });
    history.push(`/search?query=${term}`);
  };

  useEffect(() => {
    setTerm(globalState.term);
  }, []);

  return (
    <div className={Style.header} data-testid="header">
      <div className={Style.item} data-testid="item1">
        <Link to="/">Video Tube</Link>
      </div>
      <div className={Style.item} data-testid="item2">
        <form onSubmit={handleSubmit} data-testid="form">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
