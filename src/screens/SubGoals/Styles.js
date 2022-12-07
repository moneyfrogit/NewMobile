import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50'
    },
    modalContainer: {
        marginTop:'120%',
        height: '20%',
        width: '99%',
        backgroundColor: COLORS.main,
        borderRadius: 10,
        elevation: 40,
         borderWidth:0.2
      },
});

export default styles