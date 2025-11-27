// services/api/MessagesService.js
class MessageService {
    constructor() {
        this.baseUrl = 'http://ravenapp.ru/api';
    }

    // Отправить сообщение
    async sendMessage(content, targetUserId, chatId = null, file = null) {
        try {
            const token = localStorage.getItem('token');
            console.log('🔑 Токен:', token ? 'Есть' : 'НЕТ');
            
            if (!token) {
                throw new Error('Токен авторизации не найден');
            }

            const formData = new FormData();
            formData.append('Content', content);
            
            if (chatId) {
                formData.append('ChatId', chatId);
            }

            if (file) {
                formData.append('File', file);
            }

            // ИСПРАВЛЕННЫЙ URL - с маленькой "m" в messages
            const url = `${this.baseUrl}/messages/send?TargetUserId=${targetUserId}`;

            console.log('📤 Отправка сообщения на:', url);
            console.log('📝 Контент:', content);
            console.log('👥 TargetUserId:', targetUserId);
            console.log('💬 ChatId:', chatId);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Не добавляем Content-Type для FormData!
                },
                body: formData
            });

            console.log('📨 Ответ сервера:', response.status, response.statusText);

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Сообщение отправлено успешно:', result);
                return result;
            } else {
                const errorText = await response.text();
                console.error('❌ Ошибка HTTP:', response.status, errorText);
                
                if (response.status === 401) {
                    throw new Error('Токен недействителен. Нужно перелогиниться.');
                } else if (response.status === 404) {
                    throw new Error('Эндпоинт не найден. Проверьте URL.');
                }
                
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error('❌ Ошибка отправки сообщения:', error);
            throw error;
        }
    }

    // Получить сообщения чата
    async getChatMessages(chatId) {
        try {
            const token = localStorage.getItem('token');
            const url = `${this.baseUrl}/messages/${chatId}`;

            console.log('📥 Получение сообщений чата:', url);

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('📨 Ответ сервера:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            console.log('✅ Сообщения получены:', result);
            return result;
            
        } catch (error) {
            console.error('❌ Ошибка получения сообщений:', error);
            throw error;
        }
    }
}

export default new MessageService();