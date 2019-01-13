import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  page: {
    flex: 1,
    width,
    height,
    backgroundColor: '#F7F7F7',
  },
  wrapper: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: width * .02
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    top: 0,
    paddingTop: 50,
    paddingBottom: 10
  },
  left: {
    flex: 1,
    alignItems: 'flex-start'
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 18,
    display: 'flex',
    flex: 4,
  },
  right: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});
