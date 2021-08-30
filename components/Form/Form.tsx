import { useForm } from 'react-hook-form';

interface FormData {
  uid: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FormData) => {
    // Use the API to create new check in
    const response = await fetch(`/api/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: data.uid,
        location: 'Coles - Churchill Road',
      }),
    });

    console.log(response);

    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Please enter UID"
        {...register('uid', { required: true, maxLength: 7, minLength: 7 })}
      />
      <input type="submit" value="Check In" />
      {errors.uid && (
        <span className="error-message">Please enter a valid UID</span>
      )}
    </form>
  );
};

export default Form;
