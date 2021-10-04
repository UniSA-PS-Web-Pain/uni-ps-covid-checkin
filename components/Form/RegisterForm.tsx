import type { User } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import registerUser from '../../lib/registerUser';
import QRCode from 'react-qr-code';

import styles from '../../styles/RegisterForm.module.css';

import { Users, Envelope, Phone } from 'phosphor-react';

interface FormData {
  name: string;
  email?: string;
  phone?: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uid, setUID] = useState<undefined | string>();
  const [error, setError] = useState('');
  const [stage, setStage] = useState(0);

  const onSubmit = async ({ name, email, phone }: FormData) => {
    try {
      const user = await registerUser({ name, email, phone });

      setUID(String(user.uid).padStart(7, '0'));
      setStage(1);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <div className={styles.phosphor}>
          <Users />
        </div>
        <label>Name:</label>
        <input
          id="user-Name"
          placeholder="Please enter your name"
          type="text"
          {...register('name', {
            required: true,
            maxLength: 26,
            pattern: /^[A-Za-z ]+$/,
          })}
        />
        <div className={styles.phosphor}>
          <Envelope />
        </div>
        <label>Email:</label>
        <input
          id="user-Email"
          placeholder="Please enter your email if you have one"
          type="text"
          {...register('email', {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />

        <div className={styles.phosphor}>
          <Phone />
        </div>
        <label>Phone:</label>
        <input
          id="user-PhoneNumber"
          placeholder="Please enter your phone number if you have one"
          type="text"
          {...register('phone', {
            pattern: /^(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}$/,
          })}
        />
      </div>

      <div className={styles.registerButton}>
        <button type="submit" value="Register">
          Register
        </button>
      </div>

      <div className={styles.checkIn}>
        <label>
          Already have an account?
          <div className={styles.link}>
            <a href="http://localhost:3000"> Check-in here</a>
          </div>
        </label>
      </div>

      <div className={styles.errorMessage}>
        {errors.name && (
          <span className="error-message">Please enter a name</span>
        )}
        {errors.email && (
          <span className="error-message">Please enter a valid Email</span>
        )}
        {errors.phone && (
          <span className="error-message">
            Please enter a valid Phone Number
          </span>
        )}
      </div>
    </form>
  ) : stage === 1 ? (
    <div>
      <h2>You have successfully registered!</h2>
      <p>{`Your UID is: ${uid}`}</p>
      <p>Your QR Code is:</p>
      <QRCode value={`${Buffer.from(uid || '').toString('base64')}`} />
      <button
        onClick={() => {
          setStage(0);
          setUID(undefined);
          setError('');
        }}
      >
        Go back
      </button>
    </div>
  ) : stage === 2 ? (
    <div>
      <h2>An error has occured!</h2>
      <p>{error}</p>
      <button
        onClick={() => {
          setStage(0);
          setUID(undefined);
          setError('');
        }}
      >
        Go back
      </button>
    </div>
  ) : null;
};

export default RegisterForm;
