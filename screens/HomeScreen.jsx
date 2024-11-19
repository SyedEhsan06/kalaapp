import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addArtist} from '../redux/slices/artistSlice';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newArtist, setNewArtist] = useState({
    name: '',
    category: '',
    rating: '',
    locations: [],
  });
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc' for sorting
  const [selectedLocation, setSelectedLocation] = useState('');

  const user = useSelector(state => state.user.userInfo);
  const artistData = useSelector(state => state.artist?.artists);
  const dispatch = useDispatch();

  const categories = ['Painting', 'Dancing', 'Singing', 'Poetry'];
  const locationsData = [
    {label: 'Pune', value: 'Pune'},
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Kolkata', value: 'Kolkata'},
    {label: 'Hyderabad', value: 'Hyderabad'},
  ];

  // Filtered artists based on search and location
  const filteredArtists = artistData?.filter(
    artist =>
      (artist.name.toLowerCase().includes(searchText.toLowerCase()) ||
        artist.category.toLowerCase().includes(searchText.toLowerCase())) &&
      (selectedLocation ? artist.locations.includes(selectedLocation) : true),
  );

  // Sort artists by rating
  const sortedArtists = filteredArtists?.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.rating - b.rating;
    } else {
      return b.rating - a.rating;
    }
  });

  const handleAddArtist = () => {
    if (newArtist.name && newArtist.category) {
      const newArtistData = {...newArtist, id: Date.now().toString()};
      dispatch(addArtist(newArtistData));
      setNewArtist({name: '', category: '', rating: '', locations: []});
      setModalVisible(false);
    }
  };

  const toggleLocation = location => {
    setNewArtist(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location],
    }));
  };

  const renderArtist = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.artistName}>{item.name}</Text>
      <Text style={styles.artistCategory}>{item.category}</Text>
      {item.rating && (
        <>
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.artistRating}>{item.rating} / 5</Text>
        </>
      )}
      {item.locations?.length > 0 && (
        <>
          <Text style={styles.label}>Locations:</Text>
          <Text style={styles.artistLocation}>{item.locations.join(', ')}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.name || 'Guest'}</Text>

      <View style={styles.searchSortContainer}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchLabel}>Search by Name or Category</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by Rating</Text>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            <Text style={styles.sortButtonText}>
              {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Filter */}
      <View style={styles.locationContainer}>
        <Text style={styles.label}>Filter by Location</Text>
        <View style={styles.locationContainer}>
          {locationsData.map(locationOption => (
            <TouchableOpacity
              key={locationOption.value}
              style={[
                styles.locationButton,
                selectedLocation === locationOption.value &&
                  styles.activeLocationButton,
              ]}
              onPress={() =>
                setSelectedLocation(
                  locationOption.value === selectedLocation
                    ? ''
                    : locationOption.value,
                )
              }>
              <Text style={styles.locationText}>{locationOption.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={sortedArtists}
        keyExtractor={item => item.id}
        renderItem={renderArtist}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal for adding a new artist */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Artist</Text>
            {/* Add Artist Form */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Artist Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter artist name"
                value={newArtist.name}
                onChangeText={text =>
                  setNewArtist(prev => ({...prev, name: text}))
                }
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Artist Category</Text>
              <View style={styles.categoryContainer}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      newArtist.category === category &&
                        styles.activeCategoryButton,
                    ]}
                    onPress={() => setNewArtist(prev => ({...prev, category}))}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Rating (1-5)</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map(rate => (
                  <TouchableOpacity
                    key={rate}
                    style={[
                      styles.ratingButton,
                      newArtist.rating === rate && styles.activeRatingButton,
                    ]}
                    onPress={() =>
                      setNewArtist(prev => ({...prev, rating: rate}))
                    }>
                    <Text style={styles.locationText}>{rate}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Locations</Text>
              <View style={styles.locationContainer}>
                {locationsData.map(locationOption => (
                  <TouchableOpacity
                    key={locationOption.value}
                    style={[
                      styles.locationButton,
                      newArtist.locations.includes(locationOption.value) &&
                        styles.activeLocationButton,
                    ]}
                    onPress={() => toggleLocation(locationOption.value)}>
                    <Text style={styles.locationText}>
                      {locationOption.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              disabled={!newArtist.name || !newArtist.category}
              title="Add"
              color={newArtist.name && newArtist.category ? 'green' : 'gray'}
              onPress={handleAddArtist}
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  searchSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContainer: {
    flex: 0.7,
  },
  searchLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  sortContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sortButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  artistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  artistCategory: {
    fontSize: 14,
    color: '#555',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  artistRating: {
    fontSize: 14,
    color: '#777',
  },
  artistLocation: {
    fontSize: 14,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  modalInput: {
    height: 40,
    color: '#333',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: 8,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#007BFF',
  },
  categoryText: {
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 10,
  },
  activeRatingButton: {
    backgroundColor: '#FFD700',
  },
  locationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 8,
  },
  activeLocationButton: {
    backgroundColor: '#007BFF',
  },
  locationText: {
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
});

export default HomeScreen;
