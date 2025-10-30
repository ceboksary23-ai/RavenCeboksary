import styles from '../../../styles/components/common/InputField/InputField.module.css'

const InputField = ({ header, type, placeholder, value, name, onChange}) => {
  return (
    <div className={styles['input-container']}>
      <span className={styles['input-header']}>{header}</span>
      <div className={styles.inputField}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={styles['input-field']}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputField;