const {v4} = require("uuid");
const tarantool = require("./config/tarantool");


tarantool.on("connect", async () => {

  const bindParams = [
    name,
    language,
    subject,
    body,
    Date.now(),
    Date.now(),
    v4()
  ];


  try {
    await tarantool.sql(`insert into mail_templates (name, language, subject, body, created_at, updated_at, uuid) values (?, ?, ?, ?, ?, ?, ?)`, bindParams);
  }
  catch(err) {
    console.log(err);
  }


  global.process.exit();
});


const name = 'registration';
const language = 'ru';
const subject = "Регистрация";


const body = `
doctype html
html(lang='ru')
  head
    meta(charset='utf8')
  body
    h1 Здравствуйте!
    div Это великолепно, Вы зарегистрировались на нашем сайте и мы рады этому!
    div Для авторизации вам понадобиться код, вот он: #{password}
    div Также вам требуется потвердить ваш аккаунт, вот <a href='https://nesaweb.xyz/registration-authorization/verification/email?token=#{verificationToken}'>ссылка</a>
    div Спасибо за уделенное время!
`;
