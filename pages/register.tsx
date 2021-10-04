import type { NextPage } from 'next';
import { useTranslation } from 'react-i18next';

import RegisterForm from '../components/Form/RegisterForm';
import Head from '../components/Layout/Head';
import LeftContainer from '../components/LeftContainer';
import styles from '../styles/Home.module.css';

const Register: NextPage = () => {
  const [t] = useTranslation();

  return (
    <div className={styles.mainContainer}>
      <Head
        title="Covid Register Terminal"
        description="Register with ease with this Terminal"
      />

      <LeftContainer tkey="RegisterPage" />

      <div className={styles.rightContainer}>
        <div className={styles.topWindow}></div>

        <div className={styles.subContainer}>
          <Head
            title="Covid Register Terminal"
            description="Register with ease with this Terminal"
          />

          <h1>{t('RegisterPage.Header')}</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
