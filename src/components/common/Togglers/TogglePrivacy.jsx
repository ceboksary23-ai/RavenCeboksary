import styles from "../../../styles/components/common/Togglers/TogglePrivacy.module.css";

const TogglePrivacy = () => {
  return (
    <div className={styles["toggle-switch-container"]}>
      <label className={styles["toggle-switch"]}>
        <input type="checkbox" />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default TogglePrivacy;
