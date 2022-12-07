import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50'
    },
    pagerView: {
        flex: 1,
        backgroundColor: '#FFF'
      },
      page: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        marginBottom: 12,
        alignSelf: 'center',
        height: '85%',
		width: '100%'
    },
});

export default styles