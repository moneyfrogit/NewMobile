import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 20,
        color: '#101010',
        marginTop: 80,
        fontWeight: '700'
      },
      listItem: {
        marginTop: 10,
        paddingVertical: 20,
        borderRadius:15,
        paddingHorizontal: 80,
        backgroundColor: '#a7ce51',
        flexDirection: 'row'
      },
      coverImage: {
        width: 100,
        height: 100,
        borderRadius: 8
      },
      metaInfo: {
        marginLeft: 10
      },
      title: {
        fontSize: 18,
        width: 200,
        padding: 10
      }
});

export default styles