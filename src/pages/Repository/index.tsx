import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import {
  Header,
  RepositoryInfo,
  Issues,
  Loading,
  LoadingContainer,
} from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: string;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [loadingRepository, setLoadingRepository] = useState(true);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api
      .get(`/repos/${params.repository}`)
      .then(response => {
        setRepository(response.data);
        setLoadingRepository(false);
      })
      .catch(() => setLoadingRepository(false));
    api
      .get(`/repos/${params.repository}/issues`)
      .then(response => {
        setIssues(response.data);
        setLoadingIssues(false);
      })
      .catch(() => setLoadingIssues(false));
  }, [params.repository]);

  if (loadingRepository || loadingIssues) {
    return (
      <LoadingContainer>
        <Loading size={36} />
      </LoadingContainer>
    );
  }

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
            src={repository?.owner.avatar_url}
            alt={repository?.owner.login}
          />
          <div>
            <strong>{repository?.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository?.stargazers_count}</strong>
            <span>Starts</span>
          </li>
          <li>
            <strong>{repository?.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository?.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>
      <Issues>
        {issues.map(issue => (
          <a
            key={issue.id}
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
