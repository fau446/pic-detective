import styles from "../styles/Dropdown.module.css";

function Dropdown({ coords, options, handleOptionSelect }) {
  return (
    <div className={styles.dropdown} style={{ left: coords.x, top: coords.y }}>
      <ul>
        {options.map((option) => {
          return (
            <li
              key={option._id}
              onClick={(e) => handleOptionSelect(e, option._id)}
            >
              {option.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
