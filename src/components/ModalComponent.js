import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ModalComponent = ({ visible, onClose, children }) => {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAD7A0',
  },
  modalContent: {
    height:'90%',
    width:'93%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 17,
    elevation: 5,
  },
});

export default ModalComponent;
