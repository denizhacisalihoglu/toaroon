import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modal: {
    paddingTop: 50
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 10
  },
  left: {
    alignItems: 'flex-start',
    flex: 1
  },
  right: {
    alignItems: 'flex-end',
    flex: 1
  },
  page: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 15,
    textAlign: 'center'
  },
  item: {
    textAlign: 'center'
  },
  warning: {
    textAlign: 'center'
  }
});
