import styles from "./MainPage.module.css";
import BurgerMenuBtn from "../../components/common/Buttons/BurgerMenu/BurgerMenu";
import { useState } from "react";
import SearchField from "../../components/common/SearchField/SearchField";

const MainPage = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleOpenSettingsWindow = () => {
        setIsSettingsOpen(true);
    };
  return (
    <div className={styles["mainPage-container"]}>
      <div className={styles["chatsList-container"]}>
        <div className={styles["logo-menu"]}>
          <p>
            <b>Raven Chat</b>
          </p>
          <div className={styles["logo-menu-burger"]}>
            <BurgerMenuBtn
              isOpen={isSettingsOpen}
              onClick={handleOpenSettingsWindow}
            />
          </div>
        </div>
        <div className={styles["searchField-container"]}>
            <SearchField/>
        </div>
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default MainPage;
