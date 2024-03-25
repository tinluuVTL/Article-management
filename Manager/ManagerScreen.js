import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AddScreen from './AddScreen';
import EditScreen from './EditScreen';

const ManagerScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [deletedUser, setDeletedUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false); // New state variable

  useEffect(() => {
    fetchData();
  }, []);

 const toggleUserInfo = () => {
    setShowUserInfo((prevShowUserInfo) => !prevShowUserInfo);
  };
  const fetchData = () => {
    fetch('https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/login')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    onLogout();
  };

  const handleEdit = (id) => {
    navigation.navigate('EditScreen', { id: id, fetchData: fetchData });
  };

  const handleDelete = (id, name, email) => {
    fetch(`https://659e07bd47ae28b0bd3514d9.mockapi.io/api/v1/login/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          fetchData();
          setDeletedUser({ id, name, email });
         
           setTimeout(() => {
      setDeletedUser(null);
    }, 3000);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleAdd = () => {
    navigation.navigate('AddScreen', { fetchData: fetchData });
  };

  // const showAlert = () => {
  //   Alert.alert(
  //     'Xóa thành công',
  //     `Đã xóa thành công người dùng với ID: ${deletedUser.id}, Tên: ${deletedUser.name}, Email: ${deletedUser.email}`,
  //     [{ text: 'OK' }],
  //     { cancelable: false }
  //   );
  // };

  const indexOfLastData = currentPage * perPage;
  const indexOfFirstData = indexOfLastData - perPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(data.length / perPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to: </Text>
        <View style={styles.userInfoContainer}>
          <Text style={styles.emailText}>{email}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('start') && handleLogout()}>
            <Icon name="sign-out" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.tableContainer}>
    <View style={styles.headingContainer}>
        <Text style={styles.tableHeading}>Bảng thông tin người dùng</Text>
 <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Icon name="plus" size={20} color="white" />
      </TouchableOpacity>
      </View>
        <FlatList
          data={currentData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.rowText}>ID: {item.id}</Text>
              <Text style={styles.rowText}>Tên: {item.name}</Text>
              <Text style={styles.rowText}>Email: {item.email}</Text>
              <View style={styles.rowButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                 <Icon name="edit" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id, item.name, item.email)}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View style={styles.paginationContainer}>
          <TouchableOpacity style={styles.paginationButton} disabled={currentPage === 1} onPress={prevPage}>
            <Text style={styles.paginationButtonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageNumberText}>Page {currentPage} of {totalPages}</Text>
          <TouchableOpacity style={styles.paginationButton} disabled={currentPage === totalPages} onPress={nextPage}>
            <Text style={styles.paginationButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      {deletedUser && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>
            Xóa thành công người dùng với ID: {deletedUser.id}, Name: {deletedUser.name}, Email: {deletedUser.email}
          </Text>
        </View>
      )}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    marginRight: 8,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  tableContainer: {
    flex: 1,
    padding: 16,
  },
  tableHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  rowText: {
    fontSize: 16,
    marginBottom: 4,
  },
  rowButtons: {
    flexDirection: 'row-reverse',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  paginationButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  paginationButtonText: {
    color: 'white',
  },
  pageNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessageContainer: {
    backgroundColor: 'green',
    padding: 16,
    alignItems: 'center',
  },
  successMessageText: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 50,
  },
});

export default ManagerScreen;