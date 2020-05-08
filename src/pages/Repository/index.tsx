import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img
            src="https://avatars1.githubusercontent.com/u/6731139?s=460&u=fc63bb29a399190720a0543897b2fb48183ea54d&v=4"
            alt=""
          />
          <div>
            <strong>{params.repository}</strong>
            <p>Alguma descrição lorem ipsum aqui</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1289</strong>
            <span>Starts</span>
          </li>
          <li>
            <strong>23</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>324</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="teste">
          <div>
            <strong>akdlaksd</strong>
            <p>asdasdsad</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
        <Link to="teste">
          <div>
            <strong>akdlaksd</strong>
            <p>asdasdsad</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
        <Link to="teste">
          <div>
            <strong>akdlaksd</strong>
            <p>asdasdsad</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
