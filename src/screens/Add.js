import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { database } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

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

    const openGalery = async () => {
        try {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [8, 8],
                quality: 1,
            });

            console.log(result.assets[0].uri);

            if (!result.canceled) {
                setProducto({
                    ...producto,
                    imagen: result.assets[0].uri
                });
            }

        } catch (error) {
            console.log('Error al abrir la galería', error);
        }


    };


    const agregarProducto = async () => {
        try {
            // Agregar el documento a Firestore y obtener la referencia
            await addDoc(collection(database, 'productos'), producto);

            // Acceder al ID del documento
            console.log('Se guardó la colección');

            Alert.alert('Producto agregado', 'El producto se agregó correctamente', [
                {
                    text: 'Ok',
                    onPress: goToHome,
                },
            ]);
            // Navegar a la pantalla de inicio
            goToHome();

        } catch (error) {
            console.error('Error al agregar el producto', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar producto</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setProducto({ ...producto, nombre: text })}
                    value={producto.nombre}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Precio:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setProducto({ ...producto, precio: parseFloat(text) })}
                    value={producto.precio}
                    keyboardType='numeric'
                />
            </View>
            <Text>Imagen:</Text>
            <TouchableOpacity onPress={openGalery} style={styles.imagePicker}>
                <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            {producto.imagen ? <Image source={{ uri: producto.imagen }} style={styles.imagePreview} /> : null}

            <TouchableOpacity
                style={styles.button}
                onPress={agregarProducto}>
                <Text style={styles.buttonText}>Agregar producto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={goToHome}>
                <Text style={styles.buttonText}>Volver a home</Text>
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
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 8,
        backgroundColor: '#fff', // Fondo blanco para el TextInput
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%'
    },
    imagePicker: {
        backgroundColor: '#0288d1',
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
        backgroundColor: '#0288d1',
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
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333', // Color de texto oscuro para mejor legibilidad
    },
    inputContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#f8f9fa', // Fondo claro para mejor visibilidad
        marginBottom: 16, // Espacio entre cada conjunto de Text y TextInput
    },
});
