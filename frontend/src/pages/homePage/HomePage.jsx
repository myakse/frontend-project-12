/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { animateScroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import Nav from '../../components/nav/Nav';
import Channel from '../../components/channel/Channel';
import Add from '../../modals/addChannel/AddChannel';
import MyContext from '../../contexts/context';
import style from './HomePage.module.scss';
import { setMessages } from '../../slices/messagesSlice.js';
import { setChannels, setCurrentChannelId } from '../../slices/channelsSlice.js';
import routes from '../../routes';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { t } = useTranslation();
  const [shownAdd, setShownAdd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateChannels = useSelector((state) => state.channelsReducer);
  const stateMessages = useSelector((state) => state.messagesReducer);
  const { channels, currentChannelId } = stateChannels;
  const { messages } = stateMessages;
  const {
    logOut, loggedIn, userData, socket,
  } = useContext(MyContext);
  const messagesNumber = messages.filter((message) => (
    message.channelId === currentChannelId)).length;

  const getAuthHeader = () => {
    if (userData.username && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

  const onExitButton = () => {
    localStorage.removeItem('user');
    logOut();
    navigate('/login');
  };

  const makeChannelActive = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const generateChannelsList = (channelsList) => (
    <ul>
      {channelsList.map((channel) => {
        const isChannelActive = channel.id === currentChannelId;
        return (
          <li className={isChannelActive ? style.channelActive : style.channelNotActive} key={`${channel.id}`}>
            <button
              type="button"
              onClick={() => makeChannelActive(channel.id)}
              className={isChannelActive ? style.channelActiveBtn : style.channelBtn}
            >
              #
              {channel.name}
            </button>
            <Channel isActive={isChannelActive} isRemovable={channel.removable} id={channel.id} />
          </li>
        );
      })}
    </ul>
  );

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messageBlock', delay: 0, duration: 0 });

    if (!loggedIn) {
      navigate('/login');
    } else {
      const fetchData = async () => {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        dispatch(setChannels(data.channels));
        dispatch(setMessages(data.messages));
      };

      fetchData();
    }
  }, [dispatch, messagesNumber]);

  useEffect(() => {
    if (!channels.some((channel) => channel.id === currentChannelId)) {
      dispatch(setCurrentChannelId(1));
    }
  }, [channels.length]);

  return (
    <div className={style.homeBlock}>
      <ToastContainer />
      <Nav button={<Button variant="primary" onClick={onExitButton}>{t('Logout')}</Button>} />
      <div className={style.container}>
        <div className={style.channelsBlock}>
          <div className={style.channelsAdd}>
            <span>{t('Channels')}</span>
            <button type="button" className={style.addChannelBtn} onClick={() => setShownAdd(true)}>+</button>
            <Add isShown={shownAdd} setShown={setShownAdd} />
          </div>
          {generateChannelsList(channels)}
        </div>
        <div id="messageBlock" className={style.messageBlock}>
          <div className={style.info}>
            {channels.filter((channel) => channel.id === currentChannelId).map((channel) => (
              <div key={channel.id}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  <b>
                    #
                    {channel.name}
                  </b>
                </span>
              </div>
            ))}
            <div>{t('messagesCount', { count: messagesNumber })}</div>
          </div>
          <div className={style.messageBox}>
            <ul>
              {messages.filter((message) => message.channelId === currentChannelId).map((mess) => (
                <li key={mess.id}>
                  {mess.author}
                  :
                  {' '}
                  {mess.message}
                </li>
              ))}
            </ul>
          </div>
          <Formik
            initialValues={{ message: '' }}
            onSubmit={(values, { resetForm }) => {
              const cleanMessage = filter.clean(values.message);
              socket.emit('newMessage', { message: cleanMessage, channelId: currentChannelId, author: userData.username });
              resetForm();
            }}
          >
            <Form className={style.formBlock}>
              <div className={style.form}>
                <Field
                  type="text"
                  id="message"
                  name="message"
                  className={style.formInput}
                  aria-label={t('newMessage')}
                  placeholder={t('messageFormPlaceholder')}
                  autoComplete="message"
                  autoFocus
                  required
                />
                <button type="submit" className={style.formBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Home;
