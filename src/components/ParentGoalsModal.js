import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { COLORS } from "../constants/theme";

const ParentGoalsModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Advisor Name</Text>
            <Text style={styles.modalText}>Mobile - +91 9004675553 </Text>
            <Text style={styles.modalText}>Chat with Advisors on Whatsapp</Text>
            <View style={{
              flexDirection:'row',
               justifyContent:'space-between',
                alignContent:'space-between',
                margin:5
                }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Okay{' '}{' '}</Text>
            </Pressable>
            <View style={{padding:20}}></View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Okay</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Parent Goals</Text>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 5,
    marginBottom:10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#a7ce51",
  },
  buttonClose: {
    backgroundColor: "#a7ce51",
  },
  textStyle: {
    color: "black",
    fontSize:20,
    fontWeight: "bold",
    textAlign: "center",
    alignItems:'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:COLORS.black,
    fontWeight:'bold'
  }
});

export default ParentGoalsModal;


// function Cards() {
//   const [modalVisible, setModalVisible] = useState(false);

//   const [modalEntry, setModalEntry] = useState();

//   return (
//       <SafeAreaView style={styles.container}>
//           <View style={{ height: 600, marginTop: 25 }}>
//               <FlatList
//                   data={entries}
//                   ListFooterComponent={Header}
//                   renderItem={({ item }) => (
//                       <View>
//                           <Card style={styles.cards}>

//                               {...}
                              
//                               <Pressable
//                                   style={[styles.button, styles.buttonClose]}
//                                   onPress={() => {
//                                       setModalVisible(!modalVisible);
//                                       setModalEntry(item);
//                                   }}
//                               >
//                                   <Text style={styles.textStyle}>
//                                       View more
//                                   </Text>
//                               </Pressable>

//                               {...}

//                           </Card>
//                       </View>
//                   )}
//               />
//           </View>
//           <Modal
//               entry={entry}
//               modalVisible={modalVisible}
//               onClose={() => setModalVisible(false)}
//           />
//       </SafeAreaView>
//   );
// }

// function Modal({ entry, modalVisible, onClose }) {
//   return (
//       <View style={styles.centeredView}>
//           <Modal
//               animationType="slide"
//               // transparent={true}
//               visible={modalVisible}
//               presentationStyle={"overFullScreen"} // iOS prop only
//               onRequestClose={() => {
//                   Alert.alert("Modal has been closed.");
//                   onClose();
//               }}
//           >
//               <View style={styles.centeredView}>
//                   <View style={styles.modalView}>
//                       <Text style={styles.modalText}>Journal entry:</Text>
//                       <View>
//                           <Text>
//                               {entry.entryJournal}
//                               {"\n"}
//                           </Text>
//                       </View>
//                       <Pressable
//                           style={[styles.modalButton, styles.buttonClose]}
//                           onPress={() => onClose()}
//                       >
//                           <Text style={styles.textStyle}>Close</Text>
//                       </Pressable>
//                   </View>
//               </View>
//           </Modal>
//       </View>
//   );
// }