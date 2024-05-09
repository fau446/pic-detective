import { useEffect, useRef } from "react";
import styles from "../styles/Dropdown.module.css";

function Dropdown({
  coords,
  options,
  handleOptionSelect,
  setDropdownHeight,
  setDropdownWidth,
}) {
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) => !option.found);

  useEffect(() => {
    if (dropdownRef.current && setDropdownHeight) {
      const height = dropdownRef.current.offsetHeight;
      setDropdownHeight(height);
    }
    if (dropdownRef.current && setDropdownWidth) {
      const width = dropdownRef.current.offsetWidth;
      setDropdownWidth(width);
    }
  }, []);

  return (
    <div
      className={styles.dropdown}
      style={{ left: coords.x, top: coords.y }}
      ref={dropdownRef}
    >
      <ul>
        {filteredOptions.map((option) => {
          return (
            <div
              className={styles.option}
              key={option._id}
              onClick={() => handleOptionSelect(option._id, option.name)}
            >
              <img className={styles.icon} src={"../../" + option.img_name} />
              <li key={option._id}>{option.name}</li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
