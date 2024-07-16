import { styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const CustomDatePicker = styled(DatePicker)(() => ({
  width: '100%',
  '& .MuiInputBase-root': {
    backgroundColor: '#f2f3f5',
    borderRadius: '6px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
}));

export const CustomDatePicker2 = styled(DatePicker)(() => ({
  width: '100%',
  '& .MuiInputBase-root': {
    backgroundColor: '#f2f3f5',
    borderRadius: '6px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
}));
