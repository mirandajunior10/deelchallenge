import "./styles.css";

import { GoSearch } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";

import { IconContext } from "react-icons";
import { useCallback, useEffect, useState } from "react";
import { filterData, Search } from "../../services/api";

const SearchBar: React.FC = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [filterSearch, setFilterSearch] = useState<Search[]>([]);

  const handleFilter = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length === 0) return clearText();
      setInputSearch(event.target.value);
      if (event.target.value.length < 3) return;
      console.log(event.target.value);
      const result = await filterData(event.target.value);
      try {
        setFilterSearch(result);
      } catch (error) {
        alert("Something went wrong, try again later");
      }
    },
    []
  );

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
          {filterSearch.map((value) => (
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
