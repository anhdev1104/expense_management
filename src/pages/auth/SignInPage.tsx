import Button from '@/components/button';
import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MessageForm from '@/components/message/MessageForm';
import { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginAuth } from '@/redux/auth/authThunk';
import useToggle from '@/hooks/useToggle';
import { VisibilityIcon, VisibilityOffIcon } from '@/components/icon/Icon';

interface IFormSignIn {
  email: string;
  password: string;
}

const schema = yup
  .object({
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
  })
  .required();

const SignInPage = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    control,
    reset,
  } = useForm<IFormSignIn>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });
  const { show: showPass, handleToggle: handleShowPass } = useToggle();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignIn: SubmitHandler<IFormSignIn> = async (data: any) => {
    if (!isValid) return;
    const response = await dispatch(loginAuth(data));

    if (response.payload.accessToken) {
      toast.success('Đăng nhập thành công !');
      reset();
      navigate('/');
    } else {
      toast.error(response.payload.response.data.message);
    }
  };

  return (
    <div className="bg-primary/40 h-screen pt-[100px] relative dark:text-black">
      <img src="/images/layer.png" alt="" className="w-[600px] absolute -top-[150px] -left-[300px] select-none" />
      <img src="/images/layer.png" alt="" className="w-[600px] absolute bottom-0 right-0 select-none" />
      <div className="w-[600px] mx-auto bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-center font-bold text-2xl mb-1 uppercase">Đăng nhập tài khoản</h2>
        <p className="max-w-[400px] mx-auto text-center mb-5 text-sm">
          Chào mừng bạn đến với phần mềm quản lý chi tiêu, giải pháp giúp việc chi tiêu trở nên hợp lý hơn.
        </p>
        <form action="" className="" onSubmit={handleSubmit(handleSignIn)}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" className="mt-3" placeholder="Nhập địa chỉ email" control={control} />
            <MessageForm error={errors.email?.message} />
          </Field>
          <Field>
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                type={showPass ? 'text' : 'password'}
                name="password"
                className="mt-3"
                placeholder="Tối thiểu 8 kí tự"
                control={control}
              />
              <div className="cursor-pointer absolute top-6 right-3 text-slate-500" onClick={handleShowPass}>
                {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
            <MessageForm error={errors.password?.message} />
          </Field>
          <div className="mt-10">
            <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
              Đăng nhập
            </Button>
          </div>
          <div className="text-center mt-3">
            <span className="mr-2">Bạn chưa có tài khoản?</span>
            <Link to="/sign-up" className="text-primary transition-all hover:underline">
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
