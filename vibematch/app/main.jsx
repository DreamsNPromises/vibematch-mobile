import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const users = [
  {
    id: 1,
    name: 'Аня',
    age: 25,
    music: 'Инди, Lo-Fi',
    images: [
      require('../assets/images/cat-example.jpg'),
      require('../assets/images/cat-example2.jpg'),
      require('../assets/images/cat-example3.jpg'),
    ],
  },
  {
    id: 2,
    name: 'Макс',
    age: 28,
    music: 'Рок, Панк',
    images: [
      require('../assets/images/cat-example.jpg'),
      require('../assets/images/cat-example2.jpg'),
      require('../assets/images/cat-example3.jpg'),
    ],
  },
  {
    id: 3,
    name: 'Kate',
    age: 22,
    music: 'Поп, Электроника',
    images: [
      require('../assets/images/cat-example.jpg'),
      require('../assets/images/cat-example2.jpg'),
      require('../assets/images/cat-example3.jpg'),
    ],
  },
  {
    id: 4,
    name: 'Дима',
    age: 30,
    music: 'Хип-хоп',
    images: [
      require('../assets/images/cat-example.jpg'),
      require('../assets/images/cat-example2.jpg'),
      require('../assets/images/cat-example3.jpg'),
    ],
  },
  {
    id: 5,
    name: 'Оля',
    age: 27,
    music: 'Джаз, Соул',
    images: [
      require('../assets/images/cat-example.jpg'),
      require('../assets/images/cat-example2.jpg'),
      require('../assets/images/cat-example3.jpg'),
    ],
  },
];

const { width, height } = Dimensions.get('window');

export default function MainScreen() {
  const [index, setIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState({});
  const [swiperKey, setSwiperKey] = useState('swiper-0');
  const [isDeckEmpty, setIsDeckEmpty] = useState(false);

  const onSwiped = (type) => {
    console.log(`Свайп ${type} для ${users[index].name}`);
    setIndex((prev) => prev + 1);
    setImageIndices((prev) => {
      const newIndices = { ...prev };
      delete newIndices[users[index].id];
      return newIndices;
    });
  };

  const onSwipedAll = () => {
    console.log('Все карточки просмотрены');
    setIsDeckEmpty(true);
  };

  const switchImage = (cardId, direction) => {
    setImageIndices((prev) => {
      const currentIndex = prev[cardId] || 0;
      const user = users.find((u) => u.id === cardId);
      const maxIndex = user.images.length - 1;
      let newIndex;
      if (direction === 'next') {
        newIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
      }
      console.log(`Карточка ${cardId}: смена изображения на индекс ${newIndex}`);
      return { ...prev, [cardId]: newIndex };
    });
    setSwiperKey(`swiper-${Date.now()}`);
  };

  return (
    <View style={styles.container}>
      {isDeckEmpty ? (
        <View style={styles.emptyOverlay}>
          <Text style={[styles.emptyCardText, { fontSize: 32 }]}>{"Ooops!\n"}</Text>
          <Text style={styles.emptyCardText}>{"We have no one\nto show you..."}</Text>
        </View>
      ) : (
        <Swiper
          key={swiperKey}
          cards={users}
          cardIndex={index}
          renderCard={(user) => {
            console.log('Рендеринг карточки id:', user.id);
            const currentImageIndex = imageIndices[user.id] || 0;
            return (
              <View style={styles.card}>
                <Image source={user.images[currentImageIndex]} style={styles.cardImage} resizeMode="cover" />
                <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']} style={styles.gradient} />
                <TouchableOpacity
                  style={styles.leftTouchable}
                  onPress={() => switchImage(user.id, 'prev')}
                  activeOpacity={0.8}
                />
                <TouchableOpacity
                  style={styles.rightTouchable}
                  onPress={() => switchImage(user.id, 'next')}
                  activeOpacity={0.8}
                />
                <View style={styles.imageDots}>
                  {user.images.map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.imageDot,
                        { backgroundColor: i === currentImageIndex ? '#fff' : 'rgba(255, 255, 255, 0.5)' },
                      ]}
                    />
                  ))}
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{user.name}, {user.age}</Text>
                  <Text style={styles.cardMusic}>Любимая музыка: {user.music}</Text>
                </View>
              </View>
            );
          }}
          onSwipedLeft={() => onSwiped('left')}
          onSwipedRight={() => onSwiped('right')}
          onSwipedAll={onSwipedAll}
          stackSize={3}
          stackSeparation={12}
          stackScale={10}
          disableTopSwipe
          disableBottomSwipe
          backgroundColor={'transparent'}
          cardVerticalMargin={height * 0.15}
          cardHorizontalMargin={width * 0.05}
          animateCardOpacity
          animateOverlayLabelsOpacity
          overlayLabelOpacityAnimationDuration={500}
          overlayLabels={{
            left: {
              element: (
                <View style={styles.overlay}>
                  <Image source={require('../assets/images/dislike-red-icon.png')} style={styles.overlayIcon} resizeMode="contain" />
                </View>
              ),
              style: { wrapper: { ...StyleSheet.absoluteFillObject, borderRadius: 20, backgroundColor: 'rgba(255, 77, 77, 0.3)', justifyContent: 'center', alignItems: 'center' } },
            },
            right: {
              element: (
                <View style={styles.overlay}>
                  <Image source={require('../assets/images/like-green-icon.png')} style={styles.overlayIcon} resizeMode="contain" />
                </View>
              ),
              style: { wrapper: { ...StyleSheet.absoluteFillObject, borderRadius: 20, backgroundColor: 'rgba(77, 255, 77, 0.3)', justifyContent: 'center', alignItems: 'center' } },
            },
          }}
          onStartShouldSetResponder={() => false}
          onStartShouldSetPanResponder={() => false}
          panResponderThreshold={10}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'visible',
    position: 'relative',
  },
  emptyCard: {
    width: width * 0.9,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCardText: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'ADLaM',
    textAlign: "center",
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 20,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  leftTouchable: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '50%',
    height: '100%',
    zIndex: 10,
  },
  rightTouchable: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50%',
    height: '100%',
    zIndex: 10,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
  },
  cardName: {
    fontSize: 24,
    fontFamily: 'ADLaM',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardMusic: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  overlay: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayIcon: {
    width: 80,
    height: 80,
  },
  imageDots: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
  imageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});