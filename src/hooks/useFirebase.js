// import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { petFailure, petSuccess } from '../state/PetSlice';
import { addressSuccess } from '../state/AddressSlice';
import { profileSuccess } from '../state/Profileslice';
import { ownSuccess } from '../state/OwnSlice';
import { hcSuccess } from '../state/ClinicalSlice';



const useFirebase = ()=>{

    const state = useSelector(state => state)
    const distpach = useDispatch()

// para mascotas 
    const getFirebasePet = async ()=>{

   
        const suscriber = firestore()
          .collection('Pet')
          .where('idUser', '==', state.logger.user.id)
          .onSnapshot(querySnapshot => {
            const objeto = [];      
            querySnapshot.forEach(documentSnapshot => {
              objeto.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id
              });
            });
            
            if(objeto.length > 0){
                const pet = {
                    id:objeto[0].key,
                    idUser:objeto[0].idUser,
                    pickname:objeto[0].pickname,
                    photo:objeto[0].photo,
                  }
                  distpach(petSuccess(pet))
            }else {
                distpach(petFailure())
            }
            
          });
      
        return () => suscriber();
        
        }

        // para perfil de usuario

        const getFirebaseProfile = async ()=>{
   
            const suscriber = firestore()
              .collection('ProfileUsers')
              .where('idUser', '==', state.logger.user.id)
              .onSnapshot(querySnapshot => {
                const objeto = [];      
                querySnapshot.forEach(documentSnapshot => {
                  objeto.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                  });
                });
                console.log('objeto : ', objeto)
          
                if(objeto.length > 0){
                             
                  const profile = {
                    id:objeto[0].key,
                    idUser:objeto[0].idUser,
                    name:objeto[0].name,
                    lastName:objeto[0].lastName,
                    avatar:objeto[0].avatar,
                    numberPhone:objeto[0].numberPhone,
                  }
                  distpach(profileSuccess(profile))
                }
                
              });
          
            return () => suscriber();
            
            }

            // para el domicilio

            const getFirebaseAddress = async ()=>{

   
                const suscriber = firestore()
                  .collection('address')
                  .where('idUser', '==', state.logger.user.id)
                  .onSnapshot(querySnapshot => {
                    const objeto = [];      
                    querySnapshot.forEach(documentSnapshot => {
                      objeto.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id
                      });
                    });
                    console.log('objeto : ', objeto)
              
                    if(objeto.length > 0){
                                 
                      const address = {
                        id:objeto[0].key,
                        idUser:objeto[0].idUser,
                        street:objeto[0].street,
                        number:objeto[0].number,
                        department:objeto[0].department,
                        floor:objeto[0].floor,
                        locality:objeto[0].locality,
                        province:objeto[0].province,
                        country:objeto[0].country,
                        latitude:objeto[0].latitude,
                        longitude:objeto[0].longitude,
                      }
                      distpach(addressSuccess(address))
                    }
                    
                  });
              
                return () => suscriber();
                
                }
                // para historia clinica 
                const getFirebaseHC = async ()=>{

   
                    const suscriber = firestore()
                      .collection('HC')
                      .where('idUser', '==', state.logger.user.id)
                      .onSnapshot(querySnapshot => {
                        const objeto = [];      
                        querySnapshot.forEach(documentSnapshot => {
                          objeto.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id
                          });
                        });
                        console.log('objeto : ', objeto)
                  
                        if(objeto.length > 0){
                                     
                          const hc = {
                            id:objeto[0].key,
                            idUser:objeto[0].idUser,
                            photo:objeto[0].photo,
                          }
                          distpach(hcSuccess(hc))
                        }
                        
                      });
                  
                    return () => suscriber();
                    
                    }   
// para pertenencias 

const getFirebaseOwn = async ()=>{

   
    const suscriber = firestore()
      .collection('Own')
      .where('idUser', '==', state.logger.user.id)
      .onSnapshot(querySnapshot => {
        const objeto = [];      
        querySnapshot.forEach(documentSnapshot => {
          objeto.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          });
        });
        console.log('objeto : ', objeto)
  
        if(objeto.length > 0){                     
          const own = {
            id:objeto[0].key,
            idUser:objeto[0].idUser,
            object:objeto[0].object,
            photo:objeto[0].photo,
          }
          distpach(ownSuccess(own))
        }
        
      });
  
    return () => suscriber();
    
    }


      
    return { 
        getFirebasePet,
        getFirebaseProfile,
        getFirebaseAddress, 
        getFirebaseHC, 
        getFirebaseOwn
    }

}

export default useFirebase