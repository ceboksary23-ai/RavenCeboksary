import styles from "../../../styles/components/layout/CreateNewChatModal/CreateNewChatModal.module.css";

const CreateNewChatModal = ({onClick}) => {
  return (
    <div className={styles["add-newchat-window-container"]}>
      <div className={styles["add-newchat-window"]}>
        <h3>Создать новый чат</h3>
        <input type="text" placeholder="Имя чата" />
        <button>Создать</button>
        <button onClick={onClick}>Закрыть</button>
      </div>
    </div>
  );
};

export default CreateNewChatModal;
