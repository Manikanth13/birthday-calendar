import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMemo, useState } from 'react';
import { FriendData } from '../../types';
import moment from 'moment';
import { useData } from '../../hooks';
import AddForm from './add-form';
import { calculateAge, calculateDaysToBirthday } from '../../utils';

const BirthdayDetails = (item: FriendData) => {
  const daysToBirthday = calculateDaysToBirthday(item.birthDate);

  return (
    <div
      className="birthday_details"
      style={{ display: 'flex', gap: '0.5rem' }}
    >
      <div className="list_item_email">
        {item.birthYear
          ? moment(item.birthDate).format('MMM DD YYYY')
          : moment(item.birthDate).format('MMM DD')}
      </div>
      {item.birthYear && <div> Age : {calculateAge(item.birthDate)}</div>}
      {Boolean(daysToBirthday) && <div>{daysToBirthday} days to birthday</div>}
    </div>
  );
};

const BirthdayModule: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { todayBirthdayData, upcomingBirthdayData } = useData();
  return (
    <Box display="flex" flexDirection="column">
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Birthdays
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Add"
            title="Add"
            sx={{ mr: -2 }}
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        <ListSubheader>
          <Typography variant="h6">Today's Birthdays</Typography>
        </ListSubheader>
        {!!todayBirthdayData.length ? (
          todayBirthdayData.map((item: FriendData) => (
            <FriendItem key={item.id} item={item} />
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No Birthdays Today" />
          </ListItem>
        )}
        <ListSubheader sx={{ mt: 2 }}>
          <Typography variant="h6">Upcoming Birthdays</Typography>
        </ListSubheader>
        {!!upcomingBirthdayData.length ? (
          upcomingBirthdayData.map((item: FriendData) => (
            <FriendItem key={item.id} item={item} />
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No upcomming birthdays" />
          </ListItem>
        )}
      </List>
      <AddForm open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

const FriendItem: React.FC<{ item: FriendData }> = ({ item }) => {
  const isTodayBirthday = useMemo(
    () => moment().format('MMM DD') === moment(item.birthDate).format('MMM DD'),
    [item.birthDate]
  );

  return (
    <>
      <ListItem
        sx={{ backgroundColor: isTodayBirthday ? 'Highlight' : 'transparent' }}
      >
        <ListItemText
          primary={item.name}
          secondary={<BirthdayDetails {...item} />}
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default BirthdayModule;
