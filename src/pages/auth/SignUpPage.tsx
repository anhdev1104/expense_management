import Button from '@/components/button';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MessageForm from '@/components/message/MessageForm';
import { IAccount } from '@/types/auth.type';
import { register } from '@/services/authService';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    username: yup.string().trim().required('Vui lòng nhập vào tên của bạn !'),
    email: yup
      .string()
      .trim()
      .required('Email không được để trống !')
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Email không đúng định dạng !',
      }),
    password: yup
      .string()
      .trim()
      .required('Mật khẩu không được để trống !')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự trở lên !')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Mật khẩu có ít nhất một số và một ký tự đặc biệt !'
      ),
    confirm_password: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), undefined], 'Mật khẩu xác nhận phải khớp với mật khẩu đã nhập !'),
  })
  .required();

const SignUpPage = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const navigate = useNavigate();

  const handleSignUp: SubmitHandler<IAccount> = async (data: IAccount) => {
    await register(data);
    reset();
    toast.success('Đăng ký thành công. Vui lòng đăng nhập lại để xác thực !');
    navigate('/sign-in');
  };

  return (
    <div className="bg-primary/40 min-h-screen py-[50px] relative">
      <img src="/images/layer.png" alt="" className="w-[600px] absolute -top-[150px] -left-[300px] select-none" />
      <img src="/images/layer.png" alt="" className="w-[600px] absolute bottom-0 right-0 select-none" />
      <div className="w-[600px] mx-auto bg-white p-5 rounded-xl shadow-md relative z-10">
        <h2 className="text-center font-bold text-2xl mb-1 uppercase">Đăng ký tài khoản</h2>
        <p className="max-w-[400px] mx-auto text-center mb-5 text-sm">
          Tạo tài khoản để tận hưởng các tính năng giúp bạn quản lý chi tiêu hợp lý.
        </p>
        <form action="" onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input name="username" className="mt-3" placeholder="Nhập tên của bạn" control={control} />
            <MessageForm error={errors.username?.message} />
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" className="mt-3" placeholder="Nhập địa chỉ email" control={control} />
            <MessageForm error={errors.email?.message} />
          </Field>
          <Field>
            <Label htmlFor="password">Mật khẩu</Label>
            <Input type="password" name="password" className="mt-3" placeholder="Tối thiểu 8 kí tự" control={control} />
            <MessageForm error={errors.password?.message} />
          </Field>
          <Field>
            <Label htmlFor="confirm_password">Nhập lại mật khẩu</Label>
            <Input
              type="password"
              name="confirm_password"
              className="mt-3"
              placeholder="Nhập lại mật khẩu"
              control={control}
            />
            <MessageForm error={errors?.confirm_password?.message} />
          </Field>
          <div className="mt-10">
            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
              Tạo tài khoản
            </Button>
          </div>
          <div className="text-center mt-3">
            <span className="mr-2">Bạn đã có tài khoản?</span>
            <Link to="/sign-in" className="text-primary transition-all hover:underline">
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
