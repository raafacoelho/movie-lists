import { memo, useEffect, useState } from 'react';
import { GenreResponseProps } from '../interfaces/Genre.interface';
import { Button } from './Button';

import { api } from '../services/api';

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenreId: number;
  handleClickButton: (id: number) => void;
}

export function SideBar(props: SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}

export const SideBarItems = memo(SideBar, (prevProps, nextProps) => {
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId);
});