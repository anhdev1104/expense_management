import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import SpendCate from '../spending/components/SpendCate';
import Button from '@/components/button';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

const schema = yup
  .object({
    spendlimit: yup.string().required('Vui lòng chọn ngày!'),
  })
  .required();

const SpendLimit = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    control,
    reset,
  } = useForm<{ spendlimit: string }>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const handleSpendLimit: SubmitHandler<{ spendlimit: string }> = (values: any) => {
    if (!isValid) return;
    console.log(values);
    reset();
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className="mt-[120px] mb-20">
      <form action="" className="w-[700px] mx-auto" onSubmit={handleSubmit(handleSpendLimit)}>
        <Field>
          <Label htmlFor="spendlimit">Đặt hạn mức</Label>
          <Input name="spendlimit" className="mt-3" placeholder="Nhập số tiền giới hạn chi tiêu" control={control} />
        </Field>
        <Field>
          <Label>Danh mục</Label>
          <SpendCate />
        </Field>
        <div className="mt-10">
          <Button type="submit">Thiết lập hạn mức</Button>
        </div>
      </form>
    </div>
  );
};

export default SpendLimit;
