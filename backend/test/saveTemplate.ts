import {v4} from 'uuid';
import { tarantool } from './config/tarantool';


tarantool.on('connect', () => {

  const bindParams: any[] = [
    'registration',
    'Регистрация',
    str,
    'ru',
    Date.now(),
    Date.now(),
    v4()
  ]


  tarantool.sql(`insert into mail_templates (name, subject, body, language, created_at, updated_at, uuid) values(?, ?, ?, ?, ?, ?, ?)`,bindParams); 


  return undefined;
});


tarantool.on('reconnecting', () => {
  console.log('Reconnect to tarantool');
  return undefined;
});


const str: string = `
html(lang="ru")
  head
    title Page test
    head


  body
    h1 Hello world

    span password #{ password }
    span token #{ verificationToken }
