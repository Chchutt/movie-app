import { Alert } from 'antd';
import React from 'react';

const onCloseReload = () => {
  location.reload();
};
const onClose = (e) => {
  console.log(e, 'I was closed.');
};

export const ErrorAlert = () => (
  <>
    <Alert
      message="По Вашему запросу ничего не найдено"
      type="warning"
      closable
      onClose={onClose}
      style={{
        width: '938px',
        margin: 'auto',
      }}
    />
  </>
);

export const ErrorConnection = () => (
  <>
    <Alert
      message="Ошибка соединения"
      description="Нет интернет соединения, попробуйте перезагрузить страницу"
      type="error"
      closable
      onClose={onCloseReload}
      style={{
        width: '938px',
        margin: 'auto',
      }}
    />
  </>
);
