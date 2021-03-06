import { h, FunctionalComponent } from "preact";
import Body from "../components/Body/Body";
import usePageData from "../lib/hooks/usePageData";
import { fetchCharacters } from "../api";
import { useEffect } from "preact/hooks";
import { ICharacter } from "../types/Character";
import CharacterName from '../components/CharacterName/CharacterName'

const List: FunctionalComponent<any> = ({ pageData }: any) => {
  const [characters, setCharacters] = usePageData(pageData);

  useEffect(() => {
    if (!characters) fetchCharacters().then((data) => setCharacters(data));
  }, []);

  return (
    <Body>
      {characters
        ? characters.map(({ name, id }: ICharacter) => <CharacterName key={id}>{name}</CharacterName>)
        : null}
    </Body>
  );
};

export default List;
