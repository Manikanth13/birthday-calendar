import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Button,
} from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import { useEffect } from 'react';
import * as yup from 'yup';
import { useData } from '../../hooks';
import { getMonthList } from '../../utils';

const months = getMonthList();

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  birthDay: yup.number()
    .min(0, 'Day should be between 0 and 31.')
    .max(31, 'Day should be between 0 and 31.')
    .required('Day is required'),
  birthMonth: yup.number().required('Month is required'),
  birthYear: yup.number().max(moment().year()),
});

const AddForm: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const { addData } = useData();
  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      birthDate: '',
      birthDay: null,
      birthMonth: null,
      name: '',
    } as any,
    validationSchema,
    onSubmit: (values) => {
      const id = Date.now().toString();
      const birthDate = moment({
        day: values.birthDay,
        month: values.birthMonth,
        year: values.birthYear ? values.birthYear : 0,
      }).format('YYYY-MM-DD');

      const payload = {
        ...values,
        id,
        birthDate,
        birthMonth: values.birthMonth + 1,
      };
      addData(payload);
      resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    resetForm();
  }, [open, resetForm]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
      <DialogTitle>Add Friend</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && (errors.name as any)}
          />
          <TextField
            margin="normal"
            label="Day"
            name="birthDay"
            type="number"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ inputMode: 'numeric', min: 0, max: 31 }}
            value={values.birthDay}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.birthDay && Boolean(errors.birthDay)}
            helperText={touched.birthDay && (errors.birthDay as any)}
          />
          <TextField
            margin="normal"
            label="Month"
            name="birthMonth"
            type="number"
            select
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.birthMonth}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.birthMonth && Boolean(errors.birthMonth)}
            helperText={touched.birthMonth && (errors.birthMonth as any)}
          >
            {months.map((month, index) => (
              <MenuItem key={index} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            label="Year"
            name="birthYear"
            type="number"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={values.birthYear}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.birthYear && Boolean(errors.birthYear)}
            helperText={touched.birthYear && (errors.birthYear as any)}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddForm;
