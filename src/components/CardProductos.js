import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { database } from '../config/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

const handleDelete = async (id) => {
    try {
        await deleteDoc(doc(database, 'productos', id));
        console.log('Se eliminó el documento con id: ', id);
    } catch (e) {
        console.error('Error removing document: ', e);
    }
};

const handleUpdate = async (id, vendido) => {
    try {
        await updateDoc(doc(database, 'productos', id), {
            vendido: !vendido
        });
        console.log('Se actualizó el documento con id: ', id);
    } catch (e) {
        console.error('Error updating document: ', e);
    }
};

const CardProductos = ({ id, nombre, precio, vendido, imagen }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.text}>${precio}</Text>
            <Text style={styles.text}>{vendido ? "Vendido" : "Disponible"}</Text>
            {imagen ? (
                <Image source={{ uri: imagen }} style={styles.image} />
            ) : (
                <Text style={styles.text}>No Image Available</Text>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => handleUpdate(id, vendido)}>
                    <Text style={styles.updateButtonText}>Vender</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    updateButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CardProductos;
