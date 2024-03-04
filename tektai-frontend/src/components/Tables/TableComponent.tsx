import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type validation
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, useDisclosure,
} from '@chakra-ui/react'
import userService from "../../services/userService";
const TableComponent = () => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [data, setData] = useState([]);


  useEffect( () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUsers(token);
    }
  }, []);

  // @ts-ignore
  const fetchUsers = async (token) => {

    const userData = await userService.getAll(token);
    if (!userData.error)
      setData(userData);
  };

  const finalRef = React.useRef(null)
  // @ts-ignore
  const deleteUser = async () : Promise<void> => {
    const response = await userService.deleteUser(userToDelete._id);
    if (!response.error) {
      setData(data.filter(item => item._id !== userToDelete._id));
      setUserToDelete(null);
    }
  }
  return (
    <div className="rounded-sm  border-strokesm:px-7.5 xl:pb-1">
      <div className="max-w-full ">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Email
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              Username
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              phoneNumber
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
              image
              </th>
              
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              birthdate
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
              Actions
              </th>
              
            </tr>
          </thead>
          <tbody>

            {data?.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.email}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.username}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.phoneNumber}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.image}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.birthdate}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                           packageItem.role === 'admin'
                        ? 'bg-success text-success'
                        : packageItem.role === 'challenger'
                        ? 'bg-danger text-danger'
                        : packageItem.role === 'company'
                        ? 'bg-purple-500 text-purple-500'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {packageItem.role}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
  <div className="flex items-center space-x-3.5">

    <button className="hover:text-primary" onClick={() => setUserToDelete(packageItem)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h2a1 1 0 0 1 0 2h-1v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-5H5a1 1 0 0 1 0-2h2V5z"
          clipRule="evenodd"
        />
      </svg>
      Delete
    </button>


  </div>
</td>



              </tr>
            ))}
          </tbody>
        </table>
        <Modal finalFocusRef={finalRef} isOpen={userToDelete !== null}  onClose={() => setUserToDelete(null)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="relative p-4 text-center  sm:p-5">
                <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this user {userToDelete?.username} ?</p>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => setUserToDelete(null)}>
                No, cancel
              </Button>
              <Button  colorScheme='red' onClick={deleteUser}> Yes, I'm sure</Button>


            </ModalFooter>
          </ModalContent>
        </Modal>
        <div id="deleteModal" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">

            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
              <div className="flex justify-center items-center space-x-4">
                <button data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  No, cancel
                </button>
                <button type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export default TableComponent;
