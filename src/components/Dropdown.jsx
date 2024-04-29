import styles from "../styles/Dropdown.module.css";

function Dropdown({ coords, options, handleOptionSelect }) {
  const filteredOptions = options.filter((option) => !option.found);

  return (
    <div className={styles.dropdown} style={{ left: coords.x, top: coords.y }}>
      <ul>
        {filteredOptions.map((option) => {
          return (
            <li key={option._id} onClick={() => handleOptionSelect(option._id)}>
              {option.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
