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
              <Text style={styles.extra}>{item.registrationnumber}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.parentTitle}>Age</Text>
              <Text style={styles.extra}>{item.age}</Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.parentTitle}>DOB</Text>
              <Text style={styles.extra}>{item.DOB}</Text>
            </View>
          </View>
          <View style={styles.pDetails}>
            <Text style={styles.parentTitle}>Family Members:</Text>
            <View style = {{flexDirection: 'row'}}>
            {item.parentdetails.map((val) => {
              return (
                <Image
                style={{width: 40, height: 40, borderRadius: 20,marginLeft:2}}
                source={{uri: `${val.profilePicture}`}}
                />
              );
            })}
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.parentDetails}>
            <Text style={styles.details}>class</Text>
            <Text
              style={{
                color: '#010101',
                fontFamily: 'Avenir Next',
                fontWeight: '700',
              }}>
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
  const len = filteredData.length

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
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 0.45 * windowWidth,
                marginLeft: 4,
              }}>
              <ArrowLeftIcon size={18} />
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontFamily: 'Avenir Next',
                  fontWeight: '500',
                }}>
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
                <MagnifyingGlassIcon size={24} />
              </TouchableOpacity>
              {/* Sort Icon */}
              <FunnelIcon
                size={24}
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
              padding: 13,
            }}>
            <View style={{flexDirection: 'row',justifyContent:'center',alignContent:'center',backgroundColor:'white'}}>
              <Text
                style={{
                  color: '#010101',
                  fontSize: 22,
                  fontFamily: 'Avenir Next',
                  fontWeight: '600',
                }}>
                All Students{' '}
              </Text>
              <View
                style={{
                  backgroundColor: '#333333',
                  borderRadius: 10,
                  width: 29,
                  height: 29,
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection:'column'
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    fontFamily: 'Avenir Next',
                    fontWeight: '800',
                    textAlign: 'center',
                  }}>
                  {len}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: !isAnyChecked ? windowWidth * 0.1 : windowWidth * 0.3,
              }}>
              {isAnyChecked && (
                <Text
                  style={{
                    color: '#2688EB',
                    fontSize: 18,
                    fontWeight: '500',
                    fontFamily: 'Avenir Next',
                  }}>
                  Invite
                </Text>
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
              {isAnyChecked && <TrashIcon size={20} color={'#333333'} />}
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
      {/* )} */}
       {isBottomSheetVisible && selectedStudent && (
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
            guardian={selectedStudent.parentdetails[0]}
            closeSheet={() => setBottomSheetVisible(false)}
            setModalVisible={setModalVisible}
          />
        </>)}
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
     { !isBottomSheetVisible && <View style={styles.bottomIconContainer}>
        <TouchableOpacity onPress={() => {}}>
          <PlusCircleIcon size={50} color="black" style={{}} />
        </TouchableOpacity>
      </View>}
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: windowWidth,
    backgroundColor: 'transparent',
    height: 0.065 * windowHeight,
    paddingHorizontal: 5,
    paddingVertical: 7,
    alignContent: 'center',
    fontFamily: 'Avenir Next',
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
    fontFamily: 'Avenir Next',
  },
  studentList: {
    flex: 1,
    width: 0.89 * windowWidth,
    paddingTop: 10,
    fontFamily: 'Avenir Next',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 7,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    fontFamily: 'Avenir Next',
    borderWidth: 0.1,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333333',
    fontFamily: 'Avenir Next',
  },
  details: {
    fontSize: 14,
    color: '#777777',
    fontFamily: 'Avenir Next',
  },
  parentDetails: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Avenir Next',
    color: '#333333',
  },
  pDetails: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontFamily: 'Avenir Next',
  },
  extraDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Avenir Next',
  },
  StudentDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Avenir Next',
  },
  parentTitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 2,
    color: '#777777',
    fontFamily: 'Avenir Next',
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
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  uncheckedBox: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderColor: '#B8C1CC',
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  bottomIconContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the distance from the bottom
    left: '85%',
    transform: [{translateX: -15}], // To center the icon
    zIndex: 10, // Make sure it's on top of other content
  },
  extra: {
    fontSize: 14,
    color: '#010101',
    fontFamily: 'Avenir Next',
    fontWeight: '700',
  },
});

export default MainScreen;
