import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Marker, PROVIDER_GOOGLE, Geojson} from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Checkbox, FAB, Searchbar} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {theme} from '../constants';
import {Container} from '../components';
import {
  filterCountry,
  filterSiteStatus,
  filterSiteSubType,
  filterSiteType,
  filterTypes,
  filterVendor,
} from '../constants/filters';
import ModalComponent from '../components/ModalComponent';

import * as Animatable from 'react-native-animatable';

import statesPopulation from '../../assets/us-population-geographical-data/states-population.json';
import countiesPopulation from '../../assets/us-population-geographical-data/counties-population.json';
// Following line contains 5000 markers (uncomment it)
// import clusteringMarkers from '../../assets/us-population-geographical-data/clustering_markers.json';

// Following lines contains 500 markers (uncomment it)
import clusteringMarkers from '../../assets/us-population-geographical-data/clustering_markers_500.json';

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
  const [selectedFilterType, setSelectedFilterType] = useState('Site Status');
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);
  const [visibleSearchButton, setVisibleSearchButton] = useState(false);

  const [siteStatusAll, setSiteStatusAll] = useState(false);
  const [filterSiteStatusData, setFilterSiteStatusData] = useState([]);

  const mapRef = useRef();

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

  const searchText = query => {
    if (query) {
      const data = clusteringMarkers.features.filter(item => {
        const name = item.properties.location_id.toLowerCase();
        return name.indexOf(query.toLowerCase()) > -1;
      });
      setSearchedData(data);
    }
  };

  const clearIconPress = () => {
    setSearchQuery('');
    setSearchedData([]);
  };

  const closeIconPress = () => {
    setVisibleSearchBar(false);
    setVisibleSearchButton(false);
    Keyboard.dismiss();
  };

  const showSearchBar = () => {
    setVisibleSearchBar(true);
    setVisibleSearchButton(true);
  };
  const renderSearchButton = () => {
    return (
      <Animatable.View
        animation={visibleSearchButton ? 'fadeOutRight' : 'fadeInRight'}
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + theme.Sizes.S14 * 1.4,
          right: theme.Sizes.S10,
          zIndex: 10,
        }}>
        <FAB
          icon={() => (
            <FontAwesome
              name="search"
              size={theme.Sizes.F20}
              color={theme.Colors.blue}
            />
          )}
          color={theme.Colors.blue}
          style={{
            width: theme.Sizes.S14 * 3.4,
            height: theme.Sizes.S14 * 3.4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.Colors.lightgrey2,
          }}
          onPress={showSearchBar}
        />
      </Animatable.View>
    );
  };

  const renderSearchBar = () => {
    return (
      <Animatable.View
        animation={visibleSearchBar ? 'fadeInLeft' : 'fadeOutLeft'}
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + theme.Sizes.S14 * 1.5,
          left: theme.Sizes.S14,
          zIndex: 10,
        }}>
        <Searchbar
          placeholder="Search..."
          onChangeText={text => {
            setSearchQuery(text);
            searchText(text);
          }}
          value={searchQuery}
          icon="close"
          onIconPress={closeIconPress}
          clearIcon={() =>
            searchQuery !== '' && (
              <Feather
                name="delete"
                size={theme.Sizes.F20}
                color={theme.Colors.grey}
                onPress={clearIconPress}
              />
            )
          }
          style={{
            width: theme.Sizes.width * 0.9,
            borderRadius: theme.Sizes.radius / 3,
            backgroundColor: theme.Colors.lightgrey2,
          }}
          inputStyle={{
            fontSize: theme.Sizes.F14,
            letterSpacing: moderateScale(0.5),
          }}
        />
      </Animatable.View>
    );
  };

  const showFilters = () => {
    setModalVisible(true);
  };

  const renderFilterButton = () => {
    return (
      <Animatable.View
        animation="fadeInRight"
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + theme.Sizes.S14 * 5.5,
          right: theme.Sizes.S10,
          zIndex: 9,
        }}>
        <FAB
          icon="filter"
          color={theme.Colors.blue}
          style={{
            width: theme.Sizes.S14 * 3.4,
            height: theme.Sizes.S14 * 3.4,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.Colors.lightgrey2,
          }}
          onPress={showFilters}
        />
      </Animatable.View>
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
          {item.properties.location_id}
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
          width: '70%',
          top: StatusBar.currentHeight + theme.Sizes.S14 * 4.8,
          left: theme.Sizes.S14 * 3,
          maxHeight: theme.Sizes.height / 2.5,
          borderColor: theme.Colors.grey,
          borderWidth: 0,
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

  const closeFilters = () => {
    setModalVisible(false);
  };

  const applyFilters = () => {
    setModalVisible(false);
  };

  const clearFilters = () => {};

  useEffect(() => {
    setFilterSiteStatusData(filterSiteStatus);
  }, []);

  const selectAllSiteStatus = (selected, isChecked) => {
    if (selected === 'Select All') {
      let tempData = filterSiteStatusData.map(data => {
        return {...data, isChecked: !siteStatusAll};
      });
      setFilterSiteStatusData(tempData);
    } else {
      let tempData = filterSiteStatusData.map(data =>
        data.name === selected ? {...data, isChecked: !isChecked} : data,
      );
      setFilterSiteStatusData(tempData);
    }
  };

  const renderFilters = () => {
    return (
      <ModalComponent
        visible={modalVisible}
        style={{height: theme.Sizes.height * 0.7}}>
        <Container
          row
          center
          flex={false}
          style={{height: theme.Sizes.S14 * 3}}>
          <Text
            style={{
              fontSize: theme.Sizes.F16,
              fontWeight: 'bold',
              marginLeft: theme.Sizes.S14 * 2,
              flex: 1,
            }}>
            {'Filters: '}{' '}
            <Text style={{color: theme.Colors.blue}}>{selectedFilterType}</Text>
          </Text>
          <TouchableOpacity
            activeOpacity={0.4}
            style={{
              width: theme.Sizes.width / 5,
              marginRight: theme.Sizes.S14,
            }}
            onPress={clearFilters}>
            <Text
              style={{
                fontSize: theme.Sizes.F14,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
                color: theme.Colors.red,
              }}>
              clear all
            </Text>
          </TouchableOpacity>
        </Container>

        <Container row>
          <Container color="lightgrey2" flex={1}>
            {filterTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.4}
                style={{
                  paddingLeft: theme.Sizes.S14,
                  marginTop: theme.Sizes.S10,
                }}
                onPress={() => setSelectedFilterType(type.type)}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {type.type}
                </Text>
              </TouchableOpacity>
            ))}
          </Container>

          <Container flex={2}>
            <ScrollView>
              {selectedFilterType === 'Site Status' && (
                <>
                  <Container row center flex={false}>
                    <Checkbox
                      status={
                        !filterSiteStatusData.some(
                          siteStatus => siteStatus?.isChecked !== true,
                        )
                          ? 'checked'
                          : 'unchecked'
                      }
                      color={theme.Colors.blue}
                      onPress={() => {
                        setSiteStatusAll(!siteStatusAll);
                        selectAllSiteStatus('Select All');
                      }}
                    />
                    <Text>Select All</Text>
                  </Container>
                  {filterSiteStatusData.map((siteStatus, index) => {
                    return (
                      <Container row center flex={false} key={index}>
                        <Checkbox
                          status={
                            siteStatus.isChecked ? 'checked' : 'unchecked'
                          }
                          color={theme.Colors.blue}
                          onPress={() =>
                            selectAllSiteStatus(
                              siteStatus.name,
                              siteStatus.isChecked,
                            )
                          }
                        />
                        <Text>{siteStatus.name}</Text>
                      </Container>
                    );
                  })}
                </>
              )}
              {selectedFilterType === 'Country' &&
                filterCountry.map((country, index) => (
                  <Container row center flex={false} key={index}>
                    <Checkbox
                      status={'checked'}
                      color={theme.Colors.blue}
                      onPress={() => {}}
                    />
                    <Text>{country.name}</Text>
                  </Container>
                ))}
              {selectedFilterType === 'Site Type' && (
                <>
                  <Container row center flex={false}>
                    <Checkbox
                      status={'checked'}
                      color={theme.Colors.blue}
                      onPress={() => {}}
                    />
                    <Text>Select All</Text>
                  </Container>
                  {filterSiteType.map((siteType, index) => (
                    <Container row center flex={false} key={index}>
                      <Checkbox
                        status={'checked'}
                        color={theme.Colors.blue}
                        onPress={() => {}}
                      />
                      <Text>{siteType.name}</Text>
                    </Container>
                  ))}
                </>
              )}
              {selectedFilterType === 'Site Subtype' && (
                <>
                  <Container row center flex={false}>
                    <Checkbox
                      status={'checked'}
                      color={theme.Colors.blue}
                      onPress={() => {}}
                    />
                    <Text>Select All</Text>
                  </Container>
                  {filterSiteSubType.map((siteSubType, index) => (
                    <Container row center flex={false} key={index}>
                      <Checkbox
                        status={'checked'}
                        color={theme.Colors.blue}
                        onPress={() => {}}
                      />
                      <Text>{siteSubType.name}</Text>
                    </Container>
                  ))}
                </>
              )}
              {selectedFilterType === 'Vendor' && (
                <>
                  <Container row center flex={false}>
                    <Checkbox
                      status={'checked'}
                      color={theme.Colors.blue}
                      onPress={() => {}}
                    />
                    <Text>Select All</Text>
                  </Container>

                  {filterVendor.map((vendor, index) => (
                    <Container row center flex={false} key={index}>
                      <Checkbox
                        status={'checked'}
                        color={theme.Colors.blue}
                        onPress={() => {}}
                      />
                      <Text>{vendor.name}</Text>
                    </Container>
                  ))}
                </>
              )}
            </ScrollView>
          </Container>
        </Container>

        <Container
          row
          center
          flex={false}
          style={{height: theme.Sizes.S14 * 3}}>
          <TouchableOpacity
            activeOpacity={0.4}
            style={{
              width: theme.Sizes.width / 5,
              marginLeft: theme.Sizes.S14 * 2,
              flex: 1,
            }}
            onPress={closeFilters}>
            <Text
              style={{
                fontSize: theme.Sizes.F14,
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}>
              close
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.4}
            style={{
              width: theme.Sizes.width / 5,
              marginRight: theme.Sizes.S14,
            }}
            onPress={applyFilters}>
            <Text
              style={{
                fontSize: theme.Sizes.F14,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                textAlign: 'center',
                color: theme.Colors.red,
              }}>
              apply
            </Text>
          </TouchableOpacity>
        </Container>
      </ModalComponent>
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
      {renderSearchButton()}
      {renderSearchBar()}
      {renderFilterButton()}
      {renderFilters()}
      {/* {renderMap()} */}
      {searchedData.length > 0 && renderSearchedData()}
    </SafeAreaView>
  );
};

export default Maps;
