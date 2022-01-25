import { IconButton, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

type Props = {
  small: Boolean;
  expandHeader: Boolean;
};

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    smallIcon: {
      padding: 0,
      fill: '#cccccc',
    },
    bigIcon: {
      fontSize: '5rem',
      fill: '#cccccc',
    },
    iconBtn: {
      padding: 0,
    },
  })
);
const ExpandIcon = ({ small, expandHeader }: Props) => {
  const classes = useStyles();
  return small ? (
    <div className={classes.container}>
      <IconButton className={classes.iconBtn}>
        {expandHeader ? (
          <ExpandLessIcon className={classes.bigIcon} />
        ) : (
          <ExpandMoreIcon className={classes.bigIcon} />
        )}
      </IconButton>
    </div>
  ) : (
    <IconButton className={classes.iconBtn}>
      {expandHeader ? (
        <ExpandLessIcon className={classes.smallIcon} />
      ) : (
        <ExpandMoreIcon className={classes.smallIcon} />
      )}
    </IconButton>
  );
};
export default ExpandIcon;
