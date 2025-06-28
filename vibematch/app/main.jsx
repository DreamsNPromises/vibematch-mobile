import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const users = [
  {
    id: 1,
    name: 'Аня',
    age: 25,
    music: 'Инди, Lo-Fi',
    bio: 'Люблю слушать музыку по вечерам и гулять под звездами. Иногда рисую и мечтаю о путешествиях по миру.',
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
    bio: 'Фанат живых концертов и громкой музыки. Играю на гитаре и катаюсь на скейте. Всегда за новые приключения!',
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
    bio: 'Танцую под любимые треки и обожаю яркие вечеринки. Мечтаю открыть свой стартап в сфере технологий.',
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
    bio: 'Пишу рэп, увлекаюсь стрит-артом. Люблю длинные разговоры за кофе и уличную культуру. Ищу единомышленников!',
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
    bio: 'Ценю уютные вечера с джазом и книгами. Увлекаюсь йогой и готовлю десерты. Ищу вдохновение в мелочах.',
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
  const [descriptionCardId, setDescriptionCardId] = useState(null);
  const descriptionAnim = useRef(new Animated.Value(0)).current;
  const cardInfoAnim = useRef(new Animated.Value(0)).current;
  const descriptionHeightRef = useRef({});

  const onLayoutDescription = (cardId, event) => {
    const { height } = event.nativeEvent.layout;
    console.log(`Description block height for card ${cardId}: ${height}`);
    descriptionHeightRef.current[cardId] = height;
  };

  useEffect(() => {
    console.log('useEffect: descriptionCardId изменился на', descriptionCardId);
    const descriptionHeight = descriptionCardId ? (descriptionHeightRef.current[descriptionCardId] || 150) : 150;
    Animated.parallel([
      Animated.timing(descriptionAnim, {
        toValue: descriptionCardId ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cardInfoAnim, {
        toValue: descriptionCardId ? -(descriptionHeight + 10) : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => console.log('Анимация завершена, descriptionCardId:', descriptionCardId, 'descriptionAnim:', descriptionAnim));
  }, [descriptionCardId]);

  const onSwiped = (type) => {
    console.log(`Свайп ${type} для ${users[index]?.name || 'нет имени'}`);
    setIndex((prev) => prev + 1);
    setDescriptionCardId(null);
    Animated.parallel([
      Animated.timing(descriptionAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(cardInfoAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
    setImageIndices((prev) => {
      const newIndices = { ...prev };
      if (users[index]) {
        delete newIndices[users[index].id];
      }
      return newIndices;
    });
  };

  const onSwipedAll = () => {
    console.log('Все карточки просмотрены');
    setIsDeckEmpty(true);
    setDescriptionCardId(null);
    Animated.parallel([
      Animated.timing(descriptionAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(cardInfoAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const switchImage = (cardId, direction) => {
    setImageIndices((prev) => {
      const currentIndex = prev[cardId] || 0;
      const user = users.find((u) => u.id === cardId);
      if (!user) return prev;
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

  const toggleDescription = (cardId) => {
    console.log('Тап по кнопке описания, id:', cardId);
    if (descriptionCardId === cardId) {
      Animated.parallel([
        Animated.timing(descriptionAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(cardInfoAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDescriptionCardId(null);
        setSwiperKey(`swiper-${Date.now()}`);
      });
    } else {
      setDescriptionCardId(cardId);
      setSwiperKey(`swiper-${Date.now()}`);
    }
  };

  return (
    <View style={styles.container}>
      {isDeckEmpty ? (
        <View style={styles.emptyOverlay}>
          <Text style={[styles.emptyCardText, { fontSize: 32 }]}>{"Ooops!\n"}</Text>
          <Text style={styles.emptyCardText}>{"We have no one\nto show you..."}</Text>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Swiper
            key={swiperKey}
            cards={users}
            cardIndex={index}
            renderCard={(user) => {
              console.log('Рендеринг карточки id:', user.id, 'descriptionCardId:', descriptionCardId);
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
                  <Animated.View
                    style={[
                      styles.cardInfo,
                      {
                        transform: [{ translateY: cardInfoAnim }],
                      },
                    ]}
                  >
                    <Text style={styles.cardName}>{user.name}, {user.age}</Text>
                    <Text style={styles.cardMusic}>Любимая музыка: {user.music}</Text>
                  </Animated.View>
                  {descriptionCardId === user.id && (
                    <Animated.View
                      style={([
                        styles.descriptionBlock,
                        {
                          opacity: descriptionAnim,
                          transform: [
                            {
                              translateY: descriptionAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [descriptionHeightRef.current[user.id] || 150, 0],
                              }),
                            },
                          ],
                        },
                      ])}
                      onLayout={(event) => onLayoutDescription(user.id, event)}
                    >
                      <Text style={styles.descriptionText} numberOfLines={5} ellipsizeMode="tail">
                        {`Имя: ${user.name}\nВозраст: ${user.age}\nМузыка: ${user.music}\n${user.bio || ''}`}
                      </Text>
                    </Animated.View>
                  )}
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
          <TouchableOpacity
            style={styles.descriptionButton}
            onPress={() => toggleDescription(users[index].id)}
            activeOpacity={0.8}
          >
            <Text style={styles.descriptionButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    overflow: 'hidden',
    position: 'relative',
  },
  emptyOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  emptyCardText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'ADLaM',
    textAlign: 'center',
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
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 8,
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
  descriptionButton: {
    position: 'absolute',
    bottom: 99,
    left: '46%',
    transform: [{ translateX: -40 }],
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  descriptionButtonText: {
    fontSize: 40,
    color: '#333',
  },
  descriptionBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    paddingLeft: 25,
    paddingRight: 15,
    borderRadius: 20,
    alignItems: 'flex-start',
    zIndex: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});