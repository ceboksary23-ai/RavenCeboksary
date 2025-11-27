// hooks/useSignalR.js
import { useEffect, useState, useRef } from 'react';
import signalRService from "../services/hubs/SignalRService";

export const useSignalR = (chatId) => {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typingUsers, setTypingUsers] = useState(new Set());

    useEffect(() => {
        const initConnection = async () => {
            const token = localStorage.getItem('token'); // ваш JWT токен
            if (!token) {
                console.error('❌ Нет токена авторизации');
                return;
            }

            const connected = await signalRService.connect(token);
            setIsConnected(connected);
        };

        initConnection();

        return () => {
            signalRService.disconnect();
        };
    }, []);

    // Обработчики событий для конкретного чата
    useEffect(() => {
        if (!signalRService.isConnected || !chatId) return;

        // Присоединяемся к чату
        signalRService.joinChat(chatId);

        // Обработчики событий
        const handleNewMessage = (message) => {
            console.log('📨 Новое сообщение:', message);
            setMessages(prev => {
                const exists = prev.find(m => m.id === message.id);
                if (exists) return prev;
                return [...prev, message];
            });
        };

        const handleMessageUpdated = (updatedMessage) => {
            console.log('✏️ Сообщение обновлено:', updatedMessage);
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === updatedMessage.id ? updatedMessage : msg
                )
            );
        };

        const handleMessageDeleted = (messageId) => {
            console.log('🗑️ Сообщение удалено:', messageId);
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === messageId 
                        ? { ...msg, isDeleted: true, content: 'Сообщение удалено' }
                        : msg
                )
            );
        };

        const handleUserTyping = (data) => {
            console.log('⌨️ Пользователь печатает:', data);
            if (data.isTyping) {
                setTypingUsers(prev => new Set([...prev, data.userId]));
            } else {
                setTypingUsers(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(data.userId);
                    return newSet;
                });
            }
        };

        const handleError = (error) => {
            console.error('❌ SignalR Error:', error);
        };

        // Подписываемся на события
        signalRService.on('ReceiveMessage', handleNewMessage);
        signalRService.on('MessageUpdated', handleMessageUpdated);
        signalRService.on('MessageDeleted', handleMessageDeleted);
        signalRService.on('UserTyping', handleUserTyping);
        signalRService.on('Error', handleError);

        // Отписка при размонтировании
        return () => {
            signalRService.leaveChat(chatId);
            signalRService.off('ReceiveMessage', handleNewMessage);
            signalRService.off('MessageUpdated', handleMessageUpdated);
            signalRService.off('MessageDeleted', handleMessageDeleted);
            signalRService.off('UserTyping', handleUserTyping);
            signalRService.off('Error', handleError);
        };
    }, [chatId, isConnected]);

    const startTyping = () => {
        if (chatId) {
            signalRService.startTyping(chatId);
        }
    };

    const stopTyping = () => {
        if (chatId) {
            signalRService.stopTyping(chatId);
        }
    };

    const sendTestMessage = (message) => {
        signalRService.sendTestMessage(message);
    };

    return {
        isConnected,
        messages,
        setMessages,
        typingUsers,
        startTyping,
        stopTyping,
        sendTestMessage
    };
};