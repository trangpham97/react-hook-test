import React from 'react';
import { useRef, useState, useEffect } from "react";

const INITLANGUAGE = ['France', 'Japan', 'Korean'];

export const Language = () => {
  const [resultArr, setResultArr] = useState(['English']);
  const [searchArr, setSearchArr] = useState(INITLANGUAGE);
  const [initLanguage, setInitLanguage] = useState(INITLANGUAGE);
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);

  useOnClickOutside(ref, () => setIsOpen(false));
  const openDropdown = () => {
    setIsOpen(true);
  }

  const clickOption = (e) => {
    if (isFilter === false) {
      const order = searchArr.indexOf(e.currentTarget.textContent);
      setResultArr(resultArr.concat(e.currentTarget.textContent));
      searchArr.splice(order, 1);
      setInitLanguage(searchArr);
    } else {
      const barResult = e.currentTarget.parentNode.parentNode.parentNode.children[0].children;
      barResult[barResult.length - 1].children[0].value = "";
      const clone = [...initLanguage];
      const order = clone.indexOf(e.currentTarget.textContent);
      setResultArr(resultArr.concat(e.currentTarget.textContent));
      clone.splice(order, 1);
      setSearchArr(clone);
      setInitLanguage(clone);
    }
  }

  const closeOption = (e) => {
    const found = e.currentTarget.parentNode.children[0].textContent.match(/Other:/);
    const order = resultArr.indexOf(e.currentTarget.parentNode.children[0].textContent);
    const cloneResult = [...resultArr];
    cloneResult.splice(order, 1);
    setResultArr(cloneResult);
    if (found === null) {
      searchArr.unshift(e.currentTarget.parentNode.children[0].textContent);
    }
    setInitLanguage(searchArr);
  }

  const enterOption = (e) => {
    if (e.key === 'Enter' && e.currentTarget.value !== "") {
      setResultArr(resultArr.concat(`Other: ${e.currentTarget.value}`));
      e.currentTarget.value = "";
    }
  }

  const filter = (e) => {
    setIsFilter(true);
    let updatedList = initLanguage;
    updatedList = updatedList.filter(item => item.toLowerCase()
      .search(e.currentTarget.value.toLowerCase()) !== -1);
    setSearchArr(updatedList);
  }

  return (
    <div className="container-language">
      <div className="main"  >
        <div tabIndex={0} className={`dropdown-select wide ${isOpen && 'open'}`} ref={ref}>
          <div className="bar-result" onClick={openDropdown}>
            {
              resultArr.map((item, index) => (
                <div className="wrap-text-option" key={`` + index} >
                  <span className="current current-display">{item}</span>
                  <img className="close-display" onClick={closeOption} src={require("../../img/delete.svg")} alt="close" />
                </div>
              ))
            }
            <div className="wrap-search-option">
              <input onKeyUp={filter} className="dd-searchbox" placeholder="Search..." type="text" />
            </div>
          </div>

          <div className="list">
            <div className="add-text-box"><input onKeyDown={enterOption} className="add-text" placeholder="Add other..." type="text" /></div>
            <ul className="wrap-option">
              {
                searchArr.map((item, index) => (
                  <li className="option" data-value={index} key={index} tabIndex={0} onClick={clickOption}>{item}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}