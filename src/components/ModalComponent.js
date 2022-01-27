import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Modal, Animated} from 'react-native';
import {Container} from '.';
import {theme} from '../constants';

const ModalComponent = ({visible, children, style}) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };

    toggleModal();
  }, [scaleValue, visible]);

  return (
    <Modal transparent visible={showModal}>
      <Container color="rgba(0,0,0,0.5)" center middle>
        <Animated.View
          style={[
            styles.modalContainer,
            {transform: [{scale: scaleValue}]},
            style,
          ]}>
          {children}
        </Animated.View>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: theme.Sizes.width / 1.2,
    backgroundColor: theme.Colors.white,
    height: theme.Sizes.height / 2,
    borderRadius: theme.Sizes.radius / 5,
  },
});

export default ModalComponent;
