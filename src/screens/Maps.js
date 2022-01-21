import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Marker, PROVIDER_GOOGLE, Geojson} from 'react-native-maps';
import MapView from 'react-native-map-clustering';

import statesPopulation from '../../assets/us-population-geographical-data/states-population.json';
import countiesPopulation from '../../assets/us-population-geographical-data/counties-population.json';
import clusteringMarkers from '../../assets/us-population-geographical-data/clustering_markers.json';

import {theme} from '../constants';
import {Container, HeaderComponent} from '../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import CircleTransition from 'react-native-circle-reveal-view';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ASPECT_RATIO = theme.Sizes.width / theme.Sizes.height;
const LATITUDE_DELTA = 50;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Maps = () => {
  const [region, setRegion] = useState({
    latitude: 38.05045086673087,
    longitude: -100.74721036478877,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  const mapRef = useRef();
  const headerRef = useRef();

  const onRegionChangeComplete = mapRegion => {
    setRegion({
      latitude: mapRegion.latitude,
      longitude: mapRegion.longitude,
      latitudeDelta: mapRegion.latitudeDelta,
      longitudeDelta: mapRegion.longitudeDelta,
    });
  };

  const getStatesPopulation = () => {
    return (
      <>
        {statesPopulation.features.map((res, index) => {
          const features = {type: 'FeatureCollection', features: [res]};
          return (
            <Geojson
              key={index}
              geojson={features}
              // strokeColor={getStatesColor(res.properties.Pop)}
              fillColor={getStatesColor(res.properties.Pop)}
              strokeWidth={0}
            />
          );
        })}
      </>
    );
  };

  const getStatesColor = population => {
    return population >= 15000000
      ? '#ea1000'
      : population < 15000000 && population >= 4000000
      ? '#ea8900'
      : population < 4000000 && population >= 900000
      ? '#0033ea'
      : '#4eea00';
  };

  const getCountiesPopulation = () => {
    return (
      <>
        {countiesPopulation.features.map((res, index) => {
          const features = {type: 'FeatureCollection', features: [res]};
          return (
            <Geojson
              key={index}
              geojson={features}
              // strokeColor={getCountiesColor(res.properties.Pop)}
              fillColor={getCountiesColor(res.properties.Pop)}
              strokeWidth={0}
            />
          );
        })}
      </>
    );
  };

  const getCountiesColor = population => {
    return population >= 300000
      ? '#FF0000'
      : population < 300000 && population >= 40000
      ? '#FFA500'
      : population < 40000 && population >= 5000
      ? '#008000'
      : '#0000FF';
  };

  const renderHeader = () => {
    return (
      <HeaderComponent
        title={'Power BI'}
        actionIcon="magnify"
        actionPress={showSearchBar}
      />
    );
  };

  const showSearchBar = () => {
    headerRef.current.toggle();
  };

  const hideSearchBar = () => {
    headerRef.current.collapse();
    setSearchedData([]);
    setSearchQuery('');
  };

  const searchText = query => {
    if (query) {
      const data = clusteringMarkers.features.filter(item => {
        const name = item.properties.location.toLowerCase();
        return name.indexOf(query.toLowerCase()) > -1;
      });
      setSearchedData(data);
    }
  };

  const clearIconPress = () => {
    setSearchQuery('');
    setSearchedData([]);
  };

  const renderSearchBar = () => {
    return (
      <CircleTransition
        ref={headerRef}
        backgroundColor={theme.Colors.white}
        duration={700}
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        revealPositionArray={{top: true, right: true}}>
        <Searchbar
          placeholder="Search..."
          onChangeText={text => {
            setSearchQuery(text);
            searchText(text);
          }}
          autoFocus={true}
          value={searchQuery}
          icon="keyboard-backspace"
          onIconPress={hideSearchBar}
          clearIcon={() => (
            <AntDesign
              name="close"
              size={theme.Sizes.F24}
              color={theme.Colors.black}
              onPress={clearIconPress}
            />
          )}
          style={{height: 56}}
          inputStyle={{
            fontSize: theme.Sizes.F14,
            letterSpacing: moderateScale(0.5),
          }}
        />
      </CircleTransition>
    );
  };

  const renderSearchedLocation = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {}}
        style={{
          paddingVertical: theme.Sizes.S10 / 3,
          paddingHorizontal: theme.Sizes.S10,
        }}>
        <Text style={{fontSize: theme.Sizes.F14}}>
          {item.properties.location}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSearchedData = () => {
    return (
      <Container
        color={'white'}
        style={{
          position: 'absolute',
          width: '80%',
          top: StatusBar.currentHeight + 56,
          alignSelf: 'center',
          maxHeight: theme.Sizes.height / 2.5,
          borderColor: theme.Colors.grey,
          borderWidth: 0.7,
          borderBottomLeftRadius: theme.Sizes.radius / 5,
          borderBottomRightRadius: theme.Sizes.radius / 5,
        }}>
        <FlatList
          data={searchedData}
          extraData={searchedData}
          keyboardShouldPersistTaps={'always'}
          renderItem={renderSearchedLocation}
          keyExtractor={(_, index) => index.toString()}
        />
      </Container>
    );
  };

  const renderMap = () => {
    return (
      <Container style={styles.container}>
        <MapView
          // onMapReady={onMapReady}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          // region={region}
          // onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChangeComplete}
          loadingEnabled={true}
          toolbarEnabled={false}
          zoomControlEnabled>
          {clusteringMarkers.features.map((res, index) => {
            if (res.latitude && res.longitude) {
              return (
                <Marker
                  key={res.properties.location_id}
                  tracksViewChanges={false}
                  coordinate={{
                    latitude: res.latitude,
                    longitude: res.longitude,
                  }}
                />
              );
            } else {
              return null;
            }
          })}

          {region.latitudeDelta > 20 && getStatesPopulation()}
          {region.latitudeDelta < 20 && getCountiesPopulation()}
        </MapView>
      </Container>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {renderHeader()}
      {renderSearchBar()}
      {renderMap()}
      {searchedData.length > 0 && renderSearchedData()}
    </SafeAreaView>
  );
};

export default Maps;
