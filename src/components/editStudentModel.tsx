import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
import {UserIcon, XCircleIcon} from 'react-native-heroicons/outline';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/solid';

export type Guardian = {
  Name: string;
  profilePicture: string;
  Mobile: number;
  Email: string;
};

export type Student = {
  name: string;
  profilepicture: string;
  registrationnumber: string;
  parentdetails: Guardian[];
  class: string[];
  age: number;
  mobile: number;
  email: string;
  DOB: string;
  checked: boolean;
  expanded: boolean;
};

interface EditSchoolDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedStudent: Student;
  onSave: (updatedStudent: Student) => void;
}

const EditSchoolDetailsModal: React.FC<EditSchoolDetailsModalProps> = ({
  isVisible,
  onClose,
  selectedStudent,
  onSave,
}) => {
  const [formData, setFormData] = useState<Student>({
    ...selectedStudent,
  });
  const [firstName, setFirstName] = useState(formData.name.split(' ')[0]);
  const [LastName, setLastName] = useState(formData.name.split(' ')[1]);

  const handleChange = (key: keyof Student, value: any) => {
    setFormData({...formData, [key]: value});
  };

  const [newGuardian, setNewGuardian] = useState<Guardian | null>(null);

  const handleNewGuardianChange = (key: keyof Guardian, value: any) => {
    if (newGuardian) {
      setNewGuardian({...newGuardian, [key]: value});
    } else {
      setNewGuardian({Name: '', profilePicture: '', Mobile: 0, Email: ''});
    }
  };

  const saveNewGuardian = () => {
    if (newGuardian) {
      setFormData({
        ...formData,
        parentdetails: [...formData.parentdetails, newGuardian],
      });
      setNewGuardian(null); // Reset new guardian form
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Edit School Details</Text>
            <TouchableOpacity onPress={onClose}>
              <XCircleIcon color={'red'} />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            style={{width: '90%'}}>
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri:
                    formData.profilepicture ||
                    'https://via.placeholder.com/100',
                }}
                style={styles.profileImage}
              />
            </View>

            {/* Form Inputs */}
            <View style={styles.formContainer}>
              {/* Personal Information */}
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Avenir Next',
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                First Name:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#888"
                value={firstName}
                onChangeText={text => {
                  setFirstName(text);
                  handleChange('name', `${text}} ${LastName}`);
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Avenir Next',
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                Last Name:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#888"
                value={LastName}
                onChangeText={text => {
                  setLastName(text);
                  handleChange('name', `${firstName} ${text}`);
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Avenir Next',
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                Phone Number:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                value={formData.mobile.toString()}
                onChangeText={text => handleChange('mobile', parseInt(text))}
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Avenir Next',
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                Email:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Avenir Next',
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                Date of Birth:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (e.g., 1998-12-8)"
                placeholderTextColor="#888"
                value={formData.DOB}
                onChangeText={text => handleChange('DOB', text)}
              />
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'Avenir Next',
                  fontWeight: '600',
                  marginBottom: 8
                }}>
                Class:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Class (e.g., 10A, 10B)"
                placeholderTextColor="#888"
                value={formData.class.join(', ')}
                onChangeText={text =>
                  handleChange(
                    'class',
                    text.split(',').map(cls => cls.trim()),
                  )
                }
              />

              {/* Divider */}
              <View style={styles.divider} />

              {/* Guardian Information Section */}
              <View style={styles.guardianContainer}>
                <Text style={styles.sectionTitle}>Family Members</Text>

                {/* Existing Guardians */}
                {formData.parentdetails.map((guardian, index) => (
                  <View key={index} style={styles.guardianSection}>
                    <Image
                      style={{width: 45, height: 45, borderRadius: 35}}
                      source={{uri: `${guardian.profilePicture}`}}
                    />
                    <View style={styles.row}>
                      <View style={{flexDirection: 'column', width: '70%'}}>
                        <Text style={styles.guardianTitle}>
                          {guardian.Name}
                        </Text>
                        <Text style={styles.guardianEmail}>
                          {guardian.Email}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          const updatedGuardians =
                            formData.parentdetails.filter(
                              (_, i) => i !== index,
                            );
                          setFormData({
                            ...formData,
                            parentdetails: updatedGuardians,
                          });
                        }}>
                        <TrashIcon color={'#333333'} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                  </View>
                ))}

                {/* newGuardian */}
                {newGuardian && (
                  <View style={styles.addGuardianForm}>
                    <View style={styles.row}>
                      <View style={{width: '47%'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Avenir Next',
                            fontWeight: '400',
                            marginBottom: 5,
                          }}>
                          First Name
                        </Text>
                        <TextInput
                          style={{...styles.input}}
                          placeholder="Ex. Dhirag"
                          placeholderTextColor="#888"
                          value={newGuardian.Name.split(' ')[0] || ''}
                          onChangeText={text =>
                            handleNewGuardianChange(
                              'Name',
                              `${text} ${newGuardian.Name.split(' ')[1] || ''}`,
                            )
                          }
                        />
                      </View>
                      <View style={{width: '47%'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: 'Avenir Next',
                            fontWeight: '400',
                            marginBottom: 5,
                          }}>
                          Last Name
                        </Text>
                        <TextInput
                          style={{...styles.input}}
                          placeholder="Ex Shaw"
                          placeholderTextColor="#888"
                          value={newGuardian.Name.split(' ')[1] || ''}
                          onChangeText={text =>
                            handleNewGuardianChange(
                              'Name',
                              `${newGuardian.Name.split(' ')[0] || ''} ${text}`,
                            )
                          }
                        />
                      </View>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Avenir Next',
                          fontWeight: '400',
                          marginBottom: 8,
                        }}>
                        Phone Number
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Ex: 1234567890"
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                        value={
                          newGuardian.Mobile
                            ? newGuardian.Mobile.toString()
                            : ''
                        }
                        onChangeText={text =>
                          handleNewGuardianChange('Mobile', parseInt(text) || 0)
                        }
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'Avenir Next',
                          fontWeight: '400',
                          marginBottom: 8,
                        }}>
                        Email Adress
                      </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Ex. xyz@gmail.com"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={newGuardian.Email}
                        onChangeText={text =>
                          handleNewGuardianChange('Email', text)
                        }
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.saveDetailsButton}
                      onPress={saveNewGuardian}>
                      <Text style={styles.saveDetailsText}>Save Details</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Add More Button */}
                {!newGuardian && (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() =>
                      setNewGuardian({
                        Name: '',
                        Mobile: 0,
                        Email: '',
                        profilePicture:
                          'https://randomuser.me/api/portraits/men/9.jpg',
                      })
                    }>
                    <UserIcon color={'#333333'} />
                    <Text style={styles.addText}>Add More</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                //  console.log(formData);
                onSave(formData); // Pass updated student data to parent
                onClose(); // Close modal after saving
              }}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    height: WINDOW_HEIGHT * 0.9, // Responsive height
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  closeIcon: {
    fontSize: 18,
    color: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
  },
  scrollContent: {
    alignItems: 'center',
    width: '100%',
  },
  profileImageContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    width: '100%',
  },
  addGuardianForm: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#777777', // Ensure text color is black
    fontWeight: '300',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  saveDetailsButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    width: '45%',
    marginLeft: 'auto',
    borderWidth: 0.6,
  },
  saveDetailsText: {
    color: 'black',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelText: {
    color: 'black',
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
  },
  saveText: {
    color: '#fff',
  },
  guardianContainer: {
    marginBottom: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfInput: {
    width: '48%',
  },
  guardianSection: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guardianTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777777',
    marginBottom: 5,
    marginLeft: 5,
  },
  guardianEmail: {
    fontSize: 14,
    fontWeight: '300',
    color: '#777777',
    marginBottom: 5,
    marginLeft: 5,
    width: 170,
  },
  addButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '42%',
    borderWidth: 0.5,
  },
  addText: {
    color: '#333333',
    fontWeight: '400',
  },
  removeButton: {
    backgroundColor: '#F44336',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditSchoolDetailsModal;
