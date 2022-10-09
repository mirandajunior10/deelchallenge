import "./styles.css";

import { GoSearch } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";

import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

type Search = {
  id: number;
  title: string;
};

type SearchBarProps = {
  data: Search[];
};

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [inputSearch, setInputSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState<Search[]>([]);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);

    const newFilter = data.filter((value) => {
      return value.title
        .toLowerCase()
        .includes(inputSearch.toLowerCase().trim());
    });

    setFilterSearch(newFilter);
  };

  useEffect(() => {
    if (inputSearch === "") {
      setFilterSearch([]);
    }
  }, [inputSearch]);

  function handleClickAutoComplete(value: Search) {
    setInputSearch(value.title);
    setFilterSearch([]);
  }

  function clearText() {
    setInputSearch("");
    setFilterSearch([]);
  }

  function highlightText(text: string) {
    const matchingTextIndex = text
      .toLowerCase()
      .indexOf(inputSearch.toLowerCase());

    if (matchingTextIndex >= 0) {
      return (
        <>
          {text.substring(0, matchingTextIndex)}
          <span className="highlight-text">
            {text.substring(
              matchingTextIndex,
              matchingTextIndex + inputSearch.length
            )}
          </span>
          {text.substring(matchingTextIndex + inputSearch.length)}
        </>
      );
    }
    return text;
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <IconContext.Provider value={{ color: "#B8B8B8", size: "30px" }}>
          <GoSearch />

          <input
            type="text"
            placeholder="Pesquisar..."
            value={inputSearch}
            onChange={handleFilter}
          />

          {inputSearch !== "" ? <AiOutlineClose onClick={clearText} /> : ""}
        </IconContext.Provider>
      </div>

      {filterSearch.length !== 0 && (
        <div className="dataResult">
          {filterSearch.slice(0, 15).map((value) => (
            <div
              key={value.id}
              className="dataItem"
              onClick={() => handleClickAutoComplete(value)}
            >
              <IconContext.Provider value={{ color: "#B8B8B8", size: "22px" }}>
                <GoSearch />
              </IconContext.Provider>
              <p>{highlightText(value.title)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
