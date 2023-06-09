import { useTranslation } from 'react-i18next';
import style from './ErrorPage.module.scss';
import sadSmileImg from '../../assets/images/Sad_Smile.png';
import Nav from '../../components/nav/Nav';

const Error = () => {
  const { t } = useTranslation();
  return (
    <div className={style.loginBlock}>
      <Nav />
      <div className={style.container}>
        <img src={sadSmileImg} style={{ width: '100px', height: '100px' }} alt="ErrorPicture" />
        <h1>{t('notFound')}</h1>
        <div>
          <span>{t('youCanGo')}</span>
          <a href="/">{t('mainPage')}</a>
        </div>
      </div>
    </div>
  );
};

export default Error;
