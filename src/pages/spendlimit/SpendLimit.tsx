import Field from '@/components/field';
import Input from '@/components/input';
import Label from '@/components/label';
import SpendCate from '../spending/components/SpendCate';
import Button from '@/components/button';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICategory } from '@/types/category.type';
import { getAllCategory } from '@/services/categoryService';

const schema = yup
  .object({
    spendlimit: yup
      .number()
      .typeError('Vui lòng nhập số tiền hợp lệ !')
      .required('Vui lòng nhập số tiền hạn mức chi tiêu !'),
    catespend: yup.string().required('Vui lòng chọn danh mục !'),
  })
  .required();

const SpendLimit = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
    reset,
  } = useForm<{ spendlimit: number; catespend: string }>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const [category, setCategory] = useState<ICategory[]>([]);

  const handleSpendLimit: SubmitHandler<{ spendlimit: number; catespend: string }> = (values: any) => {
    console.log(values);
    reset();
  };

  useEffect(() => {
    (async () => {
      const dataCategory = await getAllCategory('expense');
      dataCategory && setCategory(dataCategory);
    })();
  });

  useEffect(() => {
    const arrErrors = Object.values(errors);

    if (arrErrors.length > 0) {
      toast.error(arrErrors[0].message);
    }
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
          <SpendCate category={category} setValue={setValue} control={control} />
        </Field>
        <div className="mt-10">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            Thiết lập hạn mức
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SpendLimit;
