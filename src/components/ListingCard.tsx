import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import haversine from 'haversine';

const formatNumber = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
}).format;

export default function ListingCard({listing, distance}: any) {
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);

  const handleCall = () => {
    const phoneNumber = `tel:${listing.contact.mobile}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <TouchableOpacity style={{flex: 1}} activeOpacity={0.7}>
      <View
        style={[
          styles.card,
          {backgroundColor: isDarkMode ? '#121214' : '#fff'},
        ]}>
        {/* Hover Buttons */}
        <View style={styles.cardHoverButtons}>
          <TouchableOpacity>
            <View style={styles.cardHoverButton}>
              <FontAwesome
                color={'#ea266d'}
                name="heart"
                solid={true}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCall} style={styles.cardHoverButton}>
            <FeatherIcon name="phone" color="#ea266d" size={20} solid={true} />
          </TouchableOpacity>
        </View>

        {/* Top Section with Image */}
        <View style={styles.cardTop}>
          <Image
            alt=""
            resizeMode="cover"
            style={styles.cardImg}
            source={{uri: listing.images[0].url}}
          />
        </View>

        {/* Body Section */}
        <View style={styles.cardBody}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={{flex: 1, marginRight: 8}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.cardTitle,
                  {color: isDarkMode ? '#fff' : '#232425'},
                ]}>
                {listing.title}
              </Text>
            </View>
            <View style={styles.cardRatingContainer}>
              <FontAwesome color="#ea266d" name="star" solid={true} size={12} />
              <Text
                style={[
                  styles.cardRating,
                  {color: isDarkMode ? '#fff' : '#ea266d'},
                ]}>
                {listing.ratings}
              </Text>
              <Text
                style={[
                  styles.cardReviews,
                  {color: isDarkMode ? '#aaa' : '#595a63'},
                ]}>
                ({formatNumber(listing.reviews)} reviews)
              </Text>
            </View>
          </View>

          {/* Gender */}
          <Text
            style={[
              styles.cardGender,
              {color: isDarkMode ? '#aaa' : '#595a63'},
            ]}>
            Available for{' '}
            {listing.genderPreference.map((gender: string, index: number) => (
              <React.Fragment key={index}>
                <FontAwesome
                  name={
                    gender === 'Male'
                      ? 'mars'
                      : gender === 'Female'
                      ? 'venus'
                      : 'genderless'
                  }
                  size={14}
                  color={isDarkMode ? '#aaa' : '#595a63'}
                />{' '}
                {gender}
                {index !== listing.genderPreference.length - 1 && ', '}
              </React.Fragment>
            ))}
          </Text>
          {/* Suitable For */}
          <Text
            style={[
              styles.cardSuitableFor,
              {color: isDarkMode ? '#aaa' : '#595a63'},
            ]}>
            Suitable for:{' '}
            {listing.suitableFor.map((category: string, index: number) => (
              <Text key={index}>
                {category}
                {index !== listing.suitableFor.length - 1 && ', '}
              </Text>
            ))}
          </Text>

          {/* Pricing */}
          <View style={styles.pricingContainer}>
            {listing.pricing.Single?.isAvailable && (
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Single</Text>
                <Text
                  style={[
                    styles.pricingValue,
                    {color: isDarkMode ? '#fff' : '#232425'},
                  ]}>
                  ₹{listing.pricing.Single.price.toLocaleString('en-IN')}
                </Text>
              </View>
            )}
            {listing.pricing.Double?.isAvailable && (
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Sharing (2 People)</Text>
                <Text
                  style={[
                    styles.pricingValue,
                    {color: isDarkMode ? '#fff' : '#232425'},
                  ]}>
                  ₹{listing.pricing.Double.price.toLocaleString('en-IN')} /
                  person
                </Text>
              </View>
            )}
            {listing.pricing.Triple?.isAvailable && (
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Sharing (3 People)</Text>
                <Text
                  style={[
                    styles.pricingValue,
                    {color: isDarkMode ? '#fff' : '#232425'},
                  ]}>
                  ₹{listing.pricing.Triple.price.toLocaleString('en-IN')} /
                  person
                </Text>
              </View>
            )}

            {listing.pricing.Dormitory?.isAvailable && (
              <View style={styles.pricingItem}>
                <Text style={styles.pricingLabel}>Dormitory</Text>
                <Text
                  style={[
                    styles.pricingValue,
                    {color: isDarkMode ? '#fff' : '#232425'},
                  ]}>
                  ₹{listing.pricing.Dormitory.price.toLocaleString('en-IN')} /
                  person
                </Text>
              </View>
            )}
          </View>

          {/* Distance & Location */}
          <View style={styles.footerRow}>
            <View style={styles.location}>
              <Entypo
                name="location-pin"
                size={16}
                color={isDarkMode ? '#aaa' : '#595a63'}
              />
              <View style={{width: '50%'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    styles.cardLocation,
                    {color: isDarkMode ? '#aaa' : '#595a63'},
                  ]}>
                  {listing.address.street}, {listing.address.city},{' '}
                  {listing.address.state}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={[
                  styles.cardDistance,
                  {color: isDarkMode ? '#aaa' : '#595a63'},
                ]}>
                {distance}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    position: 'relative',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardHoverButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    gap: 8,
    zIndex: 1,
  },
  cardHoverButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  cardTop: {
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  cardBody: {
    padding: 12,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardRating: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardReviews: {
    fontSize: 12,
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardGender: {
    fontSize: 14,
  },
  cardSuitableFor: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
    alignSelf: 'flex-start',
    fontWeight: '500',
  },
  pricingContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  pricingItem: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ddd',
  },
  pricingLabel: {
    fontSize: 12,
    color: '#595a63',
  },
  pricingValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexWrap: 'wrap',
    marginTop: 8,
    gap: 5,
    // overflow: 'hidden',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  cardLocation: {
    fontSize: 12,
    // flex: 1,
  },
  cardDistance: {
    fontSize: 12,
  },
});
