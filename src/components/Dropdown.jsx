import styles from "../styles/Dropdown.module.css";

function Dropdown({ coords, options, handleOptionSelect }) {
  const filteredOptions = options.filter((option) => !option.found);
  console.log(filteredOptions);
  return (
    <div className={styles.dropdown} style={{ left: coords.x, top: coords.y }}>
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
