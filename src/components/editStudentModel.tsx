import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import React, {useState} from 'react';
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
  parentdetails: Guardian;
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
  onSave
}) => {
  const [formData, setFormData] = useState<Student>({
    ...selectedStudent,
  });

  const handleChange = (key: keyof Student, value: any) => {
    setFormData({...formData, [key]: value});
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
              <Text style={styles.closeIcon}>✖</Text>
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
              <Text style={{color: 'black', fontWeight: 'bold'}}>Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#888"
                value={formData.name}
                onChangeText={text => handleChange('name', text)}
              />
              <Text style={{color: 'black', fontWeight: 'bold'}}>Mobile:</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                value={formData.mobile.toString()}
                onChangeText={text => handleChange('mobile', parseInt(text))}
              />
              <Text style={{color: 'black', fontWeight: 'bold'}}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
              <Text style={{color: 'black', fontWeight: 'bold'}}>DOB:</Text>
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (e.g., 1998-12-8)"
                placeholderTextColor="#888"
                value={formData.DOB}
                onChangeText={text => handleChange('DOB', text)}
              />
              <Text style={{color: 'black', fontWeight: 'bold'}}>Class:</Text>
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

                {/* Row for First Name and Last Name */}
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="ex: Dhiraj"
                    placeholderTextColor="#888"
                    value={formData.parentdetails.Name.split(' ')[0]} // Assume first name
                    onChangeText={text => {
                      const lastName =
                        formData.parentdetails.Name.split(' ')[1] || '';
                      setFormData({
                        ...formData,
                        parentdetails: {
                          ...formData.parentdetails,
                          Name: `${text} ${lastName}`,
                        },
                      });
                    }}
                  />
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="ex: Shaw"
                    placeholderTextColor="#888"
                    value={formData.parentdetails.Name.split(' ')[1]} // Assume last name
                    onChangeText={text => {
                      const firstName =
                        formData.parentdetails.Name.split(' ')[0];
                      setFormData({
                        ...formData,
                        parentdetails: {
                          ...formData.parentdetails,
                          Name: `${firstName} ${text}`,
                        },
                      });
                    }}
                  />
                </View>

                {/* Phone Number */}
                <TextInput
                  style={styles.input}
                  placeholder="ex: 1234567890"
                  placeholderTextColor="#888"
                  keyboardType="phone-pad"
                  value={formData.parentdetails.Mobile.toString()}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      parentdetails: {
                        ...formData.parentdetails,
                        Mobile: parseInt(text),
                      },
                    })
                  }
                />

                {/* Email Address */}
                <TextInput
                  style={styles.input}
                  placeholder="ex: example@email.com"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  value={formData.parentdetails.Email}
                  onChangeText={text =>
                    setFormData({
                      ...formData,
                      parentdetails: {...formData.parentdetails, Email: text},
                    })
                  }
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={()=>{

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
    height: WINDOW_HEIGHT * 0.8, // Responsive height
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
    color: 'black',
  },
  scrollContent: {
    alignItems: 'center',
    width: '100%',
  },
  profileImageContainer: {
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black', // Ensure text color is black
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
    backgroundColor: 'black',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  saveDetailsText: {
    color: '#fff',
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
});

export default EditSchoolDetailsModal;
