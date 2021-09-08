import type { User } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from '../../styles/RegisterForm.module.css';

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

  const [uid, setUID] = useState<undefined | number>();
  const [error, setError] = useState('');
  const [stage, setStage] = useState(0);

  const onSubmit = async ({ name, email, phone }: FormData) => {
    try {
      // Use the API to create new check in
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const json = (await response.json()) as User;
      setUID(json.uid);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return stage === 0 ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <label>Name:</label>
        <input
          placeholder="Please enter your name"
          type="text"
          {...register('name', {
            required: true,
            maxLength: 26,
            pattern: /^[A-Za-z ]+$/,
          })}
        />
        <label>Email:</label>
        <input
          placeholder="Please enter your email if you have one"
          type="text"
          {...register('email', {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          })}
        />
        <label>Phone:</label>
        <input
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
