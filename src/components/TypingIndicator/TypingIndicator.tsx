import React from 'react';
import { useAppStore } from '../../stores';
import styles from './TypingIndicator.module.css';

interface TypingIndicatorProps {
    userid: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userid }) => {
    const { isTyping, sessionData, typerName } = useAppStore((state) => ({
        isTyping: state.isTyping, sessionData: state.sessionData, typerName: state.typerName,
    }));

    const [typingText, setTypingText] = React.useState('someone is typing...');
    React.useEffect(() => {
        console.log('isTyping in indicator', isTyping);
        console.log('typername', typerName);
        console.log('userid', userid);
        let timeoutId: NodeJS.Timeout | null = null;
        if (isTyping) {
            timeoutId = setTimeout(() => {
                setTypingText(`${typerName} is typing`);
            }, 0);
        } else {
            setTypingText('');
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isTyping, sessionData.displayname, userid, typerName]);

    return (
        <div className={styles.typingIndicator}>
            {typingText && (
                <>
                    <span>{typingText}</span>
                    <div className={styles.dotsContainer}>
                        <div className={styles.dot} />
                        <div className={styles.dot} />
                        <div className={styles.dot} />
                    </div>
                </>
            )}
        </div>
    );
};

export default TypingIndicator;
