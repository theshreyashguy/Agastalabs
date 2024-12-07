import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {
  ArrowLeftIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {HomeIcon, PlusCircleIcon} from 'react-native-heroicons/solid';
import students, {Student} from '../services/tempData';
import {CheckBox} from 'react-native-elements';
import StudentDetailsBottomSheet from '../navigation/bottomSheet';
import {BlurView} from '@react-native-community/blur';
import EditSchoolDetailsModal from '../components/editStudentModel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MainScreen = () => {
  const [data, setData] = useState<Student[]>(students);
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);
  const [allCheck, setAllCheck] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState<'name' | 'registration'>('name');
  const [filterText, setFilterText] = useState('');
  const [filteredData, setFilteredData] = useState<Student[]>(students);

  useEffect(() => {
    let filteredData = students;

    // Search filtering
    if (searchText) {
      filteredData = filteredData.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Filtering based on class (if filterText is set)
    if (filterText) {
      filteredData = filteredData.filter(student =>
        student.class.some(className =>
          className.toLowerCase().includes(filterText.toLowerCase()),
        ),
      );
    }

    // Sorting the data
    if (sortOrder === 'name') {
      filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'registration') {
      filteredData = filteredData.sort((a, b) =>
        a.registrationnumber.localeCompare(b.registrationnumber),
      );
    }

    setFilteredData(filteredData);
  }, [searchText, filterText, sortOrder]);

  useEffect(() => {
    // Check if any student is checked
    const anyChecked = filteredData.some(item => item.checked);
    setIsAnyChecked(anyChecked);
  }, [filteredData]);

  useEffect(() => {
    // Check if any student is checked
    const anyChecked = filteredData.some(item => item.checked);
    setIsAnyChecked(anyChecked);
  }, [filteredData]);

  const toggleBottomSheet = async (student: Student | null) => {
    // console.log(student?.name);
    await setSelectedStudent(student!!);
    // console.log(student?.name);
    setBottomSheetVisible(!!student);
  };

  const handleCheckBoxPress = (index: number) => {
    const updatedData = filteredData.map((item, i) =>
      i === index ? {...item, checked: !item.checked} : item,
    );
    setFilteredData(updatedData);
  };

  const handleExpandPress = (index: number) => {
    const updatedData = filteredData.map((item, i) =>
      i === index ? {...item, expanded: !item.expanded} : item,
    );
    setFilteredData(updatedData);
  };

  useEffect(() => {
    const updatedData = data.map(item => ({
      ...item,
      checked: allCheck,
    }));
    setFilteredData(updatedData);
  }, [allCheck]);

  const renderItem = ({item, index}: {item: Student; index: number}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => toggleBottomSheet(item)}>
      <View style={styles.StudentDetails}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 'auto',
          }}>
          <Image
            style={{width: 40, height: 40, borderRadius: 20, marginRight: 5}}
            source={{uri: `${item.profilepicture}`}}
          />
          <Text style={styles.studentName}>{item.name}</Text>
        </View>
        <CheckBox
          checked={item.checked}
          onPress={() => handleCheckBoxPress(index)}
          containerStyle={styles.checkboxContainer}
          checkedIcon={
            <View style={styles.checkedBox}>
              <Text style={styles.checkboxText}>✓</Text>
            </View>
          }
          uncheckedIcon={<View style={styles.uncheckedBox}></View>}
        />
      </View>
      {item.expanded == true ? (
        <>
          <View style={styles.extraDetails}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.parentTitle}>Registration Number</Text>
              <Text style={{color: 'black'}}>{item.registrationnumber}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.parentTitle}>Age</Text>
              <Text style={{color: 'black'}}>{item.age}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.parentTitle}>DOB</Text>
              <Text style={{color: 'black'}}>{item.DOB}</Text>
            </View>
          </View>
          <View style={styles.pDetails}>
            <Text style={styles.parentTitle}>Family Member:</Text>
            <Image
              style={{width: 40, height: 40, borderRadius: 20}}
              source={{uri: `${item.parentdetails.profilePicture}`}}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.parentDetails}>
            <Text style={styles.details}>class</Text>
            <Text style={{color: 'black'}}>
              {item.class.length <= 2
                ? `${item.class[0]} ${item.class[1]}`
                : `${item.class[1]} ${item.class[1]} &${
                    item.class.length - 2
                  } more`}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const updateStudentDetails = (updatedStudent: Student) => {
    //  console.log(updateStudentDetails,selectedStudent);
    const updatedData = data.map(student =>
      student.registrationnumber === updatedStudent.registrationnumber
        ? updatedStudent
        : student,
    );
    setFilteredData(updatedData);
  };

  return (
    <>
      {isBottomSheetVisible && selectedStudent ? (
        <>
          <TouchableWithoutFeedback
            onPress={() => setBottomSheetVisible(false)}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
          </TouchableWithoutFeedback>
          <StudentDetailsBottomSheet
            student={selectedStudent}
            guardian={selectedStudent.parentdetails}
            closeSheet={() => setBottomSheetVisible(false)}
            setModalVisible={setModalVisible}
          />
        </>
      ) : (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <ArrowLeftIcon size={28} />
              <Text style={{color: 'black', fontSize: 22}}>
                🧑🏻‍🎓 Student List
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.2,
                justifyContent: 'space-between',
              }}>
              {/* Search Input */}
              <TouchableOpacity
                onPress={() => {
                  if (!showFilter) {
                    setShowSearch(!showSearch);
                  }
                }}>
                <MagnifyingGlassIcon size={29} />
              </TouchableOpacity>
              {/* Sort Icon */}
              <FunnelIcon
                size={29}
                onPress={() => {
                  if (!showSearch) {
                    setShowFilter(!showFilter);
                  }
                }}
              />
            </View>
          </View>
          {/* searchBar */}
          {showSearch && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={'black'}
            />
          )}

          {/* sortClass */}
          {showFilter && (
            <TextInput
              style={styles.searchInput}
              placeholder="Filter by class"
              value={filterText}
              onChangeText={setFilterText}
              placeholderTextColor={'black'}
            />
          )}
          {/* All Check */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: windowWidth,
              padding: 15,
            }}>
            <Text style={{color: 'black', fontSize: 24}}>All Students</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: windowWidth * 0.3,
              }}>
              {isAnyChecked && (
                <Text style={{color: 'blue', fontSize: 18}}>Invite</Text>
              )}
              <CheckBox
                checked={allCheck}
                onPress={() => setAllCheck(!allCheck)}
                containerStyle={styles.checkboxContainer}
                checkedIcon={
                  <View style={styles.checkedBox}>
                    <Text style={styles.checkboxText}>✓</Text>
                  </View>
                }
                uncheckedIcon={<View style={styles.uncheckedBox}></View>}
              />
              {isAnyChecked && <TrashIcon size={20} />}
            </View>
          </View>

          {/* Student List */}
          <View style={styles.studentList}>
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={item => item.name}
            />
          </View>
        </View>
      )}
      {modalVisible && (
        <EditSchoolDetailsModal
          isVisible={modalVisible}
          onClose={() => {
            setBottomSheetVisible(false);
            setModalVisible(false);
          }}
          selectedStudent={selectedStudent}
          onSave={updateStudentDetails}
        />
      )}
      <View style={styles.bottomIconContainer}>
        <TouchableOpacity onPress={() => {}}>
          <PlusCircleIcon size={50} color="black" style={{}} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    padding: 4,
    height: windowHeight,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: windowWidth,
    backgroundColor: '#ffffff',
    height: 0.08 * windowHeight,
    paddingHorizontal: 6,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#e0e0e0',
    shadowColor: '#grey',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    width: windowWidth * 0.9,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 16,
    color: 'black',
    marginTop: 9,
  },
  studentList: {
    flex: 1,
    width: 0.9 * windowWidth,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  details: {
    fontSize: 14,
    color: 'black',
  },
  parentDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pDetails: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  extraDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  StudentDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'black',
  },
  checkboxContainer: {
    padding: 0,
    margin: 0,
    marginRight: 8,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkedBox: {
    width: 24,
    height: 24,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomIconContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the distance from the bottom
    left: '85%',
    transform: [{translateX: -15}], // To center the icon
    zIndex: 10, // Make sure it's on top of other content
  },
});

export default MainScreen;
