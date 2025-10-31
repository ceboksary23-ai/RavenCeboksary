import { motion } from "framer-motion";
import styles from '../../../../styles/components/common/Buttons/BurgerMenu.module.css'

const BurgerMenuBtn = ({ isOpen, onClick }) => {
    return (
        <motion.div
            className={styles["burger-menu"]}
            onClick={onClick}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            style={{
                width: '50px',
                height: '50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
            }}>
            <motion.div
                variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 40, y: 7 }
                }}
                style={{
                    width: '30px',
                    height: '5px',
                    backgroundColor: 'var(--text-heading)',
                    margin: '2px 0',
                    borderRadius: '2px'
                }} />
            <motion.div
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                }}
                style={{
                    width: '30px',
                    height: '5px',
                    backgroundColor: 'var(--text-heading)',
                    margin: '2px 0',
                    borderRadius: '2px'
                }} />
            <motion.div
                variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -40, y: -10 }
                }}
                style={{
                    width: '30px',
                    height: '5px',
                    backgroundColor: 'var(--text-heading)',
                    margin: '2px 0',
                    borderRadius: '2px'
                }} />
        </motion.div>
    );
};

export default BurgerMenuBtn;