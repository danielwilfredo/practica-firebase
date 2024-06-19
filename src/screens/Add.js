import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { database } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
//import * as ImagePicker from 'expo-image-picker';

const Add = ({ navigation }) => {

    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0,
        vendido: false,
        creado: new Date(),
        imagen: ''
    });
    //const [imageUri, setImageUri] = useState('');

    const goToHome = () => {
        navigation.navigate('Home');
    };
/*
    const openGalery = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [8, 8],
            quality: 1,
        });

        console.log(result.assets[0].uri);

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };*/


    const agregarProducto = async () => {
       
            // Agregar el documento a Firestore y obtener la referencia
            await addDoc(collection(database, 'productos'), producto);
    
            // Acceder al ID del documento
            console.log('Se guardó la colección');
    
            // Navegar a la pantalla de inicio
            goToHome();

    }
    /* 2
    const agregarProducto = async () => {
        try {
            let imageUrl = null;
            if (true) {
   
                setImageUri("test");  // Actualizar state de imagen con la URL
            }
    
            // Crear un nuevo objeto de producto con los datos actualizados
            const nuevoProducto = {
                ...producto,
                imagen: '',  // Asignar la URL de la imagen
            };
    
            // Agregar el nuevo producto a Firestore
            await addDoc(collection(database, 'productos'), nuevoProducto);
            console.log('Se guardó la colección');
            goToHome();
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };
    */

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar producto</Text>

            <Text>Nombre:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setProducto({ ...producto, nombre: text })}
                value={producto.nombre}
            />

            <Text>Precio:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setProducto({ ...producto, precio: parseFloat(text) })}
                value={producto.precio}
                keyboardType='numeric'
            />
                        <Text>image:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setProducto({ ...producto, imagen: text })}
                value={producto.imagen}
            />

{
    /*
                <Text>Imagen:</Text>
            <TouchableOpacity onPress={openGalery} style={styles.imagePicker}>
                <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            {imageUri ? <Image source={{ uri: imageUri }} style={styles.imagePreview} /> : null}

    */
}

            <TouchableOpacity
                style={styles.button}
                onPress={agregarProducto}>
                <Text style={styles.buttonText}>Agregar producto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={goToHome}>
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    imagePicker: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    imagePickerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
