import React, {useRef, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Student, Guardian} from '../services/tempData';
import {
  PencilIcon,
  PencilSquareIcon,
  UserIcon,
} from 'react-native-heroicons/outline';

const windowWidth = Dimensions.get('window').width;

interface BottomProp {
  student: Student;
  guardian: Guardian;
  closeSheet: () => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StudentDetailsBottomSheet = ({
  student,
  guardian,
  closeSheet,
  setModalVisible
}: BottomProp) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Memoize snap points to avoid re-creating them on every render
  const snapPoints = useMemo(() => ['80%', '60%'], []);

  const renderContent = () => (
    <BottomSheetView style={styles.bottomSheetContainer}>
      {/* Personal Information Section */}
      <View style={styles.section}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
          }}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: windowWidth * 0.25,
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
              <PencilSquareIcon size={25} />
            </TouchableOpacity>
            <UserIcon size={25} />
          </View>
        </View>
        <View style={styles.card}>
          <Image
            style={styles.profilePicture}
            source={{uri: student.profilepicture}}
          />
          <Text style={styles.name}>{student.name}</Text>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Registration No:</Text>
              </Text>
              <Text style={{color: 'black',fontWeight:'bold'}}>{student.registrationnumber}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>DOB:</Text>
              </Text>
              <Text style={{color: 'black',fontWeight:'bold'}}>{student.DOB}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Mobile:</Text>
              </Text>
              <Text style={{color: 'blue',textDecorationLine:'underline'}}>{student.mobile}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Email:</Text>
              </Text>
              <Text style={{color: 'blue',textDecorationLine:'underline'}}>{student.email}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Guardian Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Guardian Information</Text>
        <View style={styles.card}>
          <Image
            style={styles.profilePicture}
            source={{uri: guardian.profilePicture}}
          />
          <Text style={styles.name}>{guardian.Name}</Text>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Email Address:</Text>
              </Text>
              <Text style={{color: 'blue',textDecorationLine:'underline'}}>{guardian.Email}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.detailText}>
                <Text style={styles.label}>Mobile:</Text>
              </Text>
              <Text style={{color: 'blue',textDecorationLine:'underline'}}>{guardian.Mobile}</Text>
            </View>
          </View>
        </View>
      </View>
    </BottomSheetView>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false}
      onClose={closeSheet}>
      {renderContent()}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: '100%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  label: {
    color: '#000',
  },
});

export default StudentDetailsBottomSheet;
