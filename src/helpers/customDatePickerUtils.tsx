// import React from 'react';
// import { styled } from '@mui/material';
// import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
// import { Controller, Control } from 'react-hook-form';
// import { TextField } from '@mui/material';

// const StyledDatePicker = styled(DatePicker)(() => ({
//   width: '100%',
//   '& .MuiInputBase-root': {
//     backgroundColor: '#f2f3f5',
//     borderRadius: '6px',
//   },
//   '& .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'transparent',
//   },
//   '&:hover .MuiOutlinedInput-notchedOutline': {
//     borderColor: 'transparent',
//   },
// }));

// interface CustomDatePickerProps extends Omit<DatePickerProps<any>, 'renderInput'> {
//   name: string;
//   control: Control<any>;
//   label?: string;
// }

// const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ name, control, label, ...props }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value }, fieldState: { error } }) => (
//         <StyledDatePicker
//           {...props}
//           value={value}
//           onChange={onChange}
//           renderInput={params => (
//             <TextField {...params} label={label} error={!!error} helperText={error ? error.message : null} />
//           )}
//         />
//       )}
//     />
//   );
// };

// export default CustomDatePicker;

// // export const CustomDatePicker2 = styled(DatePicker)(() => ({
// //   width: '100%',
// //   '& .MuiInputBase-root': {
// //     backgroundColor: '#f2f3f5',
// //     borderRadius: '6px',
// //   },
// //   '& .MuiOutlinedInput-notchedOutline': {
// //     borderColor: 'transparent',
// //   },
// //   '&:hover .MuiOutlinedInput-notchedOutline': {
// //     borderColor: 'transparent',
// //   },
// // }));
