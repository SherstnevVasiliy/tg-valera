require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Создаем бота с включенным polling
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я ваш новый бот. 👋\nИспользуйте /help для получения списка команд.');
});

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
Доступные команды:
/start - Начать работу с ботом
/help - Показать это сообщение


Также вы можете отправить только цифры, и я создам кнопку со ссылкой на опрос с этим ID.
  `;
  bot.sendMessage(chatId, helpMessage);
});


// Обработка обычных текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Проверяем, содержит ли сообщение только цифры
  if (!msg.text.startsWith('/') && /^\d+$/.test(msg.text)) {
    const pollId = msg.text;
    const pollUrl = `https://t.me/SplitTestRuBot/?startapp=poll_id${pollId}`;
    
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Открыть опрос', url: pollUrl }]
        ]
      }
    };
    
    bot.sendMessage(chatId, 'Нажмите на кнопку ниже, чтобы открыть опрос:', opts);
    return;
  }
  
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(chatId, 'Я получил ваше сообщение! Используйте /help для просмотра доступных команд.');
  }
});

console.log('Бот запущен!'); 