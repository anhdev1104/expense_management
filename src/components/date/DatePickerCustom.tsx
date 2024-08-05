import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

const DatePickerCustom = ({
  control,
  isDefaultValue,
  isView,
}: {
  control: any;
  isDefaultValue?: boolean;
  isView?: boolean;
}) => {
  return (
    <div className="mt-3 w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          control={control}
          name="date"
          render={({ field }: any) => {
            return (
              <DatePicker
                views={isView ? ['year', 'month'] : ['year', 'month', 'day']}
                label={isView ? 'Chọn tháng' : 'Chọn ngày'}
                defaultValue={isDefaultValue ? dayjs(field.value) : null}
                value={field.value ? dayjs(field.value) : null}
                inputRef={field.ref}
                onChange={date => {
                  field.onChange(date);
                }}
                className="w-full"
              />
            );
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerCustom;
